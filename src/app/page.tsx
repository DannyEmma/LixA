import styles from './home.module.css'
import { Poppins } from 'next/font/google'

//-- Components imports --
import Spacer from '@/components/Spacer/Spacer'
import TextAnalyzer from '@/components/TextAnalyzer/TextAnalyzer'
import StatBox from '@/components/StatBox/StatBox'
import AiWrapper from '@/components/AiWrapper/AiWrapper'
import AiComments from '@/components/AiComments/AiComments'
import AiResume from '@/components/AiResume/AiResume'
import DensityPanel from '@/components/DensityPanel/DensityPanel'
import ToolTip from '@/components/ToolTip/ToolTip'
import { MIN_CHAR_IA } from './lib/parameters'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className={styles.home}>
      <Spacer desktop={100} tablet={75} mobile={45} />

      <h1 className={`${styles['primary-title']} ${poppins.className}`}>
        Plongez au cœur de vos <span>données</span> textuelles
      </h1>

      <Spacer desktop={52} tablet={32} />

      <TextAnalyzer />

      <Spacer desktop={32} />

      <div className={styles['statbox-container']}>
        <StatBox variant="character" tooltipTitle="Nombre de caractères" tooltipMessage="Vous trouverez ici le nombre de caractères avec ou sans espace." />
        <StatBox variant="word" tooltipTitle="Nombre de mots" tooltipMessage="Vous trouverez ici le nombre de mots." />
        <StatBox variant="sentence" tooltipTitle="Nombre de phrases" tooltipMessage="Vous trouverez ici le nombre de phrases." />
        <StatBox variant="time" tooltipTitle="Temps de lecture" tooltipMessage="Vous trouverez ici le temps de lecture." />
        <StatBox
          variant="language"
          tooltipTitle="Langue du texte"
          tooltipMessage="Vous trouverez ici la langue du texte. Il peux y avoir quelques incohérences si le texte est trop court."
        />

        <StatBox
          variant="readability"
          tooltipTitle="Indice de lisibilité"
          tooltipMessage="Nous utilisons l'indice de lisibilité LIX, ce qui permet d'évaluer la complexité du texte."
        />
      </div>

      <Spacer desktop={250} mobile={150} />

      <div className={styles['letter-density-container']}>
        <h2 className={`${styles['secondary-title']} ${poppins.className}`}>Densité des lettres</h2>
        <Spacer desktop={32} tablet={0} />
        <DensityPanel variant="letter" />
        <Spacer desktop={20} />
        <AiWrapper
          title="Mistral"
          subtitle="Voilà ce que j'observe :"
          tooltip={
            <ToolTip title="Limite de caractères" message={`Nous avons besoins d'au moin ${MIN_CHAR_IA} caractères, pour vous garantir une observation cohérente.`} size={25} />
          }
        >
          <AiComments type="lettre" />
        </AiWrapper>
      </div>

      <Spacer desktop={250} mobile={150} />

      <div className={styles['word-density-container']}>
        <h2 className={`${styles['secondary-title']} ${poppins.className}`}>Densité des mots</h2>
        <Spacer desktop={32} tablet={0} />
        <DensityPanel variant="word" />
        <Spacer desktop={20} />
        <AiWrapper
          title="Mistral"
          subtitle="Voilà ce que j'observe :"
          tooltip={
            <ToolTip title="Limite de caractères" message={`Nous avons besoins d'au moin ${MIN_CHAR_IA} caractères, pour vous garantir une observation cohérente.`} size={25} />
          }
        >
          <AiComments type="mot" />
        </AiWrapper>
      </div>

      <Spacer desktop={250} mobile={150} />

      <div className={`${styles['resume-container']}`}>
        <h2 className={`${styles['secondary-title']} ${poppins.className}`}>Résumer automatisée</h2>

        <Spacer desktop={52} tablet={32} />

        <AiWrapper
          title="Mistral"
          tooltip={<ToolTip title="Limite de caractères" message={`La génération du résumé est active uniquement à partir de ${MIN_CHAR_IA} caractères.`} size={25} />}
          reverseGradient={true}
          variant="resume"
        >
          <AiResume />
        </AiWrapper>
      </div>

      <Spacer desktop={200} />
    </div>
  )
}
