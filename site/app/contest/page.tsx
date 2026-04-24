import Image from "next/image";
import Link from "next/link";
import { Container, Card, PageTitle } from "@/components/section";
import { tasks } from "@/lib/data/tasks";

const subjectLabel: Record<string, { label: string; cls: string }> = {
  math: { label: "Математика", cls: "chip-accent" },
  phys: { label: "Физика", cls: "chip-warn" },
  ai: { label: "ИИ / ML", cls: "chip-pink" },
};

export default function ContestPage() {
  return (
    <Container>
      <PageTitle
        eyebrow="Практика дня 1"
        title="Контест: 12 задач с ловушками для LLM"
        description="Участники решали задачи с помощью LLM. В 4 из них были встроены prompt injection — чтобы увидеть, как ИИ начинает «галлюцинировать», если слепо ему доверять."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Link href="/leaderboard" className="btn btn-primary text-sm">
          Лидерборд и анализ
        </Link>
        <a
          href="/contest/tasks_with_traps.md"
          target="_blank"
          className="btn btn-ghost text-sm"
        >
          Полный разбор (markdown)
        </a>
        <a
          href="/contest/easy_tasks.md"
          target="_blank"
          className="btn btn-ghost text-sm"
        >
          Разминочные задачи
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((t) => {
          const s = subjectLabel[t.subject];
          return (
            <Card key={t.code} className="overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`chip ${s.cls}`}>{s.label}</span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {t.code}
                  </span>
                </div>
                {t.hasTrap && (
                  <span className="chip chip-warn">trap</span>
                )}
              </div>
              <h3 className="mt-3 font-semibold">{t.title}</h3>
              {t.hasTrap && t.trapKind && (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  ловушка: {t.trapKind}
                </p>
              )}
              <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)] bg-white">
                <Image
                  src={t.image}
                  alt={`Условие ${t.code}`}
                  width={800}
                  height={500}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-3 flex gap-2 text-xs">
                <a
                  href={t.image}
                  target="_blank"
                  className="text-[var(--accent-2)] hover:underline"
                >
                  открыть картинку
                </a>
                {t.code === "МЛ-3" && (
                  <a
                    href="/contest/ai_3.csv"
                    target="_blank"
                    className="text-[var(--accent-2)] hover:underline"
                  >
                    csv с данными (с инъекцией)
                  </a>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
