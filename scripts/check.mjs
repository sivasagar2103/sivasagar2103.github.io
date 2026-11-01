import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve('dist');
const walk = async dir => (await Promise.all((await readdir(dir, { withFileTypes: true })).map(item => item.isDirectory() ? walk(path.join(dir, item.name)) : path.join(dir, item.name)))).flat();
const files = await walk(root);
let links = 0;
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  assert.doesNotMatch(html, /resources.html|index.html#challenges/);
  assert.match(html, /<main id="main-content"/);
  assert.doesNotMatch(html, /class="mark"|download>Resume|Download resume/);
  const base = html.includes('<base href="../../"') ? root : path.dirname(file);
  for (const [, url] of html.matchAll(/(?:href|src|data)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const [pathname, fragment] = url.split('#');
    const target = path.resolve(base, pathname || path.basename(file));
    const info = await stat(target);
    const resolved = info.isDirectory() ? path.join(target, 'index.html') : target;
    if (fragment && resolved.endsWith('.html')) assert.ok((await readFile(resolved, 'utf8')).includes(`id="${fragment}"`), `${url} in ${file}`);
    links++;
  }
}
const { searchEntries } = await import(pathToFileURL(path.join(root, 'src/search.js')));
for (const category of ['Challenge', 'Project', 'Writing', 'Experience', 'Toolkit', 'Contact']) {
  assert.ok(searchEntries.some(entry => entry.category === category), `${category}: search entry exists`);
}
assert.ok(!files.some(file => file.endsWith('/assistant.js')));
assert.doesNotMatch(await readFile(path.join(root, 'src/main.js'), 'utf8'), /initAssistant|assistant.js/);
assert.match(await readFile(path.join(root, 'sitemap.xml'), 'utf8'), /resume.html/);

for (const [section, exportName] of [['projects', 'projects'], ['challenges', 'challenges'], ['writing', 'blogs']]) {
  const entries = (await import(pathToFileURL(path.join(root, 'src/sections', section, 'posts.generated.js'))))[exportName];
  assert.ok(entries.length, `${section}: migrated content exists`);
  for (const entry of entries) {
    const page = await readFile(path.join(root, entry.link, 'index.html'), 'utf8');
    assert.ok(page.includes(entry.title), `${section}: story page`);
    assert.ok(entry.searchText.length > entry.excerpt.length, `${section}: full text searchable`);
  }
}
assert.ok(!files.some(file => file.endsWith('/resources.html')));
console.log(`Passed: ${links} local links/assets, HTML anchors, resume routes, portfolio search, sitemap.`);
