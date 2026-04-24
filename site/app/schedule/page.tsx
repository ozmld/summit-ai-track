import { Container, PageHeader } from "@/components/section";
import { schedule } from "@/lib/data/schedule";

const kindLabel: Record<string, string> = {
  lecture: "Лекция",
  practice: "Практика",
  contest: "Контест",
  defense: "Защита",
  break: "Перерыв",
  ceremony: "Церемония",
  other: "Другое",
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        number="I"
        eyebrow="Три дня · Астана"
        title="Программа саммита"
        lead="Черновик расписания. Некоторые блоки могут сдвигаться — финальная версия уточняется у кураторов трека."
      />
      <Container className="py-12">
        <div className="space-y-16">
          {schedule.map((day, idx) => (
            <article
              key={day.date}
              className="grid gap-8 lg:grid-cols-[180px_1fr]"
            >
              <header>
                <div className="section-number">№ 0{idx + 1}</div>
                <div className="serif text-4xl mt-2">
                  {day.label.split("—")[0].trim()}
                </div>
                <div className="eyebrow mt-2">{day.date}</div>
                <div className="mt-3 serif italic text-[var(--ink-muted)]">
                  {day.label.split("—")[1]?.trim()}
                </div>
              </header>
              <div className="border-t-2 border-[var(--ink)]">
                {day.items.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[90px_120px_1fr] gap-4 items-start border-b border-[var(--rule-soft)] py-4"
                  >
                    <div className="mono text-xs text-[var(--ink-muted)] pt-1">
                      {item.time}
                    </div>
                    <div>
                      <span
                        className={`tag ${
                          item.kind === "contest" || item.kind === "defense"
                            ? "tag-accent"
                            : item.kind === "break"
                              ? "tag"
                              : ""
                        }`}
                      >
                        {kindLabel[item.kind]}
                      </span>
                    </div>
                    <div>
                      <div className="serif text-lg leading-snug">
                        {item.title}
                      </div>
                      {item.speaker && (
                        <div className="text-sm text-[var(--ink-muted)] mt-1">
                          {item.speaker}
                        </div>
                      )}
                      {item.note && (
                        <div className="text-xs text-[var(--ink-muted)] italic mt-1">
                          {item.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
