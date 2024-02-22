"use client"
import { useEffect, useRef } from "react"
import * as echarts from "echarts";
import { HandledStockDetailItem, StockDetailItem } from "./page";
import { formatNumber } from "@/utils/format-number";

const option = (data: HandledStockDetailItem[]) => {

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['每月营收', '单月营收增长率',]
        },
        xAxis: [
            {
                type: 'category',
                axisPointer: {
                    type: 'shadow'
                },
                data: data.map(k => {
                    return k.shortDate
                })
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '每月营收',
                min: Math.min(...data.map(k => k.revenue)),
                max: Math.max(...data.map(k => k.revenue)),
                axisLabel: {
                    formatter: function (value: number) {
                        return formatNumber(value)
                    }
                }
            },
            {
                type: 'value',
                name: '单月营收增长率',

            },
        ],
        series: [
            {
                name: '每月营收',
                type: 'line',
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatNumber(value);
                    }
                },
                data: data.map(k => k.revenue)
            },
            {
                name: '单月营收增长率',
                yAxisIndex: 1,
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value: number) {
                        return `${value}%`;
                    }
                },
                data: data.map(k => {
                    return k.increase ?? 0;
                })
            }
        ]
    }
};


export const Chart: React.FC<{
    data: HandledStockDetailItem[]
}> = ({ data }) => {

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        var myChart = echarts.init(ref.current);
        myChart.setOption(option(data));
    }, [])
    return <div ref={ref} className="h-[600px]"></div>
}