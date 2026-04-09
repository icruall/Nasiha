import Link from 'next/link';
import { SignupButton } from '@/components/AuthButtons';

export default function SignupPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl bg-white/[0.02]">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
            <p className="text-gray-400 text-sm">
              Join the Nasiha platform. Sync your Quran reading progress, bookmarks, and daily Adhkar using a Quran Foundation account.
            </p>
          </div>

          <div className="space-y-4 text-center">
            <SignupButton />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
