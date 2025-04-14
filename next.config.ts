import createMDX from "@next/mdx";
import withPlaiceholder from "@plaiceholder/next";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkReadingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  trailingSlash: true,
  reactStrictMode: true,
  webpack(config) {
    // Taken from:
    // https://github.com/vercel/next.js/issues/48177#issuecomment-1557354538
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#caching-behavior
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.timmyomahony.com",
      },
      {
        protocol: "https",
        hostname: "timmyomahony-photos.ams3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "timmyomahony-content.ams3.digitaloceanspaces.com",
      },
    ],
  },
  async redirects() {
    // Legacy redirects from older sites
    return [
      {
        source: "/work",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/work/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/blog/substacks-ui-just-cost-me-2-023",
        destination:
          "/blog/substacks-ui-and-1password-just-cost-me-2023-dollars",
        permanent: true,
      },
      {
        source: "/blog/misconceptions-select_related-in-django",
        destination: "/blog/misconceptions-select-related-in-django",
        permanent: true,
      },
      {
        source: "/blog/a-general-django-project-structure-or-folder-layout",
        destination: "/blog/updated-django-project-structure-or-folder-layout",
        permanent: true,
      },
    ];
  },
};

// Configure MDX and plugins for regular .mdx pages within Next.js
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
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
        },
      ],
      withToc,
      withTocExport,
      remarkReadingTime,
      readingMdxTime,
    ],
  },
});

export default withPlaiceholder(withMDX(nextConfig));
