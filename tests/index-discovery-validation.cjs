// Crawl the published HTML graph without running JavaScript or consulting the
// sitemap for discovery. The sitemap supplies only the expected inventory.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const origin = 'https://hvactoolshub.com';
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const read = url => fs.readFileSync(path.join(root, new URL(url).pathname.replace(/\/$/, '/index.html')), 'utf8');
const links = (html, base) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].flatMap(m => {
  try {const url = new URL(m[1], base); url.hash = ''; url.search = ''; return url.origin === origin ? [url.href.replace(/index\.html$/, '')] : [];} catch {return [];}
});
let checks = 0;
const check = (condition, message) => {assert.ok(condition, message); checks++;};
const pages = new Map(urls.map(url => [url, read(url)]));
const distances = new Map([[origin + '/', 0]]), queue = [origin + '/'];
while (queue.length) {
  const current = queue.shift();
  for (const href of links(pages.get(current), current)) {
    if (pages.has(href) && !distances.has(href)) {distances.set(href, distances.get(current) + 1); queue.push(href);}
  }
}
for (const url of urls) {
  check(distances.has(url), 'Unreachable without JavaScript: ' + url);
  check(distances.get(url) <= 2, 'More than two links from Home: ' + url);
}
const site = fs.readFileSync(path.join(root, 'assets/js/site.js'), 'utf8');
for (const route of ['/', '/tool/', '/blog/', '/compare/', '/reference/']) {
  const html = pages.get(origin + route);
  check(/<main\b[^>]*data-static-discovery/.test(html), route + ' missing static-discovery marker');
  const header = html.match(/<header\b[^>]*data-site-header[^>]*>([\s\S]*?)<\/header>/)?.[1] || '';
  const footer = html.match(/<footer\b[^>]*data-site-footer[^>]*>([\s\S]*?)<\/footer>/)?.[1] || '';
  for (const href of ['/tool/', '/blog/', '/compare/', '/reference/', '/about/', '/contact/']) check(header.includes(`href="${href}"`), route + ' missing static primary link ' + href);
  for (const href of ['/about/', '/privacy/', '/contact/', '/disclaimer/']) check(footer.includes(`href="${href}"`), route + ' missing static footer link ' + href);
  if (route !== '/') {
    const categoryUrls = urls.filter(u => u.startsWith(origin + route) && u !== origin + route);
    const targets = links(html, origin + route);
    for (const url of categoryUrls) check(targets.includes(url), route + ' category omits ' + url);
    check(html.includes('href="/assets/css/directory.css"'), route + ' missing static directory stylesheet');
    check(html.includes('href="/assets/css/breadcrumb.css"'), route + ' missing static breadcrumb stylesheet');
  }
  // With static HTML present, the loader must not append duplicate directories,
  // Latest cards, headers, or footers. Calculator hooks are not exercised here.
  const writes = [];
  const navigation = {children:[{}], set innerHTML(value) {writes.push(value);}};
  const document = {
    querySelector(selector) {
      if (selector === 'main[data-static-discovery]') return {};
      if (selector === '[data-site-header]' || selector === '[data-site-footer]') return navigation;
      if (selector === '.breadcrumb') return route === '/' ? null : {};
      if (selector.startsWith('link[rel="stylesheet"]')) return {};
      if (selector === 'script[type="application/ld+json"]') return {};
      if (selector === 'main' || selector === '.home-cta') return {append:e => writes.push(e), before:e => writes.push(e)};
      if (selector.includes('resource-grid')) return {insertAdjacentHTML:(_p, value) => writes.push(value)};
      return null;
    },
    querySelectorAll: () => [], createElement: tag => ({tag, dataset:{}, setAttribute() {}}),
    body:{classList:{add() {}}}, head:{append() {}}
  };
  vm.runInNewContext(site, {document, location:{pathname:route}, Date}, {timeout:1000});
  check(writes.length === 0, route + ' loader duplicates static content');
}
console.log(JSON.stringify({checks, maintainedUrls:urls.length, reachableWithoutJavaScript:distances.size, maximumHomeDepth:Math.max(...distances.values()), result:'PASS'}, null, 2));
