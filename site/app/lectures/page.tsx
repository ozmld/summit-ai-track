import { Container, Card, PageTitle } from "@/components/section";
import { lectures } from "@/lib/data/lectures";

export default function LecturesPage() {
  return (
    <Container>
      <PageTitle
        eyebrow="Материалы"
        title="Лекции саммита"
        description="Слайды доступны в формате PDF. Часть лекций — в процессе подготовки."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {lectures.map((l) => (
          <Card key={l.slug}>
            <div className="flex items-center gap-2">
              <span className="chip chip-accent">День {l.day}</span>
              {l.status === "ready" ? (
                <span className="chip">PDF готов</span>
              ) : (
                <span className="chip chip-warn">скоро</span>
              )}
            </div>
            <h2 className="mt-3 text-xl font-semibold">{l.title}</h2>
            <div className="mt-1 text-sm text-[var(--muted)]">{l.speaker}</div>
            <p className="mt-3 text-sm text-[var(--muted)]">{l.summary}</p>
            {l.pdf && (
              <div className="mt-4 flex gap-2">
                <a
                  href={l.pdf}
                  target="_blank"
                  className="btn btn-primary text-sm"
                >
                  Открыть PDF
                </a>
                <a
                  href={l.pdf}
                  download
                  className="btn btn-ghost text-sm"
                >
                  Скачать
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Container>
  );
}
