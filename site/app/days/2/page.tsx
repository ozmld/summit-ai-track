import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { day2Pairs } from "@/lib/data/day2";

export const metadata = {
  title: "День 2 · Инструменты и методика",
};

export default function Day2Page() {
  const total = day2Pairs.reduce((s, p) => s + p.minutes, 0);

  return (
    <>
      <PageHeader
        number="II"
        eyebrow="25 апреля 2026 · Астана"
        title="День 2. Инструменты и методика"
        lead="Четыре пары подряд: применение ИИ и олимпиады, инженерия ML, математика и разбор задач ВсОШ, командная работа над модулем."
      />

      <Container className="py-10">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-b border-[var(--rule)] pb-10">
          <div>
            <div className="num text-5xl">{day2Pairs.length}</div>
            <div className="eyebrow mt-2">Пар</div>
          </div>
          <div>
            <div className="num text-5xl">{total}</div>
            <div className="eyebrow mt-2">Минут теории и практики</div>
          </div>
          <div>
            <div className="num text-5xl">5</div>
            <div className="eyebrow mt-2">Менторов в зале</div>
          </div>
          <div>
            <div className="num text-5xl">8</div>
            <div className="eyebrow mt-2">Команд пишут модули</div>
          </div>
        </div>
      </Container>

      <Container className="pb-10">
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

                <div className="mt-8">
                  <div className="eyebrow mb-3">Хронометраж</div>
                  <ol className="border-t border-[var(--ink)]">
                    {p.blocks.map((b, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[110px_1fr] gap-4 items-start border-b border-[var(--rule-soft)] py-3"
                      >
                        <span className="mono text-xs text-[var(--ink-muted)] pt-1">
                          {b.time}
                        </span>
                        <span className="text-sm leading-relaxed">{b.text}</span>
                      </li>
                    ))}
                  </ol>
                </div>

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

                {p.prep && p.prep.length > 0 && (
                  <div className="mt-8">
                    <div className="eyebrow mb-3">Что готовим заранее</div>
                    <ul className="space-y-2 text-sm">
                      {p.prep.map((x, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[24px_1fr] gap-2 border-b border-[var(--rule-soft)] pb-2"
                        >
                          <span className="num text-base text-[var(--accent)]">
                            {i + 1}.
                          </span>
                          <span className="leading-relaxed">{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <div className="border-t-2 border-[var(--ink)] pt-8 grid gap-8 lg:grid-cols-3">
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
                <Link href="/schedule" className="link-underline">
                  Общее расписание саммита →
                </Link>
              </li>
            </ul>
          </Panel>
          <Panel>
            <div className="eyebrow mb-3">Менторы в зале Д2П4</div>
            <ul className="space-y-1 text-sm">
              <li>Максим Бидва</li>
              <li>Артур Игнатьев</li>
              <li>Матвей Исупов</li>
              <li>Алексей Власов</li>
              <li>Иван Эйдлин</li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
