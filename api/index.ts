import { fetchWithQueryParams } from '@/utils/fetch'
import uniqBy from 'lodash.uniqby'
import dayjs from 'dayjs'
export interface StockInfo {
  industry_category: string
  stock_id: string
  stock_name: string
  type: string
  date: string
}

export async function queryStockInfo() {
  const res = await fetchWithQueryParams<StockInfo[]>('https://api.finmindtrade.com/api/v4/data', {
    dataset: 'TaiwanStockInfo',
    date: '2024-02-21',
  })
  return uniqBy(res, 'stock_id')
}

export interface StockDetailItem {
  date: string
  stock_id: string
  country: string
  revenue: number
  revenue_month: number
  revenue_year: number
}
export type HandledStockDetailItem = StockDetailItem & {
  increase?: number
  shortDate: string
}
export async function queryStockDetail(id: string, years: number): Promise<HandledStockDetailItem[]> {
  // Query extra one year of data for calculating year-over-year percentage
  const startDate = dayjs()
    .subtract(years + 1, 'year')
    .subtract(1, 'month')
  const endDate = dayjs().subtract(1, 'day')
  const res = await fetchWithQueryParams<StockDetailItem[]>('https://api.finmindtrade.com/api/v4/data', {
    dataset: 'TaiwanStockMonthRevenue',
    data_id: id,
    start_date: startDate.format('YYYY-MM-DD'),
    end_date: endDate.format('YYYY-MM-DD'),
  })

  // Filter out the extra year data that users don't need to see
  const filteredRes = res.filter(item => {
    const itemDate = dayjs(item.date)
    const cutoffDate = dayjs().subtract(years, 'year')
    return itemDate.isAfter(cutoffDate) || itemDate.isSame(cutoffDate, 'month')
  })

  return filteredRes.map((k, i) => {
    // Find the corresponding month from the previous year in the full dataset
    const currentDate = dayjs(k.date)
    const lastYearDate = currentDate.subtract(1, 'year')
    const lastYearMonth = res.find(item => dayjs(item.date).isSame(lastYearDate, 'month'))

    const [year, month] = k.date.split('-')
    const shortDate = `${year.slice(2)}/${month}`

    if (lastYearMonth == null) {
      return {
        ...k,
        shortDate,
      }
    }
    const increase = k.revenue / lastYearMonth.revenue - 1

    return {
      ...k,
      increase: Math.round(increase * 10000) / 100,
      shortDate,
    }
  })
}
