'use client'

import styles from './AiResume.module.css'

import { useRef, useState } from 'react'
import useTextAnalysisStore from '@/stores/textAnalysis.store'
import { MIN_CHAR_IA } from '@/app/lib/parameters'

import RangeControl from '@/components/RangeControl/RangeControl'
import Loader from '@/components/Loader/Loader'
import Toast from '@/components/Toast/Toast'

export default function AiResume() {
  const { text } = useTextAnalysisStore()
  const inputRangeLengthRef = useRef<HTMLInputElement>(null)
  const inputRangeComplexity = useRef<HTMLInputElement>(null)
  const [resume, setResume] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const timeoutRef = useRef(null)

  // ---------- EVENTS HANDLER ---------- //

  const handleGenerate = () => {
    const complexity = inputRangeComplexity.current ? parseInt(inputRangeComplexity.current.value) : 50
    const percentLength = inputRangeLengthRef.current ? parseInt(inputRangeLengthRef.current.value) : 30
    const length = text.length * (percentLength / 100)

    setIsLoading(true)

    fetch('/api/mistral-ai/resume', {
      method: 'POST',
      body: JSON.stringify({ text, resumeLength: length, complexity }),
    })
      .then((response) => response.json())
      .then((result) => setResume(result.response))
      .finally(() => setIsLoading(false))
  }

  const handleCopy = () => {
    //-- Copy resume in user clipboard --
    navigator.clipboard.writeText(resume)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setShowToast(true)

    setTimeout(() => setShowToast(false), 1500)
  }

  return (
    <div className={styles['ai-resume-container']}>
      <div className={styles.adjustment}>
        <RangeControl ref={inputRangeLengthRef} label="Longeur" min={5} max={50} defaultValue={30} />
        <RangeControl ref={inputRangeComplexity} label="Complexité" min={0} max={100} defaultValue={50} />
        <button onClick={handleGenerate} disabled={text.length < MIN_CHAR_IA}>
          Générer
        </button>
      </div>
      <div className={styles['resume-output']}>
        <div className={styles.header}>
          <p>Sortie du résumé : </p>
          <button className={styles['copy-button']} onClick={handleCopy} disabled={text.length < MIN_CHAR_IA || !resume.length}>
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_190_123)">
                <path
                  d="M15 21V22.875C15 23.4963 14.4963 24 13.875 24H1.125C0.503672 24 0 23.4963 0 22.875V5.625C0 5.00367 0.503672 4.5 1.125 4.5H4.5V18.375C4.5 19.8225 5.67755 21 7.125 21H15ZM15 4.875V0H7.125C6.50367 0 6 0.503672 6 1.125V18.375C6 18.9963 6.50367 19.5 7.125 19.5H19.875C20.4963 19.5 21 18.9963 21 18.375V6H16.125C15.5063 6 15 5.49375 15 4.875ZM20.6705 3.42052L17.5795 0.329484C17.3685 0.11852 17.0824 1.55998e-06 16.784 0L16.5 0V4.5H21V4.21598C21 3.91763 20.8815 3.63149 20.6705 3.42052Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_190_123">
                  <rect width="21" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <div className={styles['toast-container']}>{showToast && <Toast message="Copié !" />}</div>
        </div>
        <output>{isLoading ? <Loader variant="textual" message="Mistral prépare votre résumé" /> : resume ? resume : 'Cette zone contiendra le résumé après génération.'}</output>
      </div>
    </div>
  )
}
