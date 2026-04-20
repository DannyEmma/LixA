"use client"
import styles from "./TextAnalyzer.module.css"
import useTextAnalysisStore from "@/stores/textAnalysis.store"
import { LetterFrequency, WordFrequency, LetterDensity, WordDensity } from "@/types"
import { useEffect, useRef, useState } from "react"
import { franc } from "franc"

export default function TextAnalyzer() {
  const {
    setText,
    setCharacterCount,
    setWordCount,
    setSentenceCount,
    setReadingTime,
    setLang,
    setReadabilityIndex,
    setTopLettersDensity,
    setTopWordsDensity,
    setIsLoading,
    topDensity,
    text,
    isLoading,
  } = useTextAnalysisStore()
  const [ignoreSpaces, setIgnoreSpaces] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  /* ---------- USE EFFECT ---------- */

  useEffect(() => {
    const cleanText = text.replace(/\n]+/g, "")

    const characterCount = getCharactersCount(cleanText, ignoreSpaces)
    const words = getWords(cleanText)
    const wordCount = words.length
    const longWordCount = words.filter((word) => word.length > 6).length
    const sentenceCount = getSentencesCount(cleanText)
    const lang = getLang(cleanText)

    setCharacterCount(characterCount)
    setWordCount(wordCount)
    setSentenceCount(sentenceCount)
    setReadingTime(getReadingTime(wordCount))
    setLang(lang)
    setReadabilityIndex(getReadabilityIndex(wordCount, longWordCount, sentenceCount))

    setTopLettersDensity(getTopDensity("letter", getLettersFrequency(cleanText), getCharactersCount(cleanText, true)))
    setTopWordsDensity(getTopDensity("word", getWordsFrequency(cleanText), wordCount))
  }, [text, ignoreSpaces])

  /* ---------- METHODS ---------- */

  /**
   * Return a boolean using to know if a letter is valid
   *
   * @param {string} letter
   *
   * @return {boolean}
   */
  const isValidLetter = (letter: string) => /[a-zàâäçéèêëîïôöùûüÿœæ]/i.test(letter)

  /**
   * Return the number of character including spaces or not
   *
   * @param {string} text
   * @param {boolean} ignoreSpaces
   *
   * @return {*}
   */
  const getCharactersCount = (text: string, ignoreSpaces: boolean) => (ignoreSpaces ? text.replace(/\s+/g, "").length : text.length)

  /**
   * Return each word of a text
   *
   * @param {string} text
   *
   * @return {string[]}
   */
  function getWords(text: string) {
    const words = []
    let word = ""

    for (let i = 0; i <= text.length; i++) {
      const letter = text[i] ?? ""

      if (isValidLetter(letter)) {
        word += letter
      } else if (word !== "") {
        //-- Save Each Word --
        words.push(word.toLowerCase())

        //-- Reinitialize word var --
        word = ""
      }
    }

    return words
  }

  /**
   * Return the number of sentence in a text
   *
   * @param {string} text
   *
   * @return {number}
   */
  function getSentencesCount(text: string) {
    //-- A valid sentence is separate by stron punctuation ".", "!" or "?" --
    let sentences = text.split(/[.!?]/)

    //-- A valid sentence begins with an upper case --
    sentences = sentences.filter((sentence) => {
      const currentSentence = sentence.trim()
      const firstLetter = currentSentence.charAt(0)

      return isValidLetter(firstLetter) && firstLetter === firstLetter.toUpperCase()
    })

    return sentences.length
  }

  /**
   * Return the number of minutes need to read a text
   *
   * @param {number} wordCount
   *
   * @return {number}
   */
  function getReadingTime(wordCount: number) {
    const wordsPerMinutes = 200
    const minutes = Math.round(wordCount / wordsPerMinutes)

    return minutes
  }

  /**
   * Return the lan of a text, using "franc" dependency
   *
   * @param {string} text
   *
   * @return {string}
   */
  const getLang = (text: string) => franc(text)

  /**
   * This method use the "LIX" indicator to calcul the readability index of the text
   *
   * Formula:
   * Lix = (words count / sentence count) + ( (100 * long word count) / word count)
   *
   * @param {number} wordCount
   * @param {number} longWordCount
   * @param {number} sentenceCount
   *
   * @return {number}
   */
  function getReadabilityIndex(wordCount: number, longWordCount: number, sentenceCount: number) {
    const lix = Math.round(wordCount / sentenceCount + (100 * longWordCount) / wordCount)

    return !isFinite(lix) ? NaN : lix
  }

  /**
   * Return the letters frequency of a text
   *
   * @param {string} text
   *
   * @return {LetterFrequency[]}
   */
  function getLettersFrequency(text: string) {
    const lettersFrequency: LetterFrequency[] = []

    const indexOfLetter = (letter: string) => lettersFrequency.findIndex((lf) => lf.letter === letter)

    //-- Get frequency of each letter --
    for (const letter of text) {
      const lowerLetter = letter.toLowerCase()

      if (isValidLetter(lowerLetter)) {
        const index = indexOfLetter(lowerLetter)

        //-- Create the first letterFrequency object to this letter --
        if (index === -1) {
          const lf = { letter: lowerLetter, frequency: 1 }
          lettersFrequency.push(lf)
        }
        //-- Increment letter frequency --
        else {
          lettersFrequency[index].frequency += 1
        }
      }
    }

    return lettersFrequency
  }

  /**
   * Return the words frequency of a text
   *
   * @param {string} text
   *
   * @return {WordFrequency[]}
   */
  function getWordsFrequency(text: string) {
    let words = getWords(text)
    const wordsFrequency: WordFrequency[] = []

    const wordExists = (word: string) => wordsFrequency.some((wf) => wf.word === word)

    //-- Get the frequency per word --
    words.forEach((currentWord) => {
      if (!wordExists(currentWord)) {
        const frequency = words.filter((word) => currentWord === word).length
        const wf = { word: currentWord, frequency: frequency }
        wordsFrequency.push(wf)

        //-- Delete the current word --
        words = words.filter((word) => word !== currentWord)
      }
    })

    return wordsFrequency
  }

  function isLetterFrequency(data: LetterFrequency | WordFrequency): data is LetterFrequency {
    return "letter" in data
  }

  /**
   * Return the top densities of word or letter depending of the type param
   *
   * @param {'letter' | 'word'} type
   * @param {LetterFrequency[] | WordFrequency[]} frequencies
   * @param {number} total
   *
   * @return { LetterDensity[] | WordDensity[]}
   */
  function getTopDensity(type: "letter", frequencies: LetterFrequency[], total: number): LetterDensity[]
  function getTopDensity(type: "word", frequencies: WordFrequency[], total: number): WordDensity[]
  function getTopDensity(type: "letter" | "word", frequencies: LetterFrequency[] | WordFrequency[], total: number): LetterDensity[] | WordDensity[] {
    const densities = frequencies.map((data) => {
      const density = Math.round((data.frequency / total) * 100)
      if (isLetterFrequency(data)) return { letter: data.letter, density }

      return { word: data.word, density }
    })

    //-- Get the top densities --
    const topDensities = densities.sort((a, b) => b.density - a.density).slice(0, topDensity)

    return type === "letter" ? (topDensities as LetterDensity[]) : (topDensities as WordDensity[])
  }

  //---------- EVENT HANDLERS ----------//

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isLoading) setIsLoading(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setText(event.target.value)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={styles["textanalyser-container"]}>
      <textarea onChange={handleChangeTextarea} className={styles["textarea"]} placeholder="Collez ou saissisez votre texte ici..."></textarea>
      <label>
        <input onChange={() => setIgnoreSpaces((v) => !v)} className={styles["checkbox"]} type="checkbox" defaultChecked={ignoreSpaces} />
        <div className={styles["custom-checkbox"]}></div>
        Exclure les espaces
      </label>
    </div>
  )
}
