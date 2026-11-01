import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { escapeHtml } from '../src/sections/shared/render-utils.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const collections = [
  { folder: 'blog', section: 'writing', exportName: 'blogs', page: 'blog.html', label: 'Notes & writing' },
  { folder: 'projects', section: 'projects', exportName: 'projects', page: 'projects.html', label: 'Projects' },
  { folder: 'challenges', section: 'challenges', exportName: 'challenges', page: 'challenges.html', label: 'Challenges' }
];
const siteUrl = 'https://sivasagar2103.github.io/siva-sagar-portfolio';
const siteName = 'Siva Sagar Kancham';

marked.setOptions({ gfm: true, breaks: false });

const toSlug = value => value
  .toLocaleLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const formatDate = dateValue => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid blog date: ${dateValue}`);
  return {
    iso: date.toISOString().slice(0, 10),
    display: new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date)
  };
};

const stripMarkdown = markdown => markdown
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[#>*_`~|-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const estimateReadTime = markdown => `${Math.max(1, Math.ceil(stripMarkdown(markdown).split(' ').filter(Boolean).length / 220))} min read`;

const safeMarkdownHtml = markdown => sanitizeHtml(marked.parse(markdown), {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'img', 'h1', 'h2', 'h3', 'h4', 'hr', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'del'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    code: ['class'],
    th: ['align'],
    td: ['align']
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' })
  }
});

const buildPostPage = post => {
  const canonical = `${siteUrl}/${post.collection.folder}/${post.slug}/`;
  const title = `${post.title} | ${siteName}`;
  const description = post.excerpt;
  const content = safeMarkdownHtml(post.markdown);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#f2efe3" />
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:image" content="${siteUrl}/assets/siva-sagar-face.jpg" />
  ${post.isoDate ? `<meta property="article:published_time" content="${post.isoDate}" />` : ''}
  <meta property="article:author" content="${siteName}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${siteUrl}/assets/siva-sagar-face.jpg" />
  <title>${escapeHtml(title)}</title>
  <base href="../../" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="src/styles.css" />
  <link rel="stylesheet" href="src/layout.css" />
</head>
<body>
  <a class="skip-link" href="${post.link}#main-content">Skip to content</a>
  <div class="grain" aria-hidden="true"></div>
  <header class="site-header">
    <a class="wordmark" href="index.html" aria-label="Siva Sagar home"><span> SIVA SAGAR</span></a>
    <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="nav" aria-label="Main navigation">
      <a href="index.html#about">About</a><a href="index.html#work">Experience</a><a href="challenges.html"${post.collection.folder === 'challenges' ? ' aria-current="page"' : ''}>Challenges</a><a href="projects.html"${post.collection.folder === 'projects' ? ' aria-current="page"' : ''}>Projects</a><a href="blog.html"${post.collection.folder === 'blog' ? ' aria-current="page"' : ''}>Writing</a><a href="index.html#toolkit">Toolkit</a>
      <a class="resume-nav" href="resume.html">Resume</a>
      <button class="search-toggle" type="button" aria-label="Search this portfolio" title="Search (⌘K)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>
      </button>
      <div class="connect-menu">
        <button class="nav-cta connect-toggle" type="button" aria-expanded="false" aria-haspopup="true">Let’s connect <span>↗</span></button>
        <div class="connect-options">
          <a href="mailto:sivasagar2103@gmail.com"><small>EMAIL</small><strong>Send me a note ↗</strong></a>
          <a href="https://www.linkedin.com/in/siva-sagar-47127224b/" target="_blank" rel="noreferrer"><small>LINKEDIN</small><strong>Message me there ↗</strong></a>
        </div>
      </div>
    </nav>
  </header>
  <main id="main-content" class="page-main section-wrap article-page">
    <article>
      <header class="page-heading reveal">
        <div class="section-kicker">${escapeHtml(post.category)} · ${post.readTime}</div>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${escapeHtml(description)}</p>
        ${post.isoDate ? `<p class="article-date"><time datetime="${post.isoDate}">${post.displayDate}</time></p>` : ''}
        ${post.timeline ? `<p class="article-date">${escapeHtml(post.timeline)}</p>` : ''}
        <a class="back-link" href="${post.collection.page}">← ${escapeHtml(post.collection.label)}</a>
      </header>
      <div class="article-body markdown-content">${content}</div>
    </article>
    <nav class="page-switcher" aria-label="More portfolio pages">
      <a href="${post.collection.page}"><span>BACK TO</span><strong>${escapeHtml(post.collection.label)} ↗</strong></a>
      <a href="index.html#contact"><span>KEEP THE CONVERSATION GOING</span><strong>Let’s connect ↗</strong></a>
    </nav>
  </main>
  <footer class="footer section-wrap"><a class="wordmark" href="index.html"><span> SIVA SAGAR</span></a><span>Designed with clarity. Built with care.</span><span>© <span id="year"></span> Siva Sagar Kancham</span></footer>
  <script type="module" src="src/main.js"></script>
</body>
</html>`;
};

// Folder READMEs document the editing steps; nested READMEs are publishable stories.
const readCollection = async collection => {
  const directory = path.join(root, 'content', collection.folder);
  const walk = async (dir, nested = false) => {
    const entries = (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
    const files = [];
    for (const entry of entries) {
      const filename = path.join(dir, entry.name);
      if (entry.isDirectory()) files.push(...await walk(filename, true));
      else if (entry.name.toLowerCase().endsWith('.md') && (nested || entry.name.toLowerCase() !== 'readme.md')) files.push(filename);
    }
    return files;
  };
  const posts = [];
  const slugs = new Set();
  for (const filename of await walk(directory)) {
    const { data, content } = matter(await readFile(filename, 'utf8'));
    if (data.draft === true) continue;
    const title = String(data.title || '').trim();
    const category = String(data.category || '').trim();
    if (!title || !category || (collection.folder === 'blog' && !data.date)) {
      throw new Error(`${filename}: title and category are required; writing also requires date`);
    }
    const basename = path.basename(filename, '.md');
    const slug = String(data.slug || toSlug(basename.toLowerCase() === 'readme' ? path.basename(path.dirname(filename)) : basename));
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${filename}: invalid slug`);
    if (slugs.has(slug)) throw new Error(`${filename}: duplicate ${collection.folder} slug: ${slug}`);
    slugs.add(slug);
    const excerpt = String(data.excerpt || stripMarkdown(content).slice(0, 180)).trim();
    if (!excerpt || !content.trim()) throw new Error(`${filename}: add a summary and story content`);
    if (data.stack !== undefined && (!Array.isArray(data.stack) || data.stack.some(item => typeof item !== 'string'))) throw new Error(`${filename}: stack must be a list of strings`);
    const date = data.date ? formatDate(data.date) : null;
    posts.push({
      title, category, excerpt, slug, collection,
      isoDate: date?.iso || '', displayDate: date?.display || '',
      timeline: String(data.timeline || ''), status: String(data.status || ''),
      stack: data.stack || [],
      readTime: String(data.readTime || estimateReadTime(content)),
      markdown: content, searchText: stripMarkdown(content),
      link: `${collection.folder}/${slug}/`
    });
  }
  return posts.sort((a, b) => b.isoDate.localeCompare(a.isoDate) || a.title.localeCompare(b.title));
};

