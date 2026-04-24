import { Container, Card, PageTitle } from "@/components/section";
import { teams } from "@/lib/data/teams";

export default function TeamsPage() {
  const total = teams.reduce((s, t) => s + t.members.length, 0);
  return (
    <Container>
      <PageTitle
        eyebrow={`${teams.length} команд · ${total} участников`}
        title="Команды саммита"
        description="Составы команд для командного проекта. Если есть правки в ФИО — напишите куратору."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {teams.map((t) => (
          <Card key={t.slug} id={t.slug} className="scroll-mt-24">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <span className="text-xs text-[var(--muted)]">
                {t.members.length} чел.
              </span>
            </div>
            <ol className="mt-4 space-y-1.5 text-sm">
              {t.members.map((m, i) => (
                <li key={m} className="flex gap-3">
                  <span className="w-5 shrink-0 text-right text-[var(--muted)] font-mono">
                    {i + 1}.
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
    </Container>
  );
}
