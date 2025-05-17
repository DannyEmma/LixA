import styles from './home.module.css'
import { Poppins } from 'next/font/google'

//-- Components imports --
import TextAnalyzer from '@/components/TextAnalyzer/TextAnalyzer'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <>
      <h1 className={`${styles.title} ${poppins.className}`}>
        Plongez au cœur de vos <br /> <span>données</span> textuelles
      </h1>
      <TextAnalyzer />
    </>
  )
}
