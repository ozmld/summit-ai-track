import { Container, PageHeader } from "@/components/section";
import { teams } from "@/lib/data/teams";

export default function TeamsPage() {
  const total = teams.reduce((s, t) => s + t.members.length, 0);
  return (
    <>
      <PageHeader
        number="II"
        eyebrow={`${teams.length} команд · ${total} участников`}
        title="Команды"
        lead="Составы команд для командного проекта. Если в ФИО ошибка — напишите куратору трека."
      />
      <Container className="py-12">
        <div className="grid gap-0 md:grid-cols-2">
          {teams.map((t, i) => (
            <article
              key={t.slug}
              id={t.slug}
              className="border border-[var(--rule)] -ml-px -mt-px p-6 sm:p-8 scroll-mt-24"
            >
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="num text-3xl text-[var(--accent)]">
                    № {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-3xl">{t.name}</h2>
                </div>
                <span className="mono text-xs text-[var(--ink-muted)]">
                  {t.members.length} чел.
                </span>
              </div>
              <hr className="hairline my-4" />
              <ol className="space-y-2 text-sm">
                {t.members.map((m, j) => (
                  <li key={m} className="grid grid-cols-[24px_1fr] gap-2">
                    <span className="num text-[var(--ink-muted)] text-right">
                      {j + 1}
                    </span>
                    <span className="serif text-base">{m}</span>
                  </li>
                ))}
              </ol>
              {t.driveFolder && (
                <div className="mt-5 pt-4 border-t border-[var(--rule-soft)]">
                  <a
                    href={t.driveFolder}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-accent"
                  >
                    Открыть папку команды на Drive ↗
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
