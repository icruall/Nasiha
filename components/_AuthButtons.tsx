import { signIn, signOut } from "@/auth";

export function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("quran-foundation", { redirectTo: "/" });
      }}
      className="w-full"
    >
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold py-3 px-4 rounded-2xl hover:bg-emerald-500/20 transition-colors"
      >
        <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
          <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
        </svg>
        Login
      </button>
    </form>
  );
}

export function SignupButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("quran-foundation", { redirectTo: "/" });
      }}
      className="w-full"
    >
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold py-3 px-4 rounded-2xl hover:bg-emerald-500/20 transition-colors"
      >
        <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
          <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
        </svg>
        Sign Up
      </button>
    </form>
  );
}

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
