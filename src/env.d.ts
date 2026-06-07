/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.mdoc' {
  const Content: import('astro').MarkdownInstance<{}>['Content'];
  export { Content };
  export const headings: import('astro').MarkdownHeading[];
}
