import Link from "next/link";

export default function Home() {
  return (
    <main className="dark:bg-slate-900 flex min-h-screen p-24">
      <div className="z-10 dark:text-white w-full max-w-5xl font-mono text-sm">
        <h1 className="text-2xl mb-10">AI Shop</h1>
        <Link className="hover:underline" href="/poster">
          Create a poster
        </Link>
      </div>
    </main>
  );
}
