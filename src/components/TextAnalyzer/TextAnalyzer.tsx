import styles from './TextAnalyzer.module.css'

export default function TextAnalyzer() {
  return <textarea className={styles.textarea} placeholder="Collez ou saissisez votre texte ici ..."></textarea>
}
