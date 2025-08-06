'use server'

import { Chart } from './chart'
import { StockTable } from './table'
import { SimpleListMenu } from './menu'
import { queryStockDetail, queryStockInfo } from '@/api'

export default async function StockDetail({ params }: { params?: { id?: string; years?: string } }) {
  const stocks = await queryStockInfo()
  const currentStock = stocks.find(stock => stock.stock_id === params?.id) ?? stocks[0]
  const stockID = currentStock.stock_id
  const years = Number(params?.years ?? 3)
  if (currentStock == null) return <h1>404</h1>
  const detail = await queryStockDetail(currentStock.stock_id, years)

  // 检查 detail 是否为空数组
  if (!detail || detail.length === 0) {
    return (
      <div className="space-y-6">
        <header className="bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl font-medium">
            {currentStock.stock_name} ({currentStock.stock_id})
          </h1>
        </header>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">每月營收</div>
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
              <SimpleListMenu id={stockID} years={`${years}`} />
            </div>
          </div>
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無數據</h3>
            <p className="text-gray-500">該股票在選擇的時間範圍內沒有營收數據</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-xl font-medium">
          {currentStock.stock_name} ({currentStock.stock_id})
        </h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">每月營收</div>
          <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
            <SimpleListMenu id={stockID} years={`${years}`} />
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
