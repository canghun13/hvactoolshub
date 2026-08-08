(() => {
  const addStyle = href => {
    const element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = href;
    document.head.append(element);
  };
  const addScript = src => {
    const element = document.createElement('script');
    element.src = src;
    element.defer = true;
    document.head.append(element);
  };
  const path = location.pathname.replace(/index\.html$/, '');
  const folders = { tool: ['Tools', '/tool/'], blog: ['Guides', '/blog/'], compare: ['Compare', '/compare/'], reference: ['Reference', '/reference/'] };
  const kind = Object.keys(folders).find(key => path.startsWith(`/${key}/`));

  if (kind && !document.querySelector('.breadcrumb')) {
    const title = document.querySelector('h1')?.textContent.trim() || document.title;
    const [label, href] = folders[kind];
    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.setAttribute('aria-label', 'Breadcrumb');
    breadcrumb.innerHTML = `<ol class="container"><li><a href="/">Home</a></li><li><a href="${href}">${label}</a></li><li aria-current="page">${title}</li></ol>`;
    document.querySelector('main')?.before(breadcrumb);
  }
  if (document.querySelector('.breadcrumb')) addStyle('/assets/css/breadcrumb.css');
  if (document.querySelector('.prose')) {
    addStyle('/assets/css/content-polish.css');
    addScript('/assets/js/source-polish.js');
  }
  if (document.querySelector('.static-page')) addStyle('/assets/css/site-pages.css');
  if (document.querySelector('.calculator-card form')) addScript('/assets/js/tool-polish.js?v=20260720-psychro-ui');
  if (['/tool/', '/blog/', '/compare/', '/reference/'].includes(path)) {
    document.body.classList.add('directory-page');
    addStyle('/assets/css/directory.css');
  }
  const description = document.querySelector('meta[name="description"]')?.content;
  if (description && !document.querySelector('meta[property="og:description"]')) {
    const element = document.createElement('meta');
    element.setAttribute('property', 'og:description');
    element.content = description;
    document.head.append(element);
  }
  if (kind && !document.querySelector('script[type="application/ld+json"]')) {
    const title = document.querySelector('h1')?.textContent.trim() || document.title;
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': kind === 'blog' ? 'Article' : kind === 'tool' ? 'WebApplication' : 'WebPage', name: title, url: `https://hvactoolshub.com${path}` });
    document.head.append(schema);
  }

  const links = [['Tools', '/tool/'], ['Guides', '/blog/'], ['Compare', '/compare/'], ['Reference', '/reference/'], ['About', '/about/'], ['Contact', '/contact/']];
  const footerLinks = [['About', '/about/'], ['Privacy Policy', '/privacy/'], ['Contact', '/contact/'], ['Disclaimer', '/disclaimer/']];
  const makeLinks = items => items.map(([text, href]) => `<a href="${href}"${path === href ? ' aria-current="page"' : ''}>${text}</a>`).join('');
  const header = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  if (header) header.innerHTML = `<div class="container header-inner"><a class="brand" href="/" aria-label="HVAC Tools Hub home">HVAC Tools Hub</a><nav class="site-nav" aria-label="Primary navigation">${makeLinks(links)}</nav></div>`;
  if (footer) footer.innerHTML = `<div class="container footer-inner"><div><p class="footer-brand">HVAC Tools Hub</p><p class="footer-copy">Practical HVAC engineering resources.</p></div><nav class="footer-nav" aria-label="Footer navigation">${makeLinks(footerLinks)}</nav><p class="footer-copy">&copy; ${new Date().getFullYear()} HVAC Tools Hub</p></div>`;

  const clusterCards = {
    '/tool/': { eyebrow: 'Heat pump efficiency', title: 'Operating-cost scenarios', description: 'Translate a documented thermal load and matched COP into electricity use and cost.', card: '<a class="resource-card" href="/tool/heat-pump-operating-cost-calculator.html"><span>HEAT PUMP</span><h3>Heat Pump Operating Cost</h3><p>Estimate electricity use, cost, and heating comparison from stated inputs.</p></a>' },
    '/blog/': { eyebrow: 'Heat pump efficiency', title: 'Connect load, COP, and cost', description: 'Use point efficiency and a local electricity rate without confusing them with seasonal ratings.', card: '<a class="resource-card" href="/blog/heat-pump-cop-and-operating-cost.html"><span>HEAT PUMP</span><h3>Heat Pump COP and Operating Cost</h3><p>Use a matched operating condition to estimate energy and cost.</p></a>' },
    '/reference/': { eyebrow: 'Heat pump efficiency', title: 'Efficiency rating context', description: 'Check which metric belongs to a point condition and which belongs to seasonal equipment comparison.', card: '<a class="resource-card" href="/reference/heat-pump-efficiency-ratings-reference.html"><span>HEAT PUMP</span><h3>Heat Pump Efficiency Ratings</h3><p>Reference COP, EER, SEER2, and HSPF2 definitions and use limits.</p></a>' }
  };
  const cluster = clusterCards[path];
  if (cluster) {
    const section = document.createElement('section');
    section.className = 'section';
    section.dataset.heatPumpCluster = '';
    section.innerHTML = `<div class="container"><div class="home-section-heading"><div><p class="eyebrow">${cluster.eyebrow}</p><h2>${cluster.title}</h2></div><p>${cluster.description}</p></div><div class="resource-grid">${cluster.card}</div></div>`;
    document.querySelector('main')?.append(section);
  }

  if (path === '/') {
    const latest = document.querySelector('.home-latest .resource-grid');
    if (latest) latest.insertAdjacentHTML('afterbegin', '<a class="resource-card" href="/tool/heat-pump-operating-cost-calculator.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Operating Cost</h3><p>Estimate electricity use and cost from a stated load and COP.</p></a><a class="resource-card" href="/blog/heat-pump-cop-and-operating-cost.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump COP and Cost</h3><p>Use point efficiency without confusing seasonal ratings.</p></a><a class="resource-card" href="/reference/heat-pump-efficiency-ratings-reference.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Efficiency Ratings</h3><p>Reference COP, EER, SEER2, and HSPF2.</p></a>');
    const section = document.createElement('section');
    section.className = 'section home-latest';
    section.innerHTML = '<div class="container"><div class="home-section-heading"><div><p class="eyebrow">Heat pump efficiency</p><h2>Load to operating cost</h2></div><p>Use a known thermal load and matched point COP to understand electricity use and a narrow cost scenario.</p></div><div class="resource-grid"><a class="resource-card" href="/tool/heat-pump-operating-cost-calculator.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Operating Cost</h3><p>Estimate electricity use and cost from a stated load and COP.</p></a><a class="resource-card" href="/blog/heat-pump-cop-and-operating-cost.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump COP and Cost</h3><p>Understand the point-condition calculation and limits.</p></a><a class="resource-card" href="/reference/heat-pump-efficiency-ratings-reference.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Efficiency Ratings</h3><p>Check COP, EER, SEER2, and HSPF2 use limits.</p></a></div></div>';
    document.querySelector('.home-cta')?.before(section);
  }

  const existingLinks = {
    '/tool/hvac-load-calculator.html': ['/tool/heat-pump-operating-cost-calculator.html', 'Heat Pump Operating Cost Calculator'],
    '/compare/btu-vs-kw.html': ['/reference/heat-pump-efficiency-ratings-reference.html', 'Heat Pump Efficiency Ratings Reference']
  };
  const related = existingLinks[path];
  if (related) {
    const heading = [...document.querySelectorAll('.prose h2')].find(element => element.textContent.trim() === 'Related resources');
    const list = heading?.nextElementSibling;
    if (list?.tagName === 'UL') list.insertAdjacentHTML('beforeend', `<li><a href="${related[0]}">${related[1]}</a></li>`);
  }
})();
