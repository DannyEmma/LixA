'use client'

import { RefObject, useEffect, useRef, useState } from 'react'
import styles from './RangeControl.module.css'

export default function RangeControl({
  label,
  min,
  max,
  defaultValue,
  ref,
}: {
  label: string
  min: number
  max: number
  defaultValue: number
  ref: RefObject<HTMLInputElement | null>
}) {
  const [value, setValue] = useState(defaultValue)

  //-- Initialize the css variable to the defaultValue --
  useEffect(() => {
    if (ref.current) {
      updateProgressGradient(ref.current, value)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProgressGradient(e.target, parseInt(e.target.value))
    setValue(parseInt(e.target.value))
  }

  //-- Use to have 2 colors on the track of the input range --
  const updateProgressGradient = (el: HTMLInputElement, currentValue: number) => {
    const percent = ((currentValue - min) / (max - min)) * 100
    el.style.setProperty('--progress-gradient', `${percent}%`)
  }

  return (
    <div className={styles['range-control-container']}>
      <label>{label}</label>
      <input ref={ref} onChange={handleChange} className={styles.customRangeInput} type="range" min={min} max={max} defaultValue={value} />
      <output className={styles['valueDisplay']}>{`${value}%`}</output>
    </div>
  )
}