const build = async () => {
  // Validate every collection before replacing the last successful build.
  const groups = await Promise.all(collections.map(async collection => ({ collection, posts: await readCollection(collection) })));
  const posts = groups.flatMap(group => group.posts);

  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const page of ['index.html', 'projects.html', 'blog.html', 'challenges.html', 'resume.html', 'robots.txt']) {
    await cp(path.join(root, page), path.join(output, page));
  }
  await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
  await cp(path.join(root, 'src'), path.join(output, 'src'), { recursive: true });

  for (const post of posts) {
    const postDirectory = path.join(output, post.collection.folder, post.slug);
    await mkdir(postDirectory, { recursive: true });
    await writeFile(path.join(postDirectory, 'index.html'), buildPostPage(post));
  }

  for (const { collection, posts: entries } of groups) {
    const index = entries.map(post => ({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      date: post.displayDate,
      timeline: post.timeline,
      status: post.status,
      stack: post.stack,
      readTime: post.readTime,
      searchText: post.searchText,
      link: post.link
    }));
    await writeFile(
      path.join(output, 'src', 'sections', collection.section, 'posts.generated.js'),
      `export const ${collection.exportName} = ${JSON.stringify(index, null, 2)};\n`
    );
  }

  const sitemapUrls = [
    `${siteUrl}/`,
    `${siteUrl}/projects.html`,
    `${siteUrl}/blog.html`,
    `${siteUrl}/challenges.html`,
    `${siteUrl}/resume.html`,
    ...posts.map(post => `${siteUrl}/${post.collection.folder}/${post.slug}/`)
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(url => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(output, 'sitemap.xml'), sitemap);

  console.log(`Built ${posts.length} stories across writing, projects and challenges into ${path.relative(root, output)}/`);
};

await build();
