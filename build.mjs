// Construit le site Vercel : copie dans public/ seulement les fichiers de l'appli.
import fs from "node:fs/promises";
import { PUBLIC } from "./fichiers-publics.js";

await fs.rm("public", { recursive: true, force: true });
await fs.mkdir("public");
for (const f of PUBLIC) await fs.copyFile(f, `public/${f}`);
console.log(`public/ : ${PUBLIC.length} fichiers`);
