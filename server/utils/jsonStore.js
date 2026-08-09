import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Read a JSON array file from server/data/. Creates the file with
 * `defaultValue` if it doesn't exist yet.
 */
export function readJSONFile(filename, defaultValue = []) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return raw.trim() ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.error(`[jsonStore] Failed to parse ${filename}:`, err.message);
    return defaultValue;
  }
}

export function writeJSONFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return data;
}

/** Append a record to a JSON array file and persist it. */
export function appendJSONRecord(filename, record) {
  const items = readJSONFile(filename, []);
  items.push(record);
  writeJSONFile(filename, items);
  return record;
}
