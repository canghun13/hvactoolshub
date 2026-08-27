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
    addScript('/assets/js/source-polish.js?v=20260827-source');
  }
  if (document.querySelector('.static-page')) addStyle('/assets/css/site-pages.css');
  if (document.querySelector('.calculator-card form')) {
    addStyle('/assets/css/print-tools.css?v=20260813-print');
    addScript('/assets/js/tool-polish.js?v=20260827-fume');
  }
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

  const beltDriveClusters = {
    '/tool/': {
      eyebrow: 'Belt-drive fan service',
      title: 'RPM, sheave, belt, and fan-law checks',
      description: 'Move from measured drive geometry to fan-speed and performance consequences without skipping equipment limits.',
      cards: '<a class="resource-card" href="/tool/fan-pulley-rpm-calculator.html"><span>FAN DRIVE</span><h3>Fan Pulley RPM</h3><p>Calculate driven fan RPM from motor speed and pitch diameters.</p></a><a class="resource-card" href="/tool/motor-sheave-size-calculator.html"><span>FAN DRIVE</span><h3>Motor Sheave Size</h3><p>Screen a driver pitch diameter for a supported target fan speed.</p></a><a class="resource-card" href="/tool/v-belt-length-calculator.html"><span>FAN DRIVE</span><h3>V-Belt Length</h3><p>Estimate open-drive pitch length and wrap angles.</p></a><a class="resource-card" href="/tool/fan-law-calculator.html"><span>FAN DRIVE</span><h3>Fan Law Calculator</h3><p>Estimate same-system airflow, pressure, and brake-power changes.</p></a>'
    },
    '/blog/': {
      eyebrow: 'Belt-drive fan service',
      title: 'Follow the complete sheave-adjustment workflow',
      description: 'Connect current RPM, target drive geometry, belt selection, and motor-load consequences.',
      cards: '<a class="resource-card" href="/blog/hvac-fan-belt-and-sheave-workflow.html"><span>FAN DRIVE</span><h3>Fan Belt and Sheave Workflow</h3><p>Use a measured sequence before and after a belt-drive adjustment.</p></a>'
    },
    '/reference/': {
      eyebrow: 'Belt-drive fan service',
      title: 'Fan-drive formulas and factors',
      description: 'Reference speed ratio, pitch length, wrap angle, belt speed, and fan-law scaling.',
      cards: '<a class="resource-card" href="/reference/fan-belt-and-sheave-formulas.html"><span>FAN DRIVE</span><h3>Fan Belt and Sheave Formulas</h3><p>Use field formulas with unit rules, examples, and manufacturer-data limits.</p></a>'
    }
  };
  const beltDriveCluster = beltDriveClusters[path];
  if (beltDriveCluster) {
    const section = document.createElement('section');
    section.className = 'section';
    section.dataset.beltDriveCluster = '';
    section.innerHTML = `<div class="container"><div class="home-section-heading"><div><p class="eyebrow">${beltDriveCluster.eyebrow}</p><h2>${beltDriveCluster.title}</h2></div><p>${beltDriveCluster.description}</p></div><div class="resource-grid">${beltDriveCluster.cards}</div></div>`;
    document.querySelector('main')?.append(section);
  }

  const fumeHoodClusters = {
    '/tool/': {
      eyebrow: 'Laboratory fume hood workflow',
      title: 'Measure, summarize, plan, and load',
      description: 'Keep opening-average velocity, traverse distribution, multi-hood exhaust, and conditioned-air load as separate documented decisions.',
      cards: '<a class="resource-card" href="/tool/fume-hood-face-velocity-calculator.html"><span>LAB EXHAUST</span><h3>Fume Hood Face Velocity</h3><p>Calculate opening-average velocity from airflow and clear sash area.</p></a><a class="resource-card" href="/tool/fume-hood-traverse-calculator.html"><span>LAB EXHAUST</span><h3>Fume Hood Traverse</h3><p>Summarize equal-area velocity readings without inventing pass/fail criteria.</p></a><a class="resource-card" href="/tool/multi-fume-hood-exhaust-planner.html"><span>LAB EXHAUST</span><h3>Multi-Hood Exhaust Planner</h3><p>Compare connected flow with a documented active and standby scenario.</p></a><a class="resource-card" href="/tool/fume-hood-exhaust-load-calculator.html"><span>LAB EXHAUST</span><h3>Fume Hood Exhaust Load</h3><p>Estimate thermal conditioning load from airflow and moist-air enthalpy difference.</p></a>'
    },
    '/blog/': {
      eyebrow: 'Laboratory fume hood workflow',
      title: 'Keep airflow checks inside the test boundary',
      description: 'Follow the sequence from documented sash position and traverse readings through system airflow and conditioned-exhaust load.',
      cards: '<a class="resource-card" href="/blog/fume-hood-airflow-verification-workflow.html"><span>LAB EXHAUST</span><h3>Fume Hood Airflow Verification</h3><p>Connect field measurements, containment boundaries, multi-hood operation, and energy.</p></a>'
    },
    '/reference/': {
      eyebrow: 'Laboratory fume hood workflow',
      title: 'Airflow formulas and test records',
      description: 'Use explicit equations, conversions, examples, and field record requirements without prescribing a universal target.',
      cards: '<a class="resource-card" href="/reference/fume-hood-airflow-formulas.html"><span>LAB EXHAUST</span><h3>Fume Hood Airflow Formulas</h3><p>Reference face, traverse, scenario, and thermal-load equations with scope limits.</p></a>'
    }
  };
  const fumeHoodCluster = fumeHoodClusters[path];
  if (fumeHoodCluster) {
    const section = document.createElement('section');
    section.className = 'section';
    section.dataset.fumeHoodCluster = '';
    section.innerHTML = `<div class="container"><div class="home-section-heading"><div><p class="eyebrow">${fumeHoodCluster.eyebrow}</p><h2>${fumeHoodCluster.title}</h2></div><p>${fumeHoodCluster.description}</p></div><div class="resource-grid">${fumeHoodCluster.cards}</div></div>`;
    document.querySelector('main')?.append(section);
  }

  if (path === '/') {
    const latest = document.querySelector('.home-latest .resource-grid');
    if (latest) latest.insertAdjacentHTML('afterbegin', '<a class="resource-card" href="/tool/fan-law-calculator.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>Fan Law Calculator</h3><p>Estimate same-system CFM, pressure, and brake-power changes from RPM.</p></a><a class="resource-card" href="/tool/fan-pulley-rpm-calculator.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>Fan Pulley RPM</h3><p>Calculate driven speed from motor RPM and sheave pitch diameters.</p></a><a class="resource-card" href="/blog/hvac-fan-belt-and-sheave-workflow.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>Fan Belt and Sheave Workflow</h3><p>Connect speed ratio, belt geometry, and motor-load checks.</p></a><a class="resource-card" href="/tool/heat-pump-operating-cost-calculator.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Operating Cost</h3><p>Estimate electricity use and cost from a stated load and COP.</p></a><a class="resource-card" href="/blog/heat-pump-cop-and-operating-cost.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump COP and Cost</h3><p>Use point efficiency without confusing seasonal ratings.</p></a><a class="resource-card" href="/reference/heat-pump-efficiency-ratings-reference.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Efficiency Ratings</h3><p>Reference COP, EER, SEER2, and HSPF2.</p></a>');
    const section = document.createElement('section');
    section.className = 'section home-latest';
    section.innerHTML = '<div class="container"><div class="home-section-heading"><div><p class="eyebrow">Heat pump efficiency</p><h2>Load to operating cost</h2></div><p>Use a known thermal load and matched point COP to understand electricity use and a narrow cost scenario.</p></div><div class="resource-grid"><a class="resource-card" href="/tool/heat-pump-operating-cost-calculator.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Operating Cost</h3><p>Estimate electricity use and cost from a stated load and COP.</p></a><a class="resource-card" href="/blog/heat-pump-cop-and-operating-cost.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump COP and Cost</h3><p>Understand the point-condition calculation and limits.</p></a><a class="resource-card" href="/reference/heat-pump-efficiency-ratings-reference.html" data-updated-date="2026-08-08"><span>2026-08-08</span><h3>Heat Pump Efficiency Ratings</h3><p>Check COP, EER, SEER2, and HSPF2 use limits.</p></a></div></div>';
    document.querySelector('.home-cta')?.before(section);

    const beltSection = document.createElement('section');
    beltSection.className = 'section home-latest';
    beltSection.innerHTML = '<div class="container"><div class="home-section-heading"><div><p class="eyebrow">Belt-drive fan service</p><h2>From sheave ratio to fan performance</h2></div><p>Check fan RPM, target driver size, belt geometry, and the power consequence of a speed change.</p></div><div class="resource-grid"><a class="resource-card" href="/tool/fan-pulley-rpm-calculator.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>Fan Pulley RPM</h3><p>Verify theoretical driven fan speed.</p></a><a class="resource-card" href="/tool/motor-sheave-size-calculator.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>Motor Sheave Size</h3><p>Screen a driver pitch diameter for target RPM.</p></a><a class="resource-card" href="/tool/v-belt-length-calculator.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>V-Belt Length</h3><p>Estimate pitch length and wrap angle.</p></a><a class="resource-card" href="/tool/fan-law-calculator.html" data-updated-date="2026-08-24"><span>2026-08-24</span><h3>Fan Law Calculator</h3><p>Predict airflow, pressure, and brake-power scaling.</p></a></div></div>';
    document.querySelector('.home-cta')?.before(beltSection);

    if (latest) latest.insertAdjacentHTML('afterbegin', '<a class="resource-card" href="/tool/fume-hood-traverse-calculator.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Fume Hood Traverse</h3><p>Summarize equal-area face-velocity measurements.</p></a><a class="resource-card" href="/tool/fume-hood-exhaust-load-calculator.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Fume Hood Exhaust Load</h3><p>Estimate conditioned-exhaust thermal load from documented air states.</p></a><a class="resource-card" href="/blog/fume-hood-airflow-verification-workflow.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Fume Hood Airflow Verification</h3><p>Keep measurement, containment, system flow, and load decisions separate.</p></a>');
    const fumeSection = document.createElement('section');
    fumeSection.className = 'section home-latest';
    fumeSection.innerHTML = '<div class="container"><div class="home-section-heading"><div><p class="eyebrow">Laboratory fume hood workflow</p><h2>From sash opening to exhaust load</h2></div><p>Document measured velocity, equal-area distribution, active and standby airflow, and the thermal consequence without assigning an unsupported safety threshold.</p></div><div class="resource-grid"><a class="resource-card" href="/tool/fume-hood-face-velocity-calculator.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Face Velocity</h3><p>Calculate opening-average velocity.</p></a><a class="resource-card" href="/tool/fume-hood-traverse-calculator.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Traverse Summary</h3><p>Summarize point readings and distribution.</p></a><a class="resource-card" href="/tool/multi-fume-hood-exhaust-planner.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Multi-Hood Scenario</h3><p>Compare connected, active, and standby exhaust.</p></a><a class="resource-card" href="/tool/fume-hood-exhaust-load-calculator.html" data-updated-date="2026-08-27"><span>2026-08-27</span><h3>Exhaust Thermal Load</h3><p>Translate airflow and enthalpy difference into load.</p></a></div></div>';
    document.querySelector('.home-cta')?.before(fumeSection);
  }

  const existingLinks = {
    '/tool/hvac-load-calculator.html': ['/tool/heat-pump-operating-cost-calculator.html', 'Heat Pump Operating Cost Calculator'],
    '/compare/btu-vs-kw.html': ['/reference/heat-pump-efficiency-ratings-reference.html', 'Heat Pump Efficiency Ratings Reference'],
    '/tool/duct-velocity-calculator.html': ['/tool/fan-law-calculator.html', 'Fan Law Calculator'],
    '/tool/cfm-calculator.html': ['/tool/fan-pulley-rpm-calculator.html', 'Fan Pulley RPM Calculator']
  };
  const related = existingLinks[path];
  if (related) {
    const heading = [...document.querySelectorAll('.prose h2')].find(element => element.textContent.trim() === 'Related resources');
    const list = heading?.nextElementSibling;
    if (list?.tagName === 'UL') list.insertAdjacentHTML('beforeend', `<li><a href="${related[0]}">${related[1]}</a></li>`);
  }

  const fumeHoodLinks = {
    '/tool/duct-velocity-calculator.html': ['/tool/fume-hood-face-velocity-calculator.html', 'Fume Hood Face Velocity Calculator'],
    '/tool/psychrometric-calculator.html': ['/tool/fume-hood-exhaust-load-calculator.html', 'Fume Hood Exhaust Load Calculator'],
    '/tool/hvac-load-calculator.html': ['/tool/fume-hood-exhaust-load-calculator.html', 'Fume Hood Exhaust Load Calculator'],
    '/blog/hvac-psychrometrics-explained.html': ['/blog/fume-hood-airflow-verification-workflow.html', 'Fume Hood Airflow Verification Workflow'],
    '/reference/hvac-airflow-reference-table.html': ['/reference/fume-hood-airflow-formulas.html', 'Fume Hood Airflow Formulas']
  };
  const fumeHoodLink = fumeHoodLinks[path];
  if (fumeHoodLink) {
    const headings = [...document.querySelectorAll('.prose h2')];
    const heading = headings.find(element => /Related (?:resources|tools|calculators|articles)/i.test(element.textContent.trim()));
    const list = heading?.nextElementSibling;
    if (list?.tagName === 'UL') list.insertAdjacentHTML('beforeend', `<li><a href="${fumeHoodLink[0]}">${fumeHoodLink[1]}</a></li>`);
  }

  document.querySelectorAll('form[data-belt-drive]').forEach(form => {
    form.addEventListener('input', () => {
      if (form.checkValidity()) return;
      form.querySelectorAll('[data-result]').forEach(result => { result.value = ''; });
      const note = form.querySelector('[data-note]');
      if (note) note.textContent = 'Enter positive values within the displayed input ranges.';
    });
  });
})();
