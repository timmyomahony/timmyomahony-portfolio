import type { MDXEntry, MDXEntryType } from "@/types";
import { serverSideEvaluateMdx } from "@/utils/mdx";
import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

const getEntries = cache(async (type: MDXEntryType): Promise<MDXEntry[]> => {
  console.log(`Getting '${type}' entries from content folder`);
  const contentDir = path.join(process.cwd(), "content");

  try {
    // Get all files recursively from content directory
    const getFiles = async (dir: string): Promise<string[]> => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const files = await Promise.all(
        entries.map(async (entry) => {
          const fullPath = path.join(dir, entry.name);
          return entry.isDirectory() ? getFiles(fullPath) : fullPath;
        }),
      );
      return files.flat();
    };

    // Get all markdown files
    let files = (await getFiles(contentDir)).filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md"),
    );

    // Filter by type if needed
    if (type !== "all") {
      files = files.filter((file) => {
        const relativePath = path.relative(contentDir, file);
        return relativePath.startsWith(type);
      });
    }

    // Read and process each file
    const entries = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(file, "utf-8");
        return serverSideEvaluateMdx(content);
      }),
    );

    // Finally, remove any drafts
    return entries.filter((entry) => entry?.frontmatter?.draft !== true);
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
});

/**
 * Retrieve all tags from a list of entries
 *
 * @param entries
 * @returns
 */
const getAllTags = async (entries: MDXEntry[]): Promise<string[]> => {
  const tagSet = new Set<string>();

  entries.forEach((entry) => {
    if (entry?.frontmatter?.tags) {
      entry.frontmatter.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
};

/**
 * Retrieve all entries that have a specific tag
 *
 * @param entries
 * @param tag
 * @returns
 */
const getEntriesForTag = async (entries: MDXEntry[], tag: string) => {
  return entries.filter((entry) => {
    if (entry?.frontmatter?.tags) {
      return entry.frontmatter.tags.includes(tag);
    }
    return false;
  });
};

/**
 * Find related entries by matching tags
 *
 * @param entry
 * @param entries
 * @returns
 */
const getRelatedEntries = async (
  entry: MDXEntry,
  entries: MDXEntry[],
): Promise<{
  nextEntry: MDXEntry;
  previousEntry: MDXEntry;
  relatedEntries: MDXEntry[];
}> => {
  const index = entries.findIndex(
    (entry_) => entry_.frontmatter?.slug === entry?.frontmatter?.slug,
  );

  // Get "next" entry
  const nextEntry: MDXEntry | undefined = entries[index > 1 ? index - 1 : -1];

  // Get "previous" entry
  const previousEntry: MDXEntry | undefined =
    entries[index <= entries.length ? index + 1 : -1];

  // Get up to 3 recent entries from the same tag
  const scores: Array<[number, number]> = [];
  let relatedEntries: MDXEntry[] = [];

  if (entry.frontmatter.tags) {
    entry.frontmatter.tags.forEach((tag) => {
      entries.forEach((entry_, i) => {
        if (
          entry_.frontmatter.tags &&
          entry_.frontmatter.tags.includes(tag) &&
          entry_.frontmatter.slug !== entry.frontmatter.slug
        ) {
          if (typeof scores[i] === "undefined") {
            scores[i] = [i, 0];
          }
          scores[i][1]++;
        }
      });
    });

    const sortedScores = scores
      .sort((a: any, b: any): any => {
        return a[1] > b[1];
      })
      .filter((score) => typeof score !== "undefined")
      .slice(0, 3);

    relatedEntries = sortedScores.map((score) => entries[score[0]]);
  }

  return { nextEntry, previousEntry, relatedEntries };
};

export { getAllTags, getEntries, getEntriesForTag, getRelatedEntries };
