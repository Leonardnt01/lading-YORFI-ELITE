import { ArrowLeft, Send } from 'lucide-react'
import { trackLead } from '../lib/pixel'

const TELEGRAM_URL = 'https://t.me/m/WmHsf5hwZmMx'

type Props = {
  section: string
  buttonId: string
  children?: React.ReactNode
  className?: string
}

export function TelegramLink({ section, buttonId, children = 'Unirme en Telegram', className = '' }: Props) {
  return (
    <a
      className={`telegram-link ${className}`}
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLead(section, buttonId)}
    >
      <Send size={19} strokeWidth={2.2} aria-hidden="true" />
      <span>{children}</span>
      <span className="telegram-press" aria-hidden="true">
        <ArrowLeft size={22} strokeWidth={2.6} />
      </span>
    </a>
  )
}
