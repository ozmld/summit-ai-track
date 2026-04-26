import type { TeamArtifactFile } from "@/lib/data/artifacts";
import { kindLabel } from "@/lib/data/artifacts";

const iconFor: Record<string, string> = {
  notebook: "📓",
  pdf: "📄",
  doc: "📝",
  slides: "🪧",
  data: "📊",
  image: "🖼",
  html: "🌐",
  text: "📃",
  folder: "📁",
  other: "📎",
};

function formatSize(size: number): string {
  if (!size) return "";
  if (size < 1024) return `${size} Б`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} КБ`;
  return `${(size / 1024 / 1024).toFixed(1)} МБ`;
}

export function ArtifactList({ files }: { files: TeamArtifactFile[] }) {
  if (files.length === 0) {
    return (
      <p className="text-sm text-[var(--ink-muted)] italic">
        Команда пока ничего не загрузила.
      </p>
    );
  }
  return (
    <ul className="space-y-1.5">
      {files.map((f) => (
        <li key={f.id} className="flex items-baseline gap-3 text-sm">
          <span className="mono text-[var(--ink-muted)]" aria-hidden>
            {iconFor[f.kind] ?? iconFor.other}
          </span>
          <a
            href={f.webViewLink}
            target="_blank"
            rel="noreferrer"
            className="link-underline break-all"
          >
            {f.name}
          </a>
          <span className="mono text-xs text-[var(--ink-muted)] whitespace-nowrap">
            · {kindLabel[f.kind]}
            {f.size > 0 && ` · ${formatSize(f.size)}`}
          </span>
        </li>
      ))}
    </ul>
  );
}
