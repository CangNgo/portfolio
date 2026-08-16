import { marked } from "marked";

// ponytail: content is authored locally (blog.json), not user input — no sanitizer needed.
// If posts ever accept external/user-submitted markdown, add DOMPurify before shipping HTML to the client.
export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false });
}
