'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ReadabilityIndex.module.css'
import useTextAnalysisStore from '@/stores/textAnalysis.store'
import ReactCurvedText from 'react-curved-text'

export default function ReadabilityIndex() {
  const { readabilityIndex } = useTextAnalysisStore()
  const [label, setLabel] = useState('')
  const defaultPointerPos = '-90deg'
  const gaujeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gaujeEl = gaujeRef.current
    if (gaujeEl) gaujeEl.style.setProperty('--pointer-pos', getPointerPos())
  }, [readabilityIndex])

  const getPointerPos = () => {
    let pointerPos = defaultPointerPos

    //-- 0 - 20 --
    if (readabilityIndex > 0 && readabilityIndex <= 20) {
      pointerPos = '-75deg'
      setLabel('facile++')
    }
    //-- 21 - 30 --
    else if (readabilityIndex > 20 && readabilityIndex <= 30) {
      pointerPos = '-45deg'
      setLabel('facile')
    }
    //-- 31 - 40 --
    else if (readabilityIndex > 30 && readabilityIndex <= 40) {
      pointerPos = '-15deg'
      setLabel('moyen')
    }
    //-- 41 - 50 --
    else if (readabilityIndex > 40 && readabilityIndex <= 50) {
      pointerPos = '15deg'
      setLabel('difficile')
    }
    //-- 51 - 60 --
    else if (readabilityIndex > 50 && readabilityIndex <= 60) {
      pointerPos = '45deg'
      setLabel('difficile++')
    }
    //-- 61+ --
    else if (readabilityIndex > 60) {
      pointerPos = '75deg'
      setLabel('expert')
    }
    //-- NaN --
    else {
      setLabel('')
    }

    return pointerPos
  }

  return (
    <div className={styles['readability-index']}>
      <div ref={gaujeRef} className={styles.gauje}>
        <div className={styles['gauje-pointer']}>
          <ReactCurvedText width={150} height={150} cx={75} cy={75} rx={50} ry={50} startOffset={50} reversed={true} text={label} />
        </div>
      </div>
      <output>{isNaN(readabilityIndex) ? 'NaN' : readabilityIndex}</output>
    </div>
  )
}
