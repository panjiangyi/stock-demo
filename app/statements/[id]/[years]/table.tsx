"use client"
import * as React from 'react';


import { formatNumber } from '@/utils/format-number';
import { HandledStockDetailItem } from '@/api';


export const StockTable: React.FC<{
    data: HandledStockDetailItem[]
}> = ({ data }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (ref.current == null) return;
        ref.current.scrollLeft = Number.MAX_SAFE_INTEGER;
    }, [])
    return (
        <div className='border border-gray-200 rounded'>
            <div className='flex'>
                <div className='bg-gray-50 border-r border-gray-200 min-w-[120px]'>
                    <div className='px-3 py-2 border-b border-gray-200 font-medium text-sm'>年度月份</div>
                    <div className='px-3 py-2 border-b border-gray-200 font-medium text-sm'>每月營收</div>
                    <div className='px-3 py-2 font-medium text-sm'>每月營收年增率 (%)</div>
                </div>
                <div ref={ref} className='flex-1 flex overflow-auto'>
                    {
                        data.map((k, index) => {
                            return <div key={k.date} className={`min-w-[100px] text-center ${index !== data.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                <div className='px-3 py-2 border-b border-gray-200 text-sm'>{k.shortDate}</div>
                                <div className='px-3 py-2 border-b border-gray-200 text-sm'>{formatNumber(k.revenue)}</div>
                                <div className='px-3 py-2 text-sm'>{k.increase ?? '--'}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}