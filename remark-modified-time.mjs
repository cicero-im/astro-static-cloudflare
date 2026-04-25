import { execFileSync } from "node:child_process";

export function remarkModifiedTime() {
  return function (_tree, file) {
    const filepath = file.history[0];
    if (!filepath) return;

    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};

    try {
      const result = execFileSync("git", ["log", "-1", "--pretty=format:%cI", "--", filepath], {
        encoding: "utf8",
      }).trim();

      if (result) {
        file.data.astro.frontmatter.lastModified = result;
      }
    } catch {
      // Builds without git metadata should still succeed.
    }
  };
}
