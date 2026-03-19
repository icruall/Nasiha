import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-6xl space-y-14">
        {/* Tiles that link to key experiences */}
        <section className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-gray-200">
            Dive in and explore
          </h2>

          <div className="space-y-4">
            <Link
              href="/feeling"
              className="
                block rounded-2xl border px-6 py-7
                bg-white/[0.02] border-sky-400/60 bg-sky-500/5
                transition hover:-translate-y-0.5 hover:border-sky-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
              "
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  Emotions
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  Reflections, Qur&apos;an and duʿā&apos;.
                </p>
              </div>
            </Link>

            <Link
              href="/quran"
              className="
                block rounded-2xl border px-6 py-7
                bg-white/[0.02] border-emerald-400/60 bg-emerald-500/5
                transition hover:-translate-y-0.5 hover:border-emerald-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
              "
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  Qur&apos;an
                </h3>
                <p className="text-sm leading-relaxed text-gray-200">
                  For reflection, comfort, and remembrance.
                </p>
              </div>
            </Link>
          </div>
        </section>


      </div>
    </main>
  )
}
