import raw from "./team-artifacts.json";

export type ArtifactKind =
  | "notebook"
  | "pdf"
  | "doc"
  | "slides"
  | "data"
  | "image"
  | "html"
  | "text"
  | "folder"
  | "other";

export type TeamArtifactFile = {
  id: string;
  name: string;
  kind: ArtifactKind;
  mimeType: string;
  size: number;
  modifiedTime: string;
  webViewLink: string;
  modifier: string;
};

export type TeamArtifacts = {
  slug: string;
  name: string;
  driveFolder: string;
  files: TeamArtifactFile[];
};

export const artifacts: TeamArtifacts[] = raw as TeamArtifacts[];

export function getArtifacts(slug: string): TeamArtifacts | undefined {
  return artifacts.find((a) => a.slug === slug);
}

export const kindLabel: Record<ArtifactKind, string> = {
  notebook: "ноутбук",
  pdf: "PDF",
  doc: "документ",
  slides: "презентация",
  data: "данные",
  image: "изображение",
  html: "HTML",
  text: "текст",
  folder: "папка",
  other: "файл",
};
