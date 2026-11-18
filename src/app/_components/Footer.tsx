import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm md:px-8 dark:text-zinc-400">
        <span className="font-medium text-zinc-900 dark:text-zinc-200">Velrocity</span>
        <nav aria-label="Footer navigation" className="flex gap-4">
          <Link href="/login" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
            Sign in
          </Link>
          <Link href="/register" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
            Create account
          </Link>
        </nav>
      </div>
    </footer>
  );
}
