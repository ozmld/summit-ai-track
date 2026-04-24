import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  number,
  eyebrow,
  title,
  lead,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="border-b border-[var(--rule)] py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 sm:grid-cols-[1fr_2fr] sm:items-end">
          <div>
            {number && (
              <div className="section-number">— {number} —</div>
            )}
            {eyebrow && <div className="eyebrow mt-3">{eyebrow}</div>}
          </div>
          <div>
            <h1 className="display text-4xl sm:text-6xl">{title}</h1>
            {lead && (
              <p className="mt-6 serif italic text-lg text-[var(--ink-muted)] max-w-2xl">
                {lead}
              </p>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export function Panel({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`border border-[var(--rule)] bg-[var(--paper-2)]/40 p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  number,
  title,
  right,
}: {
  number: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-[var(--ink)] pb-3">
      <div className="flex items-baseline gap-4">
        <span className="section-number">№ {number}</span>
        <h2 className="display text-2xl sm:text-3xl">{title}</h2>
      </div>
      {right && <div className="text-sm">{right}</div>}
    </div>
  );
}
