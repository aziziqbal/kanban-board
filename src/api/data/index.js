import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { merge } from "lodash-es";

// Menggunakan __dirname dalam modul ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Impor data JSON menggunakan import assert
const contact = await import(path.resolve(__dirname, "./contact.json"), {
  assert: { type: "json" },
});
const stages = await import(path.resolve(__dirname, "./stages.json"), {
  assert: { type: "json" },
});

// Gabungkan data JSON
const mergedData = merge({}, contact.default, stages.default);

// Tulis data gabungan ke db.json
await fs.writeFile(
  path.resolve(__dirname, "db.json"),
  JSON.stringify(mergedData, null, 2),
);
