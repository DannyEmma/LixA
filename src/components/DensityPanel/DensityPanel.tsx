'use client'
import styles from './DensityPanel.module.css'

import useTextAnalysisStore from '@/stores/textAnalysis.store'
import CustomPieChart from '@/components/CustomPieChart/CustomPieChart'
import Loader from '@/components/Loader/Loader'
import { LetterDensity, WordDensity } from '@/types'

export default function DensityPanel({ variant }: { variant: 'letter' | 'word' }) {
  const { topLettersDensity, topWordsDensity, isLoading } = useTextAnalysisStore()

  const densities = variant === 'letter' ? topLettersDensity : topWordsDensity
  const colors = ['#e47011', '#4282b3', '#49aba2', '#a94c77', '#d13823']

  return (
    <div className={styles['density-panel']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">{variant === 'letter' ? 'Lettre' : 'Mot'}</th>
            <th scope="col">Densité %</th>
          </tr>
        </thead>
        <tbody>
          {densities.length === 0 && (
            <tr>
              <td className={styles['no-data']} colSpan={4}>
                Aucune données.
              </td>
            </tr>
          )}
          {densities.map((data, index) => (
            <tr key={index}>
              <td>
                <div className={styles.color} style={{ background: colors[index] }}></div>
              </td>
              <td>{`#${index + 1}`}</td>
              <td className={styles['letter-or-word']}>
                {isLoading ? <Loader variant="3bars" theme="light" width={15} /> : variant === 'letter' ? (data as LetterDensity).letter : (data as WordDensity).word}
              </td>
              <td>{isLoading ? <Loader variant="3bars" theme="light" width={15} /> : data.density}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPieChart variant={variant} densities={densities} colors={colors} />
    </div>
  )
}
