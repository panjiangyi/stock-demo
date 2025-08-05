"use client"
import { useEffect, useRef } from "react"
import * as echarts from "echarts";
import { formatNumber } from "@/utils/format-number";
import { HandledStockDetailItem } from "@/api";

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
            data: ['每月營收', '每月營收年增率'],
            bottom: 10
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
                name: '千元',
                position: 'left',
                axisLabel: {
                    formatter: function (value: number) {
                        return formatNumber(value)
                    }
                }
            },
            {
                type: 'value',
                name: '%',
                position: 'right',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
        ],
        series: [
            {
                name: '每月營收',
                type: 'bar',
                yAxisIndex: 0,
                itemStyle: {
                    color: '#FCD34D' // 黄色
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatNumber(value);
                    }
                },
                data: data.map(k => k.revenue)
            },
            {
                name: '每月營收年增率',
                yAxisIndex: 1,
                type: 'line',
                itemStyle: {
                    color: '#EF4444' // 红色
                },
                lineStyle: {
                    color: '#EF4444' // 红色线条
                },
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
        const myChart = echarts.init(ref.current);
        myChart.setOption(option(data));
        return () => myChart.dispose()
    }, [data])
    return <div ref={ref} className="h-[600px]"></div>
}