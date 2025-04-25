import RSS from "rss";
import config from "@/../portfolio.config";
import { getEntries } from "@/utils/entries";
import fs from "fs";
import path from "path";

// Generate RSS feed
const generateFeed = async () => {
  const feed = new RSS({
    title: `${config.name} Website`,
    description: config.byline,
    generator: "RSS for Node and Next.js",
    feed_url: `${config.url}/feed.rss`,
    site_url: config.url,
    managingEditor: `${config.email} (${config.name})`,
    webMaster: `${config.email} (${config.name})`,
    copyright: `Copyright ${new Date().getFullYear()}, ${config.name}`,
    language: "en-IE",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  // Add blog listing pages
  //
  // NOTE: we only add blog posts to the feed, other pages like photos
  // and projects are not included

  const posts = await getEntries("posts");

  posts.reverse().forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${config.url}/blog/${post.frontmatter.slug}/`,
      categories: post?.frontmatter?.tags ? post?.frontmatter?.tags : [],
      author: config.name,
      date: post.frontmatter.date,
    });
  });

  const xml = feed.xml({ indent: true });

  //   Write to public folder
  fs.writeFileSync(
    path.join(path.join(process.cwd(), "public"), "feed.rss"),
    xml,
  );
};

export default generateFeed;
