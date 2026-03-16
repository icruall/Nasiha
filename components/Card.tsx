import { ReactNode } from 'react'

type CardProps = {
  title?: string
  children: ReactNode
}

export default function Card({ title, children }: CardProps) {
  return (
    <section className="border border-white/15 rounded-lg px-6 py-5">
      {title && (
        <h2 className="text-xs font-semibold tracking-wide opacity-80 mb-5">
          {title}
        </h2>
      )}

      {children}
    </section>
  )
}
