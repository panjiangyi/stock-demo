'use client'
import * as React from 'react'

import { formatNumber } from '@/utils/format-number'
import { HandledStockDetailItem } from '@/api'
import dayjs from 'dayjs'

export const StockTable: React.FC<{
  data: HandledStockDetailItem[]
}> = ({ data }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm">
      <div className="flex">
        <div className="bg-gray-50 border-r border-gray-200 min-w-[140px] font-bold">
          <div className="px-3 py-2 border-b border-gray-200 text-sm">年度月份</div>
          <div className="px-3 py-2 border-b border-gray-200 text-sm">每月營收(千元)</div>
          <div className="px-3 py-2 text-sm">單月營收年增率 (%)</div>
        </div>
        <div
          className="flex-1 flex overflow-x-auto
           focus:
    [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-400
    [&::-webkit-scrollbar-thumb:hover]:bg-gray-500
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-button]:hidden
    focus:outline-none 
    "
          tabIndex={0}
          role="region"
          aria-label="Scrollable table"
          style={{
            direction: 'rtl',
          }}
        >
          {[...data].reverse().map((k, index) => {
            return (
              <div
                key={k.date}
                className={`min-w-[120px] text-center ${index !== data.length - 1 ? 'border-r border-gray-200' : ''}`}
                style={{
                  direction: 'ltr',
                }}
              >
                <div className="px-3 py-2 border-b border-gray-200 text-sm font-bold">
                  {dayjs(k.date).format('YYYY/MM')}
                </div>
                <div className="px-3 py-2 border-b border-gray-200 text-sm">{formatNumber(k.revenue / 1000)}</div>
                <div className="px-3 py-2 text-sm">{k.increase ? `${k.increase}%` : '-'}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
