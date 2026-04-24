import { Container, PageHeader, Panel } from "@/components/section";
import { results, taskColumns } from "@/lib/data/results";

function cellClass(value?: string) {
  if (!value) return "text-[var(--rule)]";
  if (value === "+") return "text-[var(--secondary)] font-semibold";
  if (value.startsWith("+")) return "text-[var(--ink)]";
  if (value.startsWith("-")) return "text-[var(--accent)]";
  return "";
}

export default function LeaderboardPage() {
  const solved: Record<string, number> = {};
  for (const col of taskColumns) solved[col] = 0;
  for (const r of results) {
    for (const col of taskColumns) {
      const v = r.tasks[col];
      if (v && v.startsWith("+")) solved[col] += 1;
    }
  }

  const easiest = [...taskColumns]
    .sort((a, b) => solved[b] - solved[a])
    .slice(0, 3);
  const hardest = [...taskColumns]
    .sort((a, b) => solved[a] - solved[b])
    .slice(0, 4);

  return (
    <>
      <PageHeader
        number="V"
        eyebrow="Контест дня 1"
        title="Лидерборд и анализ"
        lead="Сортировка по числу решённых задач, затем по штрафу (меньше — лучше)."
      />

      <Container className="py-10">
        <div className="grid gap-0 sm:grid-cols-3 mb-10">
          <Panel>
            <div className="eyebrow">Участников</div>
            <div className="num text-6xl mt-2">{results.length}</div>
          </Panel>
          <Panel>
            <div className="eyebrow mb-3">Самые решаемые</div>
            <ul className="space-y-1">
              {easiest.map((c) => (
                <li key={c} className="flex justify-between items-baseline">
                  <span className="mono text-sm">{c}</span>
                  <span className="num">{solved[c]}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <div className="eyebrow mb-3">Killer-задачи</div>
            <ul className="space-y-1">
              {hardest.map((c) => (
                <li key={c} className="flex justify-between items-baseline">
                  <span className="mono text-sm">{c}</span>
                  <span className="num text-[var(--accent)]">{solved[c]}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="overflow-x-auto">
          <table className="editorial">
            <thead>
              <tr>
                <th>#</th>
                <th>Участник</th>
                {taskColumns.map((c) => (
                  <th key={c} className="mono text-center">
                    {c}
                  </th>
                ))}
                <th className="text-right">Score</th>
                <th className="text-right">Penalty</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.user}>
                  <td className="num text-[var(--ink-muted)]">{r.place}</td>
                  <td className="whitespace-nowrap">{r.user}</td>
                  {taskColumns.map((c) => (
                    <td
                      key={c}
                      className={`text-center mono text-xs ${cellClass(r.tasks[c])}`}
                    >
                      {r.tasks[c] ?? "·"}
                    </td>
                  ))}
                  <td className="text-right num font-semibold">
                    {r.score}
                  </td>
                  <td className="text-right num text-[var(--ink-muted)]">
                    {r.penalty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 border-t border-[var(--ink)] pt-5 text-sm text-[var(--ink-muted)]">
          <div className="eyebrow mb-3">Легенда</div>
          <ul className="grid gap-2 sm:grid-cols-4">
            <li>
              <span className="mono text-[var(--secondary)] font-semibold">
                +
              </span>{" "}
              — решено с первой попытки
            </li>
            <li>
              <span className="mono">+N</span> — решено после N неверных
            </li>
            <li>
              <span className="mono text-[var(--accent)]">−N</span> — не
              сдано, N попыток
            </li>
            <li>
              <span className="mono">·</span> — не пыталась сдавать
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
}
