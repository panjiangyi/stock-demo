import { fetchWithQueryParams } from "@/utils/fetch";
import uniqBy from "lodash.uniqby";
export interface StockInfo {
    industry_category: string;
    stock_id: string;
    stock_name: string;
    type: string;
    date: string;
}

export async function queryStockInfo() {
    const res = await fetchWithQueryParams<StockInfo[]>('https://api.finmindtrade.com/api/v4/data', {
        dataset: "TaiwanStockInfo",
        date: "2024-02-21",
    })
    return uniqBy(res, "stock_id")
}


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