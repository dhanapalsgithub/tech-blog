import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

/**
 * @typedef {Object} PostFrontmatter
 * @property {string} title
 * @property {string} description
 * @property {string} date
 * @property {string} author
 * @property {string[]} tags
 * @property {string} [cover]
 * @property {string} [ogImage]
 */

/**
 * @typedef {Object} Post
 * @property {string} slug
 * @property {PostFrontmatter} frontmatter
 * @property {string} content
 * @property {string} readingTime
 */

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export function getAllSlugs() {
  ensureDir();
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getPostBySlug(slug) {
  ensureDir();
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? new Date().toISOString(),
      author: data.author ?? 'Anonymous',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover ?? null,
      ogImage: data.ogImage ?? null,
    },
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts() {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getAllTags() {
  const set = new Set();
  for (const p of getAllPosts()) {
    for (const t of p.frontmatter.tags) set.add(t);
  }
  return Array.from(set).sort();
}
