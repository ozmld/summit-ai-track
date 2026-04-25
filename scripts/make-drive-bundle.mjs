import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const bundleRoot = path.join(root, "drive-bundle", "Команды трека ИИ");

const templateFile = path.join(root, "site", "public", "project", "module-template.md");
const guideFile = path.join(root, "site", "public", "project", "team-guide.md");

const template = fs.readFileSync(templateFile, "utf8");
const guide = fs.readFileSync(guideFile, "utf8");

const teamsFile = path.join(root, "site", "lib", "data", "teams.ts");
const teamsRaw = fs.readFileSync(teamsFile, "utf8");

const teams = [];
const blockRegex = /{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*members:\s*\[([^\]]+)\]/g;
let m;
while ((m = blockRegex.exec(teamsRaw)) !== null) {
  const slug = m[1];
  const name = m[2];
  const members = [...m[3].matchAll(/"([^"]+)"/g)].map((mm) => mm[1]);
  teams.push({ slug, name, members });
}

if (!teams.length) {
  console.error("No teams parsed from teams.ts");
  process.exit(1);
}

fs.rmSync(path.dirname(bundleRoot), { recursive: true, force: true });
fs.mkdirSync(bundleRoot, { recursive: true });

const indexLines = [
  "# Команды трека ИИ",
  "",
  "Папка для рабочих материалов команд II Саммита талантов.",
  "",
  "## Состав",
  "",
];

for (const team of teams) {
  const dir = path.join(bundleRoot, team.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(dir, "resources"), { recursive: true });
  fs.writeFileSync(path.join(dir, "resources", ".keep"), "");

  fs.writeFileSync(path.join(dir, "module-template.md"), template);
  fs.writeFileSync(path.join(dir, "team-guide.md"), guide);

  const readme = [
    `# ${team.name}`,
    "",
    "**II Саммит талантов · трек ИИ**",
    "",
    "## Состав команды",
    "",
    ...team.members.map((x) => `- ${x}`),
    "",
    "## Что в этой папке",
    "",
    "- `team-guide.md` — инструкция для учителей: как работать с папкой и сдавать модуль.",
    "- `module-template.md` — шаблон модуля со всеми пятью разделами. Откройте его через Google Docs и работайте поверх.",
    "- `resources/` — для всех дополнительных файлов (картинки, скриншоты, ноутбуки).",
    "",
    "## Первые шаги",
    "",
    "1. Прочитайте `team-guide.md`.",
    "2. Откройте `module-template.md` через Google Docs → сохраните как «Модуль — " +
      team.name +
      "».",
    "3. Выдайте новому документу доступ «по ссылке» на чтение.",
    "4. Начните заполнять Раздел 0 после первой пары Дня 2.",
    "",
    "## Ссылки",
    "",
    "- Сайт саммита: https://summit-ai-track.vercel.app/",
    "- ТЗ проекта: https://summit-ai-track.vercel.app/project",
    "- План Дня 2: https://summit-ai-track.vercel.app/days/2",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(dir, "README.md"), readme);

  indexLines.push(`- **${team.name}** (\`${team.slug}\`) — ${team.members.length} чел.`);
}

indexLines.push(
  "",
  "## Как развернуть",
  "",
  "1. Откройте Google Drive.",
  "2. Создайте в корне (или в папке саммита) папку **«Команды трека ИИ»**.",
  "3. Перетащите все 8 подпапок из этой папки внутрь — Drive сохранит вложенность.",
  "4. Настройте права: «Все, у кого есть ссылка» → «Редактирование» на папку команды.",
  "5. Разошлите командам прямые ссылки на их папки.",
  "",
);

fs.writeFileSync(path.join(path.dirname(bundleRoot), "README.md"), indexLines.join("\n"));

console.log(`Bundle ready: ${bundleRoot}`);
console.log(`Teams: ${teams.length}`);
