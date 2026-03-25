import { access, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const outDir = path.join(rootDir, "out");
const cnameSource = path.join(rootDir, "CNAME");

await access(outDir);
await copyFile(cnameSource, path.join(outDir, "CNAME"));
await writeFile(path.join(outDir, ".nojekyll"), "");
