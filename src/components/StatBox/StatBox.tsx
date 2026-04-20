'use client'
import styles from './StatBox.module.css'

import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { StatBoxVariant } from '@/types'
import useTextAnalysisStore from '@/stores/textAnalysis.store'
import useCountryCodeConverter from '@/hooks/useCountryCodeConverter'

import ReadabilityIndex from '../ReadabilityIndex/ReadabilityIndex'

import Flag from 'react-world-flags'
import Loader from '@/components/Loader/Loader'
import ToolTip from '@/components/ToolTip/ToolTip'
import { useEffect, useState } from 'react'

const poppins = Poppins({
  weight: ['500', '400'],
  subsets: ['latin'],
})

const variant_styles = {
  character: { title: 'caractères', color: 'var(--gray-box-color)', icon: '/statbox-icons/character.svg', iconSize: { w: 18, h: 12 } },
  word: { title: 'mots', color: 'var(--blue-box-color)', icon: '/statbox-icons/word.svg', iconSize: { w: 17, h: 15 } },
  sentence: { title: 'phrases', color: 'var(--orange-box-color)', icon: '/statbox-icons/sentence.svg', iconSize: { w: 13, h: 13 } },
  time: { title: 'temps de lecture', color: 'var(--red-box-color)', icon: '/statbox-icons/time.svg', iconSize: { w: 18, h: 18 } },
  language: { title: 'langue', color: 'var(--green-box-color)', icon: '/statbox-icons/language.svg', iconSize: { w: 18, h: 18 } },
  readability: { title: 'indice de lisibilité', color: 'var(--purple-box-color)', icon: '/statbox-icons/index.svg', iconSize: { w: 18, h: 18 } },
}

export default function StatBox({ variant, tooltipTitle, tooltipMessage }: { variant: StatBoxVariant; tooltipTitle: string; tooltipMessage: string }) {
  const { characterCount, wordCount, sentenceCount, readingTime, lang, isLoading } = useTextAnalysisStore()
  const { title, color, icon, iconSize } = variant_styles[variant]
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false)

  const { languageName, countryCode } = useCountryCodeConverter(lang)

  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) setIsTabletOrMobile(true)
  }, [])

  return (
    <div className={`${poppins.className} ${styles['statbox']}`} style={{ background: color }}>
      <div className={styles['header']}>
        <div className={styles['icon-container']}>
          <Image className={styles['icon']} src={icon} width={iconSize.w} height={iconSize.h} alt="Character Icon" />
          <div className={styles['tooltip-container']}>
            <ToolTip pos={isTabletOrMobile ? 'left' : 'middle'} title={tooltipTitle} message={tooltipMessage} size={50} hideIcon />
          </div>
        </div>
        <p className={`${poppins.className} ${styles['title']}`}>{title}</p>
      </div>

      <div className={styles['stat']}>
        {isLoading ? (
          <Loader variant="3bars" width={35} theme="black" />
        ) : (
          <>
            {variant === 'character' && <p>{characterCount}</p>}
            {variant === 'word' && <p>{wordCount}</p>}
            {variant === 'sentence' && <p>{sentenceCount}</p>}
            {variant === 'time' &&
              (readingTime ? (
                <p>
                  {readingTime}
                  <small>min</small>
                </p>
              ) : (
                <p>
                  {'<1'}
                  <small>min</small>
                </p>
              ))}
            {variant === 'language' && (
              <div className={styles['language-content']}>
                <Flag className={styles.flag} code={countryCode} fallback="--" />
                <p>{languageName}</p>
              </div>
            )}
            {variant === 'readability' && <ReadabilityIndex />}
          </>
        )}
      </div>
    </div>
  )
}
