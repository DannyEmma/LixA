'use client'
import { LetterDensity, WordDensity } from '@/types'
import styles from './CustomPieChart.module.css'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

function renderActiveShape(props: any) {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, density, value, id, name } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <foreignObject className={styles['middle-text-container']} x={cx} y={cy}>
        <p className={styles['middle-text']}>{id === 1 && name}</p>
      </foreignObject>
      {/* <text className={styles['middle-text']} x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {id === 1 && name}
      </text> */}
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill={'none'} />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <foreignObject className={styles['label-container']}>
        <p className={styles.label}>{name}</p>
      </foreignObject>

      <text className={styles.label} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill}>{`"${name}"`}</text>
      <text className={styles.taux} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor}>
        {`( Taux ${density}% )`}
      </text>
    </g>
  )
}

export default function CustomPieChart({ variant, densities, colors }: { variant: 'letter' | 'word'; densities: LetterDensity[] | WordDensity[]; colors: string[] }) {
  const [mounted, setMounted] = useState(false)

  const data = () => {
    return densities.map((data, index) => {
      const name = variant === 'letter' ? (data as LetterDensity).letter : (data as WordDensity).word
      return { id: index + 1, name, density: data.density, fill: colors[index] }
    })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    return (
      <PieChart className={styles['custom-pie-chart']} width={600} height={420}>
        <Pie activeIndex={[0, 1, 2, 3, 4]} activeShape={renderActiveShape} data={data()} cx="50%" cy="50%" innerRadius={80} outerRadius={100} nameKey="name" dataKey="density" />
      </PieChart>
    )
  }
}
