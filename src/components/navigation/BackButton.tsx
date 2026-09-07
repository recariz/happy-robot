import { ArrowLeft } from 'lucide-react'
import styles from './BackButton.module.css'

interface BackButtonProps {
  onClick: () => void
  label?: string
}

export function BackButton({ onClick, label = 'Back' }: BackButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <ArrowLeft size={14} aria-hidden />
      {label}
    </button>
  )
}
