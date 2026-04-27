import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, Panel } from "@/components/section";
import { days, getDay } from "@/lib/data/days";

export function generateStaticParams() {
  return days.map((d) => ({ day: String(d.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const d = getDay(Number(day));
  if (!d) return { title: "День не найден" };
  return { title: d.title };
}

const roman = ["", "I", "II", "III"];

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const n = Number(day);
  const d = getDay(n);
  if (!d) notFound();

  const prev = getDay(n - 1);
  const next = getDay(n + 1);

  return (
    <>
      <PageHeader
        number={roman[d.number]}
        eyebrow={d.date}
        title={d.title}
        lead={d.lead}
      />

      <Container className="pb-10 pt-8">
        <div className="border-t-2 border-[var(--ink)]">
          {d.pairs.map((p, idx) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid gap-8 lg:grid-cols-[220px_1fr] border-b border-[var(--rule)] py-10"
            >
              <header>
                <div className="section-number">
                  № {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mono uppercase tracking-widest text-xs text-[var(--ink-muted)] mt-3">
                  {p.code} · {p.minutes} мин
                </div>
                <h2 className="display text-3xl mt-2 leading-tight">
                  {p.title}
                </h2>
                <div className="mt-3 serif italic text-[var(--ink-muted)]">
                  {p.speakers}
                </div>
              </header>
              <div>
                <p className="serif text-lg leading-snug">{p.summary}</p>

                {p.materials && p.materials.length > 0 && (
                  <div className="mt-6 border-t border-[var(--rule)] pt-5">
                    <div className="eyebrow mb-3">Материалы к этой паре</div>
                    <div className="flex flex-wrap gap-2">
                      {p.materials.map((m) =>
                        m.external ? (
                          <a
                            key={m.label}
                            href={m.href}
                            target="_blank"
                            rel="noreferrer"
                            className={m.primary ? "btn btn-accent" : "btn"}
                          >
                            {m.label} ↗
                          </a>
                        ) : m.href.startsWith("/") &&
                          !m.href.endsWith(".pdf") &&
                          !m.href.endsWith(".ipynb") &&
                          !m.href.endsWith(".csv") &&
                          !m.href.endsWith(".md") ? (
                          <Link
                            key={m.label}
                            href={m.href}
                            className={m.primary ? "btn btn-accent" : "btn"}
                          >
                            {m.label} →
                          </Link>
                        ) : (
                          <a
                            key={m.label}
                            href={m.href}
                            target="_blank"
                            rel="noreferrer"
                            className={m.primary ? "btn btn-accent" : "btn"}
                          >
                            {m.label} ↓
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <div className="border-t-2 border-[var(--ink)] pt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-wrap gap-3">
            {prev && (
              <Link href={`/days/${prev.number}`} className="btn">
                ← {prev.title.split(".")[0]}
              </Link>
            )}
            {next && (
              <Link href={`/days/${next.number}`} className="btn btn-accent">
                {next.title.split(".")[0]} →
              </Link>
            )}
          </div>
          <Panel>
            <div className="eyebrow mb-3">Другие дни</div>
            <ul className="space-y-2 text-sm">
              {days.map((x) => (
                <li key={x.number}>
                  <Link
                    href={`/days/${x.number}`}
                    className={
                      x.number === d.number
                        ? "text-[var(--accent)]"
                        : "link-underline"
                    }
                  >
                    День {x.number}. {x.title.split(". ")[1] ?? x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
