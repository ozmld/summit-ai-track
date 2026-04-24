import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.short}`,
  },
  description: site.tagline,
};

const nav = [
  { href: "/", label: "Главная" },
  { href: "/schedule", label: "Расписание" },
  { href: "/teams", label: "Команды" },
  { href: "/project", label: "Проект" },
  { href: "/contest", label: "Контест" },
  { href: "/leaderboard", label: "Лидерборд" },
  { href: "/lectures", label: "Лекции" },
  { href: "/materials", label: "Материалы" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(11,13,23,0.75)] backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)]" />
              <span className="tracking-tight">{site.short}</span>
              <span className="hidden text-[var(--muted)] text-sm sm:inline">
                / трек ИИ
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-1.5 rounded-full text-[var(--muted)] hover:text-white hover:bg-white/5 transition"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <a
              href={site.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary text-sm hidden sm:inline-flex"
            >
              Drive с материалами
            </a>
          </div>
          <div className="md:hidden border-t border-[var(--border)] overflow-x-auto">
            <div className="mx-auto flex w-full max-w-6xl gap-1 px-3 py-2 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-1 whitespace-nowrap rounded-full text-[var(--muted)] hover:text-white hover:bg-white/5 transition"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-24 border-t border-[var(--border)] py-10 text-sm text-[var(--muted)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {site.short} · {site.city} · {site.dates}
            </div>
            <div className="flex gap-4">
              <Link href="/project" className="hover:text-white">
                Проект
              </Link>
              <Link href="/lectures" className="hover:text-white">
                Лекции
              </Link>
              <a
                href={site.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Google Drive
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
