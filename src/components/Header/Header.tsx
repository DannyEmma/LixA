import styles from "./Header.module.css"

import Image from "next/image"
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src="/img/logo.svg" width={114} height={40} alt="Logo" />
      <ThemeSwitcher />
    </header>
  )
}
