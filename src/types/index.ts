import { ReactNode } from "react";
import type { MDXModule } from "mdx/types";
import type { TocEntry } from "@stefanprobst/rehype-extract-toc";

export interface Cite {
  name: string;
  url: string;
}

export interface Image {
  url: string;
  cite?: Cite;
}

export interface Revision {
  date: string;
  change: string;
}

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  tags?: string[];
  image?: Image;
  pinned?: boolean;
  featured?: boolean;
  ordering?: number;
  thumbnail?: string;
  slug?: string;
  website?: string;
  revisions?: Revision[];
  draft?: boolean;
  [key: string]: any;
}

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface MDXEntry extends MDXModule {
  frontmatter: Frontmatter;
  readingTime: ReadingTime;
  tableOfContents: TocEntry[];
}

export type MDXEntryType =
  | "posts"
  | "pages"
  | "projects"
  | "testimonials"
  | "all";

export interface Exif {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  fileName?: string;
  cameraMake?: string;
  cameraModel?: string;
  lens?: string;
  iso?: number;
  aperture?: string;
  focalLength?: string;
  shutterSpeed?: string;
}

export type ExifKeys = keyof Exif;

export interface Photo {
  id: number;
  uuid: string;
  path: string;
  height?: number;
  width?: number;
  type?: string;
  url: string;
  ordering?: number;
  exif?: Exif;
  placeholder: string;
  color?: string;
  thumbnail: string;
}

export interface Album {
  id: number;
  name: string;
  description?: string;
  slug: string;
  date: string;
  photos: Photo[];
}

export interface FAQ {
  question: string;
  answer: ReactNode | string;
}

export interface Albums {
  [key: string]: Album;
}

export interface NowDataEntry {
  category: string;
  text: string;
  description: string;
  date: string;
  link?: string;
  rating?: number;
}
