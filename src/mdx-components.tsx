/**
 * This file is required by Next when using MDX files as routes
 */
import type { MDXComponents } from "mdx/types";

import _MDXComponents from "@/components/MDXComponent";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ..._MDXComponents,
  };
}
