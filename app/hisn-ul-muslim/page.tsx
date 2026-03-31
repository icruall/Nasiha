import Link from 'next/link'

export default function HisnUlMuslimPage() {
  const sections = [
    {
      title: 'Benefits of Adhkar',
      description: 'The virtues and rewards of remembering Allah.',
      href: '/hisn-ul-muslim/benefits',
    },
    {
      title: 'Morning and evening adhkar',
      description: 'Supplications for the beginning and end of the day.',
      href: '/hisn-ul-muslim/morning-evening',
    },
    {
      title: 'Adhkar before sleeping',
      description: 'Protection and peace before rest.',
      href: '/hisn-ul-muslim/sleeping',
    },
    {
      title: 'Adhkar after salah',
      description: 'Establishing connection after prayer.',
      href: '/hisn-ul-muslim/after-salah',
    },
    {
      title: 'Book of Hisn-ul-Muslim',
      description: 'The complete collection of authentic supplications.',
      href: '/hisn-ul-muslim/book',
    },
  ]

  return (
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-6xl space-y-14">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-50">
              Hisn-ul-Muslim
            </h2>
            <h1 className="text-sm uppercase tracking-wide text-gray-300">
              Fortress of the Muslim
            </h1>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative block h-full overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] glass-card border border-white/5 bg-white/[0.02] p-8"
              >
                {/* Signature Border Light (Adhkar = Orange) */}
                <div className="absolute inset-0 border-2 border-orange-500/20 rounded-[2.5rem] pointer-events-none group-hover:border-orange-400/50 transition-colors duration-500" />
                
                <div className="relative space-y-4">
                  <h3 className="text-xl font-serif text-white group-hover:text-orange-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-orange-100/40 leading-relaxed font-sans group-hover:text-orange-100/60 transition-colors">
                    {section.description}
                  </p>

                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] text-orange-400 font-sans tracking-widest uppercase font-bold">
                      Open Section
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="pt-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-300 transition"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
