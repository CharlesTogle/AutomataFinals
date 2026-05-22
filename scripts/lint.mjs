import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const SourceRoots = ["app", "tests"];
const SourceExtensions = new Set([".ts", ".tsx", ".mts", ".cts"]);
const ForbiddenPatterns = [
  { label: "any", pattern: /\bany\b/g },
  { label: "unknown", pattern: /\bunknown\b/g },
];

function* Walk(directoryPath) {
  const entries = readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "build") {
        continue;
      }

      yield* Walk(entryPath);
      continue;
    }

    if (SourceExtensions.has(extname(entry.name))) {
      yield entryPath;
    }
  }
}

function GetLineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

const findings = [];

for (const sourceRoot of SourceRoots) {
  try {
    if (!statSync(sourceRoot).isDirectory()) {
      continue;
    }
  } catch {
    continue;
  }

  for (const filePath of Walk(sourceRoot)) {
    const fileContents = readFileSync(filePath, "utf8");

    for (const forbiddenPattern of ForbiddenPatterns) {
      forbiddenPattern.pattern.lastIndex = 0;

      for (const match of fileContents.matchAll(forbiddenPattern.pattern)) {
        if (typeof match.index !== "number") {
          continue;
        }

        findings.push({
          FilePath: filePath,
          LineNumber: GetLineNumber(fileContents, match.index),
          Label: forbiddenPattern.label,
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Forbidden type tokens found:");

  for (const finding of findings) {
    console.error(
      `- ${finding.FilePath}:${finding.LineNumber} contains "${finding.Label}"`,
    );
  }

  process.exit(1);
}

console.log("No forbidden type tokens found in app/ or tests/.");
