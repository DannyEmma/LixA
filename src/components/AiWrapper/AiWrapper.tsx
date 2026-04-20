'use client'

import styles from './AiWrapper.module.css'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import useTextAnalysisStore from '@/stores/textAnalysis.store'
import { MIN_CHAR_IA } from '@/app/lib/parameters'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '400'],
})

export default function AiWrapper({
  children,
  title,
  subtitle,
  reverseGradient = false,
  variant = 'note',
  tooltip,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
  reverseGradient?: boolean
  variant?: 'note' | 'resume'
  tooltip?: React.ReactNode
}) {
  const { text } = useTextAnalysisStore()

  return (
    <div
      className={`${styles['ai-wrapper']} ${reverseGradient ? styles['reverse-gradient'] : styles['gradient']} ${
        variant === 'note' ? styles['note-variant'] : styles['resume-variant']
      }`}
    >
      <div className={`${styles['header']} ${poppins.className}`}>
        <Image src="/img/ia-icon.svg" width={40} height={40} alt="IA Icon" />

        <p className={styles['wrapper-title']}>
          {title} <br />
          <small>{subtitle}</small>
        </p>

        {text.length <= MIN_CHAR_IA && <div className={styles['tooltip-container']}>{tooltip}</div>}
      </div>
      <div className={styles['wrapper-content']}>{children}</div>
    </div>
  )
}
