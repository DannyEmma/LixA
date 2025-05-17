import styles from "./Footer.module.css"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/mentions-legales">Mentions légales</Link>
      <div className={styles.copyright}>
        <p>&copy; 2025 Danny EMMA. Tous droits réservés. Crée avec passion</p>
        <Image src="/img/heart.svg" width={16} height={16} alt="Heart Icon" />
      </div>
    </footer>
  )
}
