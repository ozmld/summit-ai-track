import { Container, PageHeader } from "@/components/section";
import { lectures } from "@/lib/data/lectures";

export default function LecturesPage() {
  return (
    <>
      <PageHeader
        number="VI"
        eyebrow="Материалы"
        title="Лекции саммита"
        lead="Слайды, конспекты и ноутбуки по каждой паре. Часть материалов появится в процессе саммита."
      />
      <Container className="py-12">
        <div className="grid gap-0 md:grid-cols-2">
          {lectures.map((l, i) => (
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
                  </span>
                </div>
                <span
                  className={`tag ${l.status === "ready" ? "tag-filled" : "tag-accent"}`}
                >
                  {l.status === "ready" ? "готово" : "скоро"}
                </span>
              </div>
              <h2 className="mt-5 display text-3xl leading-tight">
                {l.title}
              </h2>
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
      </Container>
    </>
  );
}
