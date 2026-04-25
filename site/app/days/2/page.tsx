import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { day2Pairs } from "@/lib/data/day2";

export const metadata = {
  title: "День 2 · Инструменты и методика",
};

export default function Day2Page() {
  return (
    <>
      <PageHeader
        number="II"
        eyebrow="25 апреля 2026 · Астана"
        title="День 2. Инструменты и методика"
        lead="Четыре пары подряд: применение ИИ и олимпиады, инженерия ML, математика и разбор задач ВсОШ, командная работа над модулем."
      />

      <Container className="pb-10 pt-8">
        <div className="border-t-2 border-[var(--ink)]">
          {day2Pairs.map((p, idx) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid gap-8 lg:grid-cols-[220px_1fr] border-b border-[var(--rule)] py-10"
            >
              <header>
                <div className="section-number">№ 0{idx + 1}</div>
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

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {p.teamTask && (
                    <Panel>
                      <div className="eyebrow mb-3">Что делают команды</div>
                      <p className="text-sm leading-relaxed">{p.teamTask}</p>
                    </Panel>
                  )}
                  {p.deliverable && (
                    <Panel>
                      <div className="eyebrow mb-3">Что сдают к концу пары</div>
                      <p className="text-sm leading-relaxed">{p.deliverable}</p>
                    </Panel>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <div className="border-t-2 border-[var(--ink)] pt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="eyebrow mb-3">Итог дня</div>
            <p className="serif text-xl leading-snug">
              У всех 8 команд в Google Doc заполнены{" "}
              <span className="text-[var(--accent)]">Разделы 0–2</span>:
              название, условие задачи, решение и ответ.
            </p>
          </div>
          <Panel>
            <div className="eyebrow mb-3">Полезное на день</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/project" className="link-underline">
                  ТЗ командного проекта →
                </Link>
              </li>
              <li>
                <Link href="/lectures" className="link-underline">
                  Материалы лекций →
                </Link>
              </li>
              <li>
                <Link href="/teams" className="link-underline">
                  Команды и папки на Drive →
                </Link>
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
