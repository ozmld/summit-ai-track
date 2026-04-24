import { Container, Card, PageTitle } from "@/components/section";
import { results, taskColumns } from "@/lib/data/results";

function cellClass(value?: string) {
  if (!value) return "text-white/20";
  if (value === "+") return "text-[var(--accent-2)] font-semibold";
  if (value.startsWith("+")) return "text-white";
  if (value.startsWith("-")) return "text-[var(--accent-3)]";
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

  const top = [...taskColumns]
    .sort((a, b) => solved[b] - solved[a])
    .slice(0, 3);
  const hard = [...taskColumns]
    .filter((c) => solved[c] >= 0)
    .sort((a, b) => solved[a] - solved[b])
    .slice(0, 4);

  return (
    <Container>
      <PageTitle
        eyebrow="Контест дня 1"
        title="Лидерборд и анализ"
        description="Сортировка — по числу решённых задач, затем по штрафу (меньше — лучше)."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Участников
          </div>
          <div className="mt-2 text-3xl font-semibold">{results.length}</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Самые решаемые
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {top.map((c) => (
              <span key={c} className="chip chip-accent">
                {c} · {solved[c]}
              </span>
            ))}
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Killer-задачи
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {hard.map((c) => (
              <span key={c} className="chip chip-pink">
                {c} · {solved[c]}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Участник</th>
              {taskColumns.map((c) => (
                <th
                  key={c}
                  className="px-2 py-3 font-mono text-xs text-center"
                >
                  {c}
                </th>
              ))}
              <th className="px-4 py-3 font-medium text-right">Score</th>
              <th className="px-4 py-3 font-medium text-right">Penalty</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr
                key={r.user}
                className="border-b border-[var(--border)] last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3 font-mono text-[var(--muted)]">
                  {r.place}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{r.user}</td>
                {taskColumns.map((c) => (
                  <td
                    key={c}
                    className={`px-2 py-3 text-center font-mono text-xs ${cellClass(r.tasks[c])}`}
                  >
                    {r.tasks[c] ?? "·"}
                  </td>
                ))}
                <td className="px-4 py-3 text-right font-semibold">
                  {r.score}
                </td>
                <td className="px-4 py-3 text-right text-[var(--muted)]">
                  {r.penalty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mt-8">
        <h2 className="text-xl font-semibold">Как читать таблицу</h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
          <li>
            <span className="text-[var(--accent-2)] font-mono">+</span> — задача
            решена с первой попытки.
          </li>
          <li>
            <span className="text-white font-mono">+N</span> — решена, но
            потрачено N неудачных попыток до этого.
          </li>
          <li>
            <span className="text-[var(--accent-3)] font-mono">-N</span> —
            задача не сдана, потрачено N неверных попыток.
          </li>
          <li>
            <span className="text-white/30 font-mono">·</span> — задача не
            попыталась сдаваться.
          </li>
        </ul>
      </Card>
    </Container>
  );
}
