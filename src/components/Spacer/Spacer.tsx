import styles from './Spacer.module.css'

export default function Spacer({ desktop, tablet, mobile, dev = false }: { desktop: number; tablet?: number; mobile?: number; dev?: boolean }) {
  const style = {
    '--mobile-height': mobile || mobile === 0 ? `${mobile}px` : undefined,
    '--tablet-height': tablet || tablet === 0 ? `${tablet}px` : undefined,
    '--desktop-height': desktop || desktop === 0 ? `${desktop}px` : undefined,
  } as React.CSSProperties

  return <div className={`${styles.spacer} ${dev ? styles['dev-mode'] : ''}`} style={style}></div>
}
