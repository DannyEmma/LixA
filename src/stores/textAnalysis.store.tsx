import { create } from 'zustand'
import { TextAnalysis } from '@/types'

const useTextAnalysisStore = create<TextAnalysis>((set) => ({
  text: '',
  characterCount: 0,
  wordCount: 0,
  longWordCount: 0, // > 6 letter
  sentenceCount: 0,
  readingTime: 0,
  lang: '',
  readabilityIndex: 0,
  topDensity: 5,
  topLettersDensity: [],
  topWordsDensity: [],
  isLoading: false,
  setText: (value) => set(() => ({ text: value })),
  setCharacterCount: (value) => set(() => ({ characterCount: value })),
  setWordCount: (value) => set(() => ({ wordCount: value })),
  setLongWordCount: (value) => set(() => ({ longWordCount: value })),
  setSentenceCount: (value) => set(() => ({ sentenceCount: value })),
  setReadingTime: (value) => set(() => ({ readingTime: value })),
  setLang: (value) => set(() => ({ lang: value })),
  setReadabilityIndex: (value) => set(() => ({ readabilityIndex: value })),
  setTopLettersDensity: (value) => set(() => ({ topLettersDensity: value })),
  setTopWordsDensity: (value) => set(() => ({ topWordsDensity: value })),
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}))

export default useTextAnalysisStore
