import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const blogDir = path.join(rootDir, 'blog');
const tagsFile = path.join(blogDir, 'tags.yml');
const baseUrl = '/tonatiuhpp-blog/';

const issues = [];

function walk(dir, matcher, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, matcher, out);
      continue;
    }
    if (matcher(fullPath)) out.push(fullPath);
  }
  return out;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function rel(filePath) {
  return toPosix(path.relative(rootDir, filePath));
}

function lineOf(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function addIssue(filePath, line, message) {
  issues.push(`${rel(filePath)}:${line} ${message}`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function parseFrontMatter(filePath, text) {
  if (!text.startsWith('---')) return {frontMatter: '', body: text};
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== '---') return {frontMatter: '', body: text};
  let endIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }
  if (endIndex === -1) {
    addIssue(filePath, 1, 'invalid front matter block');
    return {frontMatter: '', body: text};
  }
  return {
    frontMatter: lines.slice(1, endIndex).join('\n'),
    body: lines.slice(endIndex + 1).join('\n'),
  };
}

function parseTagIds(text) {
  const tagIds = new Set();
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*$/);
    if (match) tagIds.add(match[1]);
  }
  return tagIds;
}

function parsePostTags(filePath, frontMatter, fileText) {
  const tags = [];
  const lines = frontMatter.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const inline = line.match(/^tags:\s*\[(.*?)\]\s*$/);
    if (inline) {
      for (const item of inline[1].split(',')) {
        const cleaned = item.trim().replace(/^['"]|['"]$/g, '');
        if (cleaned) tags.push({tag: cleaned, line: i + 2});
      }
      continue;
    }

    if (/^tags:\s*$/.test(line)) {
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        const item = lines[j].replace(/^\s*-\s+/, '').trim();
        const cleaned = item.replace(/^['"]|['"]$/g, '');
        if (cleaned) tags.push({tag: cleaned, line: j + 2});
        j += 1;
      }
      i = j - 1;
    }
  }

  if (!tags.length && /(^|\n)tags:\s*/.test(fileText)) {
    addIssue(filePath, 1, 'could not parse tags in front matter');
  }
  return tags;
}

function inferPostRoute(filePath, frontMatter) {
  const slugMatch = frontMatter.match(/^slug:\s*(.+)$/m);
  if (slugMatch) {
    const slug = slugMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (slug) return slug.startsWith('/') ? slug : `/${slug}`;
  }
  const base = path.basename(filePath).replace(/\.(md|mdx)$/i, '');
  const match = base.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  if (match) return `/${match[1]}`;
  return null;
}

function normalizePathLike(urlValue) {
  return urlValue.split('#')[0].split('?')[0].trim();
}

function extractAnchor(urlValue) {
  const hashIndex = urlValue.indexOf('#');
  if (hashIndex === -1) return '';
  const raw = urlValue.slice(hashIndex + 1).split('?')[0].trim();
  if (!raw) return '';
  try {
    return decodeURIComponent(raw).toLowerCase();
  } catch {
    return raw.toLowerCase();
  }
}

function normalizeRoute(urlValue) {
  let route = normalizePathLike(urlValue);
  if (!route) return '/';
  if (route.startsWith(baseUrl)) {
    route = `/${route.slice(baseUrl.length)}`;
  }
  if (!route.startsWith('/')) route = `/${route}`;
  if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1);
  return route;
}

function isExternal(link) {
  return /^(?:[a-zA-Z][a-zA-Z0-9+.-]*:|\/\/)/.test(link);
}

function collectLinks(text) {
  const links = [];
  const markdownRe = /\[[^\]]*]\(([^)]+)\)/g;
  const htmlRe = /\b(?:href|src)\s*=\s*["']([^"']+)["']/g;
  for (const re of [markdownRe, htmlRe]) {
    let match;
    while ((match = re.exec(text)) !== null) {
      links.push({value: match[1], index: match.index});
    }
  }
  return links;
}

