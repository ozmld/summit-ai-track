import { Container, PageHeader } from "@/components/section";
import { lectures } from "@/lib/data/lectures";

export default function LecturesPage() {
  return (
    <>
      <PageHeader
        number="VI"
        eyebrow="Материалы"
        title="Лекции саммита"
        lead="Слайды в формате PDF. Часть лекций ещё в подготовке."
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
                  <span className="eyebrow">День {l.day}</span>
                </div>
                <span
                  className={`tag ${l.status === "ready" ? "tag-filled" : "tag-accent"}`}
                >
                  {l.status === "ready" ? "PDF готов" : "скоро"}
                </span>
              </div>
              <h2 className="mt-5 display text-3xl leading-tight">
                {l.title}
              </h2>
              <div className="mt-2 serif italic text-[var(--ink-muted)]">
                {l.speaker}
              </div>
              <p className="mt-4 text-sm leading-relaxed">{l.summary}</p>
              {l.pdf && (
                <div className="mt-6 flex gap-2">
                  <a
                    href={l.pdf}
                    target="_blank"
                    className="btn btn-accent"
                  >
                    Открыть PDF ↗
                  </a>
                  <a href={l.pdf} download className="btn">
                    Скачать
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
