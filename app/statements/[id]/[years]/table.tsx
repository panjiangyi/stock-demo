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
        <div className='flex my-2 border-2 border-gray-50'>
            <div className=' shrink-0 border-r-2 border-gray-50'>
                <div className='pl-1 border-b-2 border-gray-50 leading-10'>年度月份</div>
                <div className='pl-1 border-b-2 border-gray-50 leading-10'>每月营收</div>
                <div className='pl-1 leading-10'>单月营收增长率%</div>
            </div>
            <div ref={ref} className='flex-1 flex overflow-auto m-w-[250px] text-center'>
                {
                    data.map(k => {
                        return <div key={k.date}>
                            <div className='pl-1 border-b-2 border-r-2 border-gray-50 leading-10'>{k.shortDate}</div>
                            <div className='pl-1 border-b-2 border-r-2 border-gray-50 leading-10'>{formatNumber(k.revenue)}</div>
                            <div className='pl-1 border-r-2 border-gray-50  leading-10'>{k.increase ?? '-'}</div>
                        </div>
                    })
                }
            </div>
        </div>

    );
}