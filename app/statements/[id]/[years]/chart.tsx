'use client'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { formatNumber } from '@/utils/format-number'
import { HandledStockDetailItem } from '@/api'

const option = (data: HandledStockDetailItem[]) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
        label: {
          formatter: function (obj: any) {
            if (obj.axisDimension === 'y') {
              if (obj.axisIndex === 0) {
                return `${formatNumber(obj.value / 1000)}k`
              } else {
                return `${obj.value.toFixed(2)}%`
              }
            } else if (obj.axisDimension === 'x') {
              return obj.value
            }
          },
        },
      },
    },
    legend: {
      data: ['每月營收', '單月營收年增率'],
      top: 20,
      left: 150,
    },
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: data.map(k => {
          return k.shortDate
        }),
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '千元',
        position: 'left',
        axisLabel: {
          formatter: function (value: number) {
            return formatNumber(value / 1000)
          },
        },
      },
      {
        type: 'value',
        name: '%',
        position: 'right',
        axisLabel: {
          formatter: '{value}%',
        },
      },
    ],
    series: [
      {
        name: '每月營收',
        type: 'bar',
        yAxisIndex: 0,
        itemStyle: {
          color: '#FCD34D', // 黄色
        },
        tooltip: {
          valueFormatter: function (value: number) {
            return `${formatNumber(value / 1000)}k`
          },
        },
        data: data.map(k => k.revenue),
      },
      {
        name: '單月營收年增率',
        yAxisIndex: 1,
        type: 'line',
        itemStyle: {
          color: '#EF4444', // 红色
        },
        lineStyle: {
          color: '#EF4444', // 红色线条
        },
        tooltip: {
          valueFormatter: function (value: number) {
            return `${value}%`
          },
        },
        data: data.map(k => {
          return k.increase ?? 0
        }),
      },
    ],
  }
}

export const Chart: React.FC<{
  data: HandledStockDetailItem[]
}> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const myChart = echarts.init(ref.current)
    myChart.setOption(option(data))
    return () => myChart.dispose()
  }, [data])
  return <div ref={ref} className="h-[600px]"></div>
}
