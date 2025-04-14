import { evaluate } from "@mdx-js/mdx";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import { MDXModule } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import html from "remark-html";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkReadingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";
import strip from "strip-markdown";
import type { MDXEntry } from "@/types";

const renderDescription = async (markdown: string): Promise<string> => {
  return await (await remark().use(html).process(markdown)).toString();
};

const stripDescription = async (markdown: string): Promise<string> => {
  return await (
    await // @ts-ignore
    remark().use(strip).process(markdown)
  ).toString();
};

/**
 * Options for the rehype-pretty-code plugin.
 *
 * See for more:
 *
 * - https://rehype-pretty-code.netlify.app/
 * - https://vscodethemes.com/?sortBy=installs&type=light
 */
const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (node.children.length === 0) {
      node.properties.className.push("highlighted");
    }
  },
  onVisitHighlightedWord(node) {
    if (node.children.length === 0) {
      node.properties.className = ["word"];
    }
  },
};

/**
 * Convert MDX text content to a component for rendering
 *
 * IMPORTANT: This should only every be run on the server-side
 *
 * @param mdxContent: MDX text content
 * @returns Promise<MDXEntry>
 */
const serverSideEvaluateMdx = async (mdxContent: string): Promise<MDXEntry> => {
  const result = await evaluate(mdxContent, {
    ...runtime,
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      withToc,
      withTocExport,
      remarkReadingTime,
      readingMdxTime,
    ],
  });

  return result as MDXEntry;
};

export {
  rehypePrettyCodeOptions,
  renderDescription,
  serverSideEvaluateMdx,
  stripDescription,
};
