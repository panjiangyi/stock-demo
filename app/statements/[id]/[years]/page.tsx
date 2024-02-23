'use server'


import { Chart } from "./chart";
import { StockTable } from "./table";
import { SimpleListMenu } from "./menu";
import { queryStockDetail, queryStockInfo } from "@/api";



export default async function Test({ params }: { params: { id: string; years: string } }) {


    const stocks = await queryStockInfo()
    const currentStock = stocks.find(stock => stock.stock_id === params.id);
    if (currentStock == null) return <h1>404</h1>
    const detail = await queryStockDetail(currentStock.stock_id, Number(params.years))
    return <>
        <header className="bg-white p-4">{currentStock.stock_name}({currentStock.stock_id})</header>
        <div className="bg-white p-4">
            <div className="flex items-center justify-between text-white">
                <div className=" bg-blue-500 p-1">每月营收</div>
                <div className="flex items-center justify-between text-white">
                    <SimpleListMenu id={params.id} years={params.years} />
                </div>
            </div>
            <Chart data={detail} />
        </div>
        <div className="bg-white p-4">
            <div className="flex items-center justify-between text-white">
                <div className=" bg-blue-500 p-1">详细数据</div>
            </div>
            <StockTable data={detail} />
        </div>
    </>
}