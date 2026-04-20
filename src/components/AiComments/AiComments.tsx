'use client'

import styles from './AiComments.module.css'
import { useEffect, useState } from 'react'
import useTextAnalysisStore from '@/stores/textAnalysis.store'
import { MIN_CHAR_IA } from '@/app/lib/parameters'

import Loader from '@/components/Loader/Loader'

export default function AiComments({ type }: { type: string }) {
  const { text, topLettersDensity, topWordsDensity } = useTextAnalysisStore()
  const [content, setContent] = useState('<p>Les données ne sont pas suffisante.</p>')
  const [isLoading, setIsLoading] = useState(false)
  const densities = type === 'lettre' ? topLettersDensity : topWordsDensity

  useEffect(() => {
    if (text !== '' && text.length > MIN_CHAR_IA && densities.length) {
      setIsLoading(true)

      fetch('/api/mistral-ai/comment', {
        method: 'POST',
        body: JSON.stringify({ type, text, densities }),
      })
        .then((response) => response.json())
        .then((result) => setContent(result.response))
        .finally(() => setIsLoading(false))
    }
  }, [topLettersDensity, topWordsDensity])

  return (
    <>
      {isLoading ? (
        <div className={styles['ai-comments']}>
          <Loader variant="textual" message="Mistral est entrain de réfléchir" />
        </div>
      ) : (
        // -- "dangerouslySetInnerHTML", use because html appear as string on the screen --
        <div className={styles['ai-comments']} dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </>
  )
}
