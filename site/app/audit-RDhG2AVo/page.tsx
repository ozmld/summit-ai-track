import { Container, PageHeader } from "@/components/section";
import { teams } from "@/lib/data/teams";
import { artifacts, kindLabel } from "@/lib/data/artifacts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аудит команд (internal)",
  robots: { index: false, follow: false, nocache: true },
};

function formatSize(size: number): string {
  if (!size) return "—";
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} КБ`;
  return `${(size / 1024 / 1024).toFixed(1)} МБ`;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.toLocaleDateString("ru-RU")} ${d.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export default function AuditPage() {
  const rows = teams.map((t) => {
    const a = artifacts.find((x) => x.slug === t.slug);
    return { team: t, files: a?.files ?? [] };
  });
  const totalFiles = rows.reduce((s, r) => s + r.files.length, 0);
  const emptyTeams = rows.filter((r) => r.files.length === 0).length;

  return (
    <>
      <PageHeader
        number="A"
        eyebrow="INTERNAL · do not share"
        title="Аудит команд"
        lead="Страница только для Ивана: видны реальные команды, участники и все файлы, которые сайт подтягивает из Drive в peer-review."
      />
      <Container className="py-10 space-y-6">
        <div className="border border-[var(--rule)] p-4 bg-[var(--paper-2)]/40 flex flex-wrap gap-8 text-sm mono">
          <div>
            <div className="eyebrow">Команд</div>
            <div className="display text-2xl">{teams.length}</div>
          </div>
          <div>
            <div className="eyebrow">Всего файлов</div>
            <div className="display text-2xl">{totalFiles}</div>
          </div>
          <div>
            <div className="eyebrow">Пустых команд</div>
            <div className="display text-2xl">{emptyTeams}</div>
          </div>
        </div>

        {rows.map(({ team, files }) => (
          <section
            key={team.slug}
            className="border border-[var(--rule)]"
          >
            <header className="border-b border-[var(--rule)] p-4 bg-[var(--paper-2)]/40 flex flex-wrap gap-x-6 gap-y-2 items-baseline">
              <div className="display text-xl">{team.name}</div>
              <div className="mono text-xs text-[var(--ink-muted)]">
                slug: <b>{team.slug}</b>
              </div>
              <div className="mono text-xs">
                файлов: <b>{files.length}</b>
              </div>
              <a
                href={team.driveFolder}
                target="_blank"
                rel="noreferrer"
                className="text-xs link-underline ml-auto"
              >
                открыть папку Drive →
              </a>
            </header>

            <div className="grid gap-4 p-4 lg:grid-cols-[1fr_2fr]">
              <div>
                <div className="eyebrow mb-2">Участники</div>
                <ol className="text-sm serif space-y-1 list-decimal list-inside">
                  {team.members.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ol>
              </div>

              <div>
                <div className="eyebrow mb-2">Файлы, которые сайт показывает на peer-review</div>
                {files.length === 0 ? (
                  <p className="text-sm italic text-[var(--ink-muted)]">
                    файлов нет — команда будет показываться в пуле оценки с
                    пустой карточкой. Подумай, не убрать ли её.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead className="text-left">
                        <tr className="border-b border-[var(--rule)]">
                          <th className="py-2 pr-3">Файл</th>
                          <th className="py-2 pr-3">Тип</th>
                          <th className="py-2 pr-3 mono">Размер</th>
                          <th className="py-2 pr-3 mono">Изменён</th>
                          <th className="py-2">Кто</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map((f) => (
                          <tr
                            key={f.id}
                            className="border-b border-[var(--rule-soft)] align-top"
                          >
                            <td className="py-2 pr-3">
                              <a
                                href={f.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="link-underline break-all"
                              >
                                {f.name}
                              </a>
                            </td>
                            <td className="py-2 pr-3">{kindLabel[f.kind]}</td>
                            <td className="py-2 pr-3 mono whitespace-nowrap">
                              {formatSize(f.size)}
                            </td>
                            <td className="py-2 pr-3 mono whitespace-nowrap text-[var(--ink-muted)]">
                              {formatDate(f.modifiedTime)}
                            </td>
                            <td className="py-2 text-[var(--ink-muted)]">
                              {f.modifier || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        <div className="text-xs text-[var(--ink-muted)] italic">
          Эта страница не проиндексирована и не в навигации. Ссылка — только у
          тебя. Если что-то показалось мусором (наш ноутбук, скриншот из игры
          Гендальфа, фотка доски без контекста) — напиши, вычищу из{" "}
          <span className="mono">team-artifacts.json</span>.
        </div>
      </Container>
    </>
  );
}
