'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeSwitcher.module.css'
import Image from 'next/image'
import { Theme } from '@/types'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    const cookies = document.cookie
    const hasCookieThemeSet = cookies.split('; ').find((row) => row.startsWith('theme='))
    const currentTheme = hasCookieThemeSet?.split('=')[1]

    if (currentTheme === 'dark' || currentTheme === 'light') {
      setTheme(currentTheme)
    } else {
      //-- First initialization of the cookie theme --
      document.cookie = `theme=dark;Path=/`
      setTheme('dark')
    }
  }, [])

  const handleClick = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.cookie = `theme=${nextTheme};Path=/`
    switchTheme(nextTheme)
    setTheme(nextTheme)
  }

  const switchTheme = (theme: Theme) => {
    document.querySelector('html')?.classList.toggle('light-theme', theme !== 'dark')
  }

  return (
    <button className={styles.button}>
      {theme === 'dark' && <Image onClick={handleClick} className={`${styles['theme-icon']} ${styles['sun-icon']}`} src="/img/sun.svg" width={28} height={28} alt="Sun Icon" />}
      {theme === 'light' && <Image onClick={handleClick} className={`${styles['theme-icon']} ${styles['moon-icon']}`} src="/img/moon.svg" width={25} height={25} alt="Moon Icon" />}
    </button>
  )
}
