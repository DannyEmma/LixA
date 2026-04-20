export type Theme = 'light' | 'dark'

export type StatBoxVariant = 'character' | 'word' | 'sentence' | 'language' | 'time' | 'readability'

export type LetterFrequency = { letter: string; frequency: number }
export type LetterDensity = { letter: string; density: number }

export type WordFrequency = { word: string; frequency: number }
export type WordDensity = { word: string; density: number }

export type TextAnalysis = {
  text: string
  characterCount: number
  wordCount: number
  longWordCount: number
  sentenceCount: number
  readingTime: number
  lang: string
  readabilityIndex: number
  topDensity: number
  topLettersDensity: LetterDensity[]
  topWordsDensity: WordDensity[]
  isLoading: boolean
  setText: (value: string) => void
  setCharacterCount: (value: number) => void
  setWordCount: (value: number) => void
  setLongWordCount: (value: number) => void
  setSentenceCount: (value: number) => void
  setReadingTime: (value: number) => void
  setLang: (value: string) => void
  setReadabilityIndex: (value: number) => void
  setTopLettersDensity: (value: LetterDensity[]) => void
  setTopWordsDensity: (value: WordDensity[]) => void
  setIsLoading: (value: boolean) => void
}
