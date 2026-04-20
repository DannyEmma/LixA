'use client'

import { useEffect, useRef } from 'react'
import styles from './Loader.module.css'

type LoaderProps = { variant: 'textual'; message: string; width?: never; theme?: never } | { variant: '3bars'; message?: never; width: number; theme: 'light' | 'black' }

export default function Loader({ variant, message, width, theme }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant === '3bars') {
      if (loaderRef.current) {
        loaderRef.current.style.width = width + 'px'
        loaderRef.current.classList.add(theme)
      }
    }
  }, [])

  if (variant === '3bars') {
    return (
      <div className={styles['three-bars-loader-container']}>
        <div ref={loaderRef} className={`${styles.loader} ${styles[theme]}`}></div>
      </div>
    )
  }

  return (
    <div className={styles['textual-loader-container']}>
      <p>{message}</p>
      <div className={styles.loader}></div>
    </div>
  )
}
