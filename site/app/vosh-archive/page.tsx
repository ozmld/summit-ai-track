import { Container, PageHeader, Panel } from "@/components/section";
import { voshTasks, voshOfficial } from "@/lib/data/vosh";

export const metadata = {
  title: "Архив ВсОШ по ИИ",
};

export default function VoshArchivePage() {
  const featured = voshTasks.filter((t) => t.featured);
  const rest = voshTasks.filter((t) => !t.featured);

  return (
    <>
      <PageHeader
        number="VII"
        eyebrow="Материалы"
        title="Архив задач ВсОШ по ИИ"
        lead="Задачи для разбора на Д2П3 и как референс для команд при написании собственного условия. Полный архив подгружается в течение саммита."
      />

      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section>
            <div className="eyebrow mb-3">§ 1 · Задачи для живого разбора</div>
            <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5">
              Три задачи разных типов — именно их Максим Бидва разбирает во
              второй половине Д2П3. Каждая 10–11 минут: условие → идея →
              решение → ответ.
            </p>
            <div className="grid gap-0">
              {featured.map((t, i) => (
                <div
                  key={t.slug}
                  className="border border-[var(--rule)] -mt-px p-5"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="num text-3xl text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mono text-[11px] uppercase tracking-widest text-[var(--ink-muted)]">
                      {t.stage}
                    </span>
                  </div>
                  <h2 className="mt-3 serif text-2xl leading-tight">
                    {t.title}
                  </h2>
                  <div className="mt-1 eyebrow">{t.topic}</div>
                  {t.note && (
                    <p className="mt-3 text-sm italic text-[var(--ink-muted)]">
                      {t.note}
                    </p>
                  )}
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-accent mt-4"
                    >
                      Открыть задачу ↗
                    </a>
                  )}
                </div>
              ))}
            </div>

            {rest.length > 0 && (
              <div className="mt-16">
                <div className="eyebrow mb-3">§ 2 · Полный архив</div>
                <ul className="border-t border-[var(--ink)]">
                  {rest.map((t) => (
                    <li
                      key={t.slug}
                      className="grid grid-cols-[120px_1fr_120px] gap-3 border-b border-[var(--rule-soft)] py-3 text-sm"
                    >
                      <span className="mono text-[11px] uppercase tracking-widest text-[var(--ink-muted)]">
                        {t.topic}
                      </span>
                      <span className="serif">{t.title}</span>
                      <span className="text-right">
                        {t.link ? (
                          <a
                            href={t.link}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline"
                          >
                            открыть ↗
                          </a>
                        ) : (
                          <span className="text-[var(--ink-muted)] italic">
                            скоро
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <Panel>
              <div className="eyebrow mb-3">Официальный архив</div>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                Ссылка будет обновлена после согласования с методистами
                саммита.
              </p>
              {voshOfficial.href !== "#" ? (
                <a
                  href={voshOfficial.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-accent"
                >
                  {voshOfficial.label} ↗
                </a>
              ) : (
                <span className="tag">скоро</span>
              )}
            </Panel>

            <Panel>
              <div className="eyebrow mb-3">Зачем это команде</div>
              <p className="text-sm leading-relaxed">
                Перед тем как писать собственное условие в Д2П4, откройте
                задачи для разбора и прочтите их внимательно. Ваша задача
                должна выглядеть примерно в том же формате.
              </p>
            </Panel>
          </aside>
        </div>
      </Container>
    </>
  );
}
