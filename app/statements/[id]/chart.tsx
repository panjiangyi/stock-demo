"use client"
import { useEffect, useRef } from "react"
import * as echarts from "echarts";
import { StockDetailItem } from "./page";

const option = (data: StockDetailItem[]) => ({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },

    xAxis: [
        {
            type: 'category',
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '每月营收',
            min: Math.min(...data.map(k => k.revenue)),
            max: Math.max(...data.map(k => k.revenue)),

        },
        {
            type: 'value',
            name: '单月营收增长率',
            min: Math.min(...data.map(k => k.revenue)),
            max: Math.max(...data.map(k => k.revenue)),

        },
    ],
    series: [
        {
            name: 'revenue',
            type: 'line',
            tooltip: {
                valueFormatter: function (value: number) {
                    return `每月营收${value}`;
                }
            },
            data: data.map(k => k.revenue)
        }, {
            name: 'increase',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value: number) {
                    return `单月营收增长率${value}`;
                }
            },
            data: data.map(k => k.revenue)
        }
    ]
});


export const Chart: React.FC<{
    data: StockDetailItem[]
}> = ({ data }) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        var myChart = echarts.init(ref.current);
        myChart.setOption(option(data));
    }, [])
    return <div ref={ref} className="h-[600px]"></div>
}