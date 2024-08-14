import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { merge } from "lodash-es";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadJSON(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

const contactPath = path.resolve(__dirname, "./contact.json");
const stagesPath = path.resolve(__dirname, "./stages.json");
const contact = await loadJSON(contactPath);
const stages = await loadJSON(stagesPath);
const mergedData = merge({}, contact, stages);

await fs.writeFile(
  path.resolve(__dirname, "db.json"),
  JSON.stringify(mergedData, null, 2),
);
