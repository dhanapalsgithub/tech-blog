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
      // இங்கே 'image' வரியைச் சேர்க்கவும்:
      image: data.image ?? null, 
      cover: data.cover ?? null,
      ogImage: data.ogImage ?? null,
    },
    content,
    readingTime: stats.text,
  };
}