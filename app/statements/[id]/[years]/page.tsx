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
    return (
        <div className="space-y-6">
            <header className="bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-xl font-medium">{currentStock.stock_name} ({currentStock.stock_id})</h1>
            </header>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">每月營收</div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                        <SimpleListMenu id={params.id} years={params.years} />
                    </div>
                </div>
                <div className="p-4">
                    <Chart data={detail} />
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium inline-block">詳細數據</div>
                </div>
                <div className="p-4">
                    <StockTable data={detail} />
                </div>
            </div>
        </div>
    )
}