'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ToolTip.module.css'

import Image from 'next/image'

export default function TootTip({ title, message, hideIcon, size, pos = 'middle' }: { title: string; message: string; hideIcon?: boolean; size: number; pos?: 'left' | 'middle' }) {
  const tooltipContainerRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const close = (event: MouseEvent | TouchEvent) => {
      const tooltipContainer = tooltipContainerRef.current
      if (tooltipContainer) {
        if (!tooltipContainer.contains(event.target as Node)) setShowTooltip(false)
      }
    }

    if (showTooltip) {
      document.addEventListener('mouseover', close)
      document.addEventListener('touchstart', close)
    }

    return () => {
      document.removeEventListener('mouseover', close)
      document.removeEventListener('touchstart', close)
    }
  }, [showTooltip])

  return (
    <div ref={tooltipContainerRef} className={styles['tool-tip-container']} onMouseOver={() => setShowTooltip(true)} onTouchStart={() => setShowTooltip(true)}>
      <Image className={`${styles.icon} ${hideIcon ? styles['hide-icon'] : ''}`} src={'/img/tooltip.svg'} width={size} height={size} alt="Tooltip icon" />

      {showTooltip && (
        <div className={`${styles['tool-tip']} ${styles[pos]}`}>
          <p className={styles.title}>
            {!hideIcon && <Image className={styles['inside-icon']} src={'/img/tooltip.svg'} width={20} height={20} alt="Tooltip icon" />}

            {title}
          </p>
          <p>{message}</p>
        </div>
      )}
    </div>
  )
}
