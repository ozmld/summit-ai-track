import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader } from "@/components/section";
import { tasks } from "@/lib/data/tasks";

const subjectLabel: Record<string, string> = {
  math: "Математика",
  phys: "Физика",
  ai: "ИИ / ML",
};

export default function ContestPage() {
  return (
    <>
      <PageHeader
        number="IV"
        eyebrow="Практика дня 1"
        title="Контест на 12 задач"
        lead="Участники решали задачи с помощью LLM. В четырёх задачах спрятаны ловушки (prompt injection) — чтобы увидеть, как ИИ начинает галлюцинировать, если слепо ему доверять."
      />

      <Container className="py-10">
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--rule)] pb-8 mb-10">
          <Link href="/leaderboard" className="btn btn-accent">
            Лидерборд и анализ →
          </Link>
          <a
            href="/contest/tasks_with_traps.md"
            target="_blank"
            className="btn"
          >
            Полный разбор (markdown)
          </a>
          <a
            href="/contest/easy_tasks.md"
            target="_blank"
            className="btn"
          >
            Разминочные задачи
          </a>
        </div>

        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t, i) => (
            <article
              key={t.code}
              className="border border-[var(--rule)] -ml-px -mt-px p-5"
            >
              <div className="flex items-baseline justify-between border-b border-[var(--ink)] pb-2">
                <div className="flex items-baseline gap-3">
                  <span className="num text-2xl text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="eyebrow">{subjectLabel[t.subject]}</div>
                    <div className="mono text-xs mt-0.5">{t.code}</div>
                  </div>
                </div>
                {t.hasTrap && (
                  <span className="tag tag-filled">ЛОВУШКА</span>
                )}
              </div>
              <h3 className="mt-4 serif text-lg leading-tight">{t.title}</h3>
              {t.hasTrap && t.trapKind && (
                <p className="mt-1 text-xs italic text-[var(--ink-muted)]">
                  ловушка: {t.trapKind}
                </p>
              )}
              <div className="mt-4 border border-[var(--rule)] bg-white overflow-hidden">
                <Image
                  src={t.image}
                  alt={`Условие ${t.code}`}
                  width={800}
                  height={500}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-3 flex gap-4 text-xs">
                <a
                  href={t.image}
                  target="_blank"
                  className="link-underline"
                >
                  открыть картинку
                </a>
                {t.code === "МЛ-3" && (
                  <a
                    href="/contest/ai_3.csv"
                    target="_blank"
                    className="link-underline"
                  >
                    csv с инъекцией
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
