// Inline assets/tailwind.css into every HTML file in place of the <link> tag.
// Runs after `tailwindcss` build. Kills the HTML→CSS critical request chain.
const fs = require("fs");
const path = require("path");

const css = fs.readFileSync("assets/tailwind.css", "utf8").trim();
const MARKER_START = "<!-- tailwind-inline:start -->";
const MARKER_END = "<!-- tailwind-inline:end -->";
const inlineBlock = `${MARKER_START}<style>${css}</style>${MARKER_END}`;

const linkRe = /<link rel="stylesheet" href="(?:\.\.\/)?assets\/tailwind\.css">/;
const blockRe = new RegExp(
  MARKER_START.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") +
    "[\\s\\S]*?" +
    MARKER_END.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
);

function collectHtml(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name.startsWith(".") || f.name === "node_modules") continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) out.push(...collectHtml(p));
    else if (f.name.endsWith(".html")) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of collectHtml(".")) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  if (blockRe.test(html)) {
    html = html.replace(blockRe, inlineBlock);
  } else if (linkRe.test(html)) {
    html = html.replace(linkRe, inlineBlock);
  } else {
    continue;
  }
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed++;
  }
}
console.log(`Inlined CSS into ${changed} HTML file${changed === 1 ? "" : "s"}.`);
