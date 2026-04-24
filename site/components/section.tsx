import type { ReactNode } from "react";

export function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="pb-8">
      {eyebrow && (
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--accent-2)]">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{description}</p>
      )}
    </header>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 py-10 ${className}`}>
      {children}
    </div>
  );
}

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`card p-5 ${className}`}>
      {children}
    </div>
  );
}