function slugifyHeading(text) {
  const cleaned = text
    .replace(/`[^`]*`/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .toLowerCase();
  return cleaned
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function collectAnchorsFromBody(body) {
  const anchors = new Set();
  const lines = body.split(/\r?\n/);
  for (const line of lines) {
    const mdHeading = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (mdHeading) {
      const explicitIdMatch = mdHeading[1].match(/\s*\{#([a-zA-Z0-9\-_]+)\}\s*$/);
      if (explicitIdMatch) {
        anchors.add(explicitIdMatch[1].toLowerCase());
      }
      const headingText = mdHeading[1].replace(/\s*\{#([a-zA-Z0-9\-_]+)\}\s*$/, '');
      const slug = slugifyHeading(headingText);
      if (slug) anchors.add(slug);
    }
    const htmlIds = line.matchAll(/\bid=["']([^"']+)["']/g);
    for (const match of htmlIds) {
      anchors.add(String(match[1]).toLowerCase());
    }
  }
  return anchors;
}

function validateAnchor(filePath, line, linkValue, targetRoute, targetAnchors) {
  const anchor = extractAnchor(linkValue);
  if (!anchor) return;
  if (!targetAnchors || !targetAnchors.has(anchor)) {
    addIssue(filePath, line, `unknown anchor "#${anchor}" for route "${targetRoute}"`);
  }
}

function validateLink(filePath, text, link, knownRoutes, routeByFile, anchorsByRoute) {
  const raw = link.value.trim();
  if (!raw || isExternal(raw)) return;

  const clean = normalizePathLike(raw);
  const line = lineOf(text, link.index);
  const currentRoute = routeByFile.get(filePath) ?? '/';

  if (raw.startsWith('#')) {
    validateAnchor(filePath, line, raw, currentRoute, anchorsByRoute.get(currentRoute));
    return;
  }

  if (!clean) {
    validateAnchor(filePath, line, raw, currentRoute, anchorsByRoute.get(currentRoute));
    return;
  }

  if (clean.startsWith('/img/')) {
    const assetPath = path.join(rootDir, 'static', clean.slice(1));
    if (!fs.existsSync(assetPath)) {
      addIssue(filePath, line, `missing image asset: ${clean}`);
    }
    return;
  }

  if (clean.startsWith('/')) {
    const route = normalizeRoute(clean);
    if (!knownRoutes.has(route)) {
      addIssue(filePath, line, `unknown internal route: ${clean}`);
      return;
    }
    validateAnchor(filePath, line, raw, route, anchorsByRoute.get(route));
    return;
  }

  // Validate explicit relative file links.
  if (clean.startsWith('./') || clean.startsWith('../') || clean.startsWith('img/')) {
    const resolved = path.resolve(path.dirname(filePath), clean);
    if (!fs.existsSync(resolved)) {
      addIssue(filePath, line, `missing relative target: ${clean}`);
      return;
    }
    if (/\.(md|mdx)$/i.test(resolved)) {
      const targetRoute = routeByFile.get(resolved);
      if (targetRoute) {
        validateAnchor(filePath, line, raw, targetRoute, anchorsByRoute.get(targetRoute));
      }
    }
  }
}

function validateStaleNames() {
  const stalePatterns = [
    /generic-optimization-workflow-blog/i,
    /\bGOW\b/,
  ];
  const scanTargets = [
    ...walk(path.join(rootDir, 'blog'), (f) => /\.(md|mdx|yml|yaml)$/i.test(f)),
    ...walk(path.join(rootDir, 'src'), (f) => /\.(js|jsx|ts|tsx|css|md|mdx)$/i.test(f)),
    ...walk(path.join(rootDir, '.github', 'workflows'), (f) => /\.(yml|yaml)$/i.test(f)),
    path.join(rootDir, 'docusaurus.config.js'),
    path.join(rootDir, 'package.json'),
  ].filter((f) => fs.existsSync(f));

  for (const filePath of scanTargets) {
    const text = readText(filePath);
    for (const pattern of stalePatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        addIssue(filePath, lineOf(text, match.index), `stale-name guard matched: ${match[0]}`);
        if (!pattern.global) break;
      }
    }
  }
}

function main() {
  const postFiles = walk(blogDir, (f) => /\.(md|mdx)$/i.test(f));
  const tagIds = parseTagIds(readText(tagsFile));

  const knownRoutes = new Set(['/', '/archive', '/tags']);
  const postFrontMatterMap = new Map();
  const routeByFile = new Map();
  const anchorsByRoute = new Map();

  for (const filePath of postFiles) {
    const text = readText(filePath);
    const {frontMatter, body} = parseFrontMatter(filePath, text);
    postFrontMatterMap.set(filePath, frontMatter);
    const route = inferPostRoute(filePath, frontMatter);
    if (route) {
      const normalizedRoute = normalizeRoute(route);
      knownRoutes.add(normalizedRoute);
      routeByFile.set(filePath, normalizedRoute);
      anchorsByRoute.set(normalizedRoute, collectAnchorsFromBody(body));
    }
  }

  for (const tagId of tagIds) {
    knownRoutes.add(normalizeRoute(`/tags/${tagId}`));
    knownRoutes.add(normalizeRoute(`/${tagId}`));
  }

  for (const filePath of postFiles) {
    const text = readText(filePath);
    const frontMatter = postFrontMatterMap.get(filePath) ?? '';
    const tags = parsePostTags(filePath, frontMatter, text);
    for (const {tag, line} of tags) {
      if (!tagIds.has(tag)) {
        addIssue(filePath, line, `undefined tag "${tag}" (missing in blog/tags.yml)`);
      }
    }

    const links = collectLinks(text);
    for (const link of links) {
      validateLink(filePath, text, link, knownRoutes, routeByFile, anchorsByRoute);
    }
  }

  validateStaleNames();

  if (issues.length) {
    console.error(`check-links failed with ${issues.length} issue(s):`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exit(1);
  }

  console.log('check-links passed');
}

main();
