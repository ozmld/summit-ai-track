import { Container, PageHeader } from "@/components/section";
import { lectures } from "@/lib/data/lectures";

export default function LecturesPage() {
  const byDay = [1, 2, 3].map((d) => ({
    day: d,
    items: lectures.filter((l) => l.day === d),
  }));

  return (
    <>
      <PageHeader
        number="VI"
        eyebrow="Материалы"
        title="Лекции и ноутбуки"
        lead="Сгруппировано по дням саммита. Слайды — в PDF, практические ноутбуки — в Colab."
      />
      <Container className="py-12 space-y-14">
        {byDay.map(({ day, items }) => (
          <section key={day}>
            <div className="flex items-baseline justify-between border-b-2 border-[var(--ink)] pb-3 mb-6">
              <h2 className="display text-4xl">
                День <span className="text-[var(--accent)]">{day}</span>
              </h2>
              <a href={`/days/${day}`} className="link-underline text-sm">
                План дня →
              </a>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              {items.map((l, i) => (
                <article
                  key={l.slug}
                  className="border border-[var(--rule)] -ml-px -mt-px p-6 sm:p-8"
                >
                  <div className="flex items-baseline justify-between border-b border-[var(--ink)] pb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="num text-3xl text-[var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="eyebrow">
                        {l.code ?? `День ${l.day}`}
                        {l.minutes ? ` · ${l.minutes} мин` : ""}
                      </span>
                    </div>
                    <span
                      className={`tag ${
                        l.status === "ready" ? "tag-filled" : "tag-accent"
                      }`}
                    >
                      {l.status === "ready" ? "готово" : "скоро"}
                    </span>
                  </div>
                  <h3 className="mt-5 display text-2xl leading-tight">
                    {l.title}
                  </h3>
                  <div className="mt-2 serif italic text-[var(--ink-muted)]">
                    {l.speaker}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">{l.summary}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {l.pdf && (
                      <a
                        href={l.pdf}
                        target="_blank"
                        className="btn btn-accent"
                      >
                        Открыть PDF ↗
                      </a>
                    )}
                    {l.notebooks?.map((n) => (
                      <a
                        key={n.href}
                        href={n.href}
                        target="_blank"
                        className="btn"
                      >
                        {n.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
