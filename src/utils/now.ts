import { MDXEntry, NowDataEntry } from "@/types";
import { serverSideEvaluateMdx } from "@/utils/mdx";
import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

const getNowEntries = cache(async (): Promise<NowDataEntry[]> => {
  return JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), "content/now/data.json"),
      "utf-8",
    ),
  );
});

const getNowContent = cache(async (): Promise<MDXEntry> => {
  const content = await fs.readFile(
    path.join(process.cwd(), "content/now/content.mdx"),
    "utf-8",
  );
  return await serverSideEvaluateMdx(content);
});

export { getNowContent, getNowEntries };
