import type { PostFrontmatter } from "../types";

/** "Hello, World!" → "hello-world" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Serializes post metadata into a YAML frontmatter block. */
export function buildFrontmatter(fm: PostFrontmatter): string {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fm)) {
    if (value == null) continue;
    if (Array.isArray(value)) lines.push(`${key}: [${value.join(", ")}]`);
    else lines.push(`${key}: ${value}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

function inlineToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as HTMLElement;
  // Decorative nodes opt out of Markdown export.
  if (el.hasAttribute("data-md-skip")) return "";
  const inner = Array.from(el.childNodes).map(inlineToMarkdown).join("");
  switch (el.tagName) {
    case "STRONG":
    case "B":
      return `**${inner}**`;
    case "EM":
    case "I":
      return `*${inner}*`;
    case "CODE":
      return `\`${inner}\``;
    case "A":
      return `[${inner}](${el.getAttribute("href") ?? ""})`;
    case "BR":
      return "  \n";
    default:
      return inner;
  }
}

function blockToMarkdown(el: HTMLElement): string {
  switch (el.tagName) {
    case "H1":
      return `# ${inlineToMarkdown(el)}`;
    case "H2":
      return `## ${inlineToMarkdown(el)}`;
    case "H3":
      return `### ${inlineToMarkdown(el)}`;
    case "H4":
      return `#### ${inlineToMarkdown(el)}`;
    case "P":
      return inlineToMarkdown(el).trim();
    case "BLOCKQUOTE":
      return inlineToMarkdown(el)
        .trim()
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "PRE":
      return "```\n" + (el.textContent ?? "").replace(/\n$/, "") + "\n```";
    case "HR":
      return "---";
    case "IMG":
      return `![${el.getAttribute("alt") ?? ""}](${el.getAttribute("src") ?? ""})`;
    case "FIGCAPTION":
      return `*${inlineToMarkdown(el).trim()}*`;
    case "UL":
      return Array.from(el.children)
        .map((li) => `- ${inlineToMarkdown(li).trim()}`)
        .join("\n");
    case "OL":
      return Array.from(el.children)
        .map((li, i) => `${i + 1}. ${inlineToMarkdown(li).trim()}`)
        .join("\n");
    case "TABLE": {
      const rows = Array.from(el.querySelectorAll("tr"));
      if (rows.length === 0) return "";
      const toCells = (tr: Element) =>
        Array.from(tr.children).map((c) => inlineToMarkdown(c).trim());
      const head = toCells(rows[0]);
      const body = rows.slice(1).map(toCells);
      return [
        `| ${head.join(" | ")} |`,
        `| ${head.map(() => "---").join(" | ")} |`,
        ...body.map((r) => `| ${r.join(" | ")} |`),
      ].join("\n");
    }
    default: {
      // A container with block-level element children → recurse.
      // Otherwise (text-only, e.g. a Callout div) → treat as a paragraph
      // so its content is never dropped.
      const blockTags =
        /^(H[1-6]|P|UL|OL|BLOCKQUOTE|PRE|HR|TABLE|FIGURE|FIGCAPTION|IMG|DIV|SECTION|ARTICLE)$/;
      const hasBlockChildren = Array.from(el.children).some((c) =>
        blockTags.test(c.tagName),
      );
      if (hasBlockChildren) {
        return Array.from(el.children)
          .map((child) => blockToMarkdown(child as HTMLElement))
          .filter(Boolean)
          .join("\n\n");
      }
      return inlineToMarkdown(el).trim();
    }
  }
}

/** Walks a rendered article element and returns clean Markdown. */
export function nodeToMarkdown(el: HTMLElement): string {
  return Array.from(el.children)
    .map((child) => blockToMarkdown(child as HTMLElement))
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

/** Frontmatter + body — the full downloadable Markdown payload. */
export function postToMarkdown(el: HTMLElement, fm: PostFrontmatter): string {
  return buildFrontmatter(fm) + nodeToMarkdown(el) + "\n";
}

/** Triggers a client-side `.md` file download. */
export function downloadMarkdown(filename: string, contents: string): void {
  const blob = new Blob([contents], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
