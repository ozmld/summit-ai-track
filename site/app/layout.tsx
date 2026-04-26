import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  style: ["normal", "italic"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
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
  { href: "/days/2", label: "Сегодня · Д2" },
  { href: "/teams", label: "Команды" },
  { href: "/project", label: "Проект" },
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
      className={`${inter.variable} ${lora.variable} ${jbmono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="w-full bg-[var(--ink)] text-[var(--paper)] text-xs">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2">
            <span className="mono tracking-wider uppercase">
              № II · {site.city} · {site.dates}
            </span>
            <span className="hidden sm:inline mono tracking-wider uppercase">
              Ежедневный выпуск
            </span>
          </div>
        </div>

        <header className="border-b-2 border-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-6 sm:py-10">
            <div className="flex items-baseline justify-between gap-6">
              <Link href="/" className="block">
                <div className="eyebrow mb-1">Трек ИИ</div>
                <div className="display text-3xl sm:text-5xl">
                  Саммит{" "}
                  <span className="display-italic text-[var(--accent)]">
                    талантов
                  </span>
                </div>
              </Link>
              <a
                href={site.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent hidden md:inline-flex"
              >
                Drive саммита ↗
              </a>
            </div>
          </div>
          <div className="border-t border-[var(--rule)]">
            <nav className="mx-auto max-w-6xl overflow-x-auto">
              <ul className="flex items-center gap-0 px-2 text-sm">
                {nav.map((n, i) => (
                  <li key={n.href} className="flex items-center">
                    <Link
                      href={n.href}
                      className="block px-3 py-3 whitespace-nowrap uppercase tracking-widest text-[11px] font-medium hover:text-[var(--accent)]"
                    >
                      {n.label}
                    </Link>
                    {i < nav.length - 1 && (
                      <span className="text-[var(--rule)]">·</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t-2 border-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="eyebrow mb-3">Колофон</div>
              <p className="serif italic text-base">
                II Саммит талантов для учителей. Астана, {site.dates}.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">Навигация</div>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/project" className="link-underline">
                    Командный проект
                  </Link>
                </li>
                <li>
                  <Link href="/lectures" className="link-underline">
                    Лекции саммита
                  </Link>
                </li>
                <li>
                  <Link href="/teams" className="link-underline">
                    Команды и Drive
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3">Ресурсы</div>
              <ul className="space-y-1 text-sm">
                <li>
                  <a
                    href={site.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    Google Drive саммита ↗
                  </a>
                </li>
                <li>
                  <a
                    href={`https://github.com/${site.github}/summit-ai-track`}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    Репозиторий сайта ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--rule)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-xs text-[var(--ink-muted)]">
              <span className="mono uppercase tracking-widest">
                ozmld / 2026
              </span>
              <span className="mono uppercase tracking-widest">
                Set in Lora &amp; Inter
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
