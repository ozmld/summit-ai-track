import { Container, Card, PageTitle } from "@/components/section";
import { schedule } from "@/lib/data/schedule";

const kindStyles: Record<string, string> = {
  lecture: "chip-accent",
  practice: "chip-pink",
  contest: "chip-warn",
  defense: "chip-pink",
  break: "",
  ceremony: "chip-accent",
  other: "",
};

const kindLabels: Record<string, string> = {
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
    <Container>
      <PageTitle
        eyebrow="3 дня"
        title="Расписание саммита"
        description="Черновик расписания. Некоторые блоки могут сдвигаться — следите за обновлениями."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {schedule.map((day) => (
          <Card key={day.date}>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold">{day.label}</h2>
              <div className="text-xs text-[var(--muted)] font-mono">
                {day.date}
              </div>
            </div>
            <ul className="mt-5 space-y-4">
              {day.items.map((item) => (
                <li key={item.time} className="flex gap-4">
                  <div className="w-24 shrink-0 font-mono text-xs text-white/80 pt-0.5">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`chip ${kindStyles[item.kind] ?? ""}`}
                      >
                        {kindLabels[item.kind] ?? item.kind}
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {item.speaker && (
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {item.speaker}
                      </div>
                    )}
                    {item.note && (
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {item.note}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Container>
  );
}
