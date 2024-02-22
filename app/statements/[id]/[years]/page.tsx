'use server'

import { queryStockInfo } from "@/app/layout";
import { fetchWithQueryParams } from "@/utils/fetch";

import { Chart } from "./chart";
import { StockTable } from "./table";
import { SimpleListMenu } from "./menu";

export interface StockDetailItem {
    date: string;
    stock_id: string;
    country: string;
    revenue: number;
    revenue_month: number;
    revenue_year: number;
}
export type HandledStockDetailItem = StockDetailItem & {
    increase?: number;
    shortDate: string;
}
export async function queryStockDetail(id: string, years: number): Promise<HandledStockDetailItem[]> {
    const res = await fetchWithQueryParams<StockDetailItem[]>('https://api.finmindtrade.com/api/v4/data', {
        dataset: "TaiwanStockMonthRevenue",
        data_id: '2330',
        start_date: `${2024 - years}-01-02`
    })
    return res.map((k, i) => {
        const lastYearMonth = res[i - 12]
        const [year, month,] = k.date.split('-');

        const shortDate = `${year.slice(2)}/${month}`;
        if (lastYearMonth == null) {
            return {
                ...k, shortDate,
            }
        }
        const increase = (k.revenue / lastYearMonth.revenue) - 1

        return {
            ...k,
            increase: Math.round(increase * 10000) / 100,
            shortDate,
        }
    })
}


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