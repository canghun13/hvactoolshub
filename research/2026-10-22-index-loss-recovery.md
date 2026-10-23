# 2026-10-22 — Index loss investigation and static discovery repair

## Scope and evidence

Indexing only. No cluster expansion, public URL addition, speculative bulk deletion, calculator rewrite or redesign. Start clean main `6cf256ad4c107918c1f6fa3ff0122742f7074553`, equal to fetched origin/main and actual remote. Other checkout/user work untouched.

Current source exports (read directly, not modified or committed):

- `hvactoolshub.com-Coverage-2026-10-22.zip`: all known pages, daily status July 24–October 12. This newly supplies total indexed counts, unlike prior exclusion-only weekly reports.
- `hvactoolshub.com-Coverage-Drilldown-2026-10-22.zip`: Discovered — currently not indexed, 38 URLs, same status endpoint.
- `hvactoolshub.com-Performance-on-Search-2026-10-22.zip`: Web, July 20–October 19, 92 daily rows.
- October 22 keyword/page CSVs and `보고서_개요 (1).csv`: supplementary traffic, not evidence of current Google index state.

## Actual loss timeline

| Status date | Indexed | Excluded | Known total |
|---|---:|---:|---:|
| July 24 | 45 | 31 | 76 |
| July 25 | 32 | 21 | 53 |
| August 8 | 30 | 49 | 79 |
| August 22 | 29 | 62 | 91 |
| August 29 | 27 | 64 | 91 |
| September 5 | 10 | 81 | 91 |
| September 15 | 6 | 85 | 91 |
| September 22 | 5 | 86 | 91 |
| October 12 | 5 | 86 | 91 |

The loss is real. Within the stable 91-known-URL period, indexed count fell 27→5. July's known total changes: do not describe 45→5 as 40 specifically identified pages lost from a fixed cohort. October 22 is the export date; this status chart stops October 12. It does not prove a new October 22 collapse.

| Current exclusion | Count | Export validation |
|---|---:|---|
| Crawled — currently not indexed | 43 | Started |
| Discovered — currently not indexed | 38 | Passed |
| Page with redirect | 3 | Not started |
| Excluded by noindex | 2 | Started |

“Passed” validation does not mean the 38 pages are indexed. Their `1970-01-01` crawl values are unavailable/sentinel data. The current package has no 43-row Crawled detail export, so its per-URL Google-selected canonical and crawl history are not invented. Code repair proceeded without requiring more attachments.

GSC performance: 304 impressions / 1 click in the rolling three-month window. October 13–19: 5 impressions / 0 clicks, versus October 6–12: 0/0. This does not prove reindexing or recovery. Rolling totals are not lifetime cumulative totals.

## Full production investigation before editing

- Full GETs, at most three concurrent, of all **86 maintained canonical URLs**: 200, expected self-canonical, one H1, indexable robots meta, no blocking X-Robots-Tag/challenge, and repository-matching HTML after newline normalization.
- All 25 directly referenced shared/page CSS, JS and favicon assets: 200 and repository-matching.
- Seven representative smartphone-Googlebot-UA requests also return correct content. This is not a verified request from Google's IP or proof of actual Google crawl scheduling.
- robots.txt permits crawling and names the correct sitemap. Sitemap XML and llms.txt return 200/expected MIME types. Unknown probe URL returns real 404, not a 200 error page.
- HTTP, www, and GitHub project-host samples normalize to HTTPS apex. Current responses identify GitHub Pages; no present public WAF/challenge/block reproduced. Historical availability is not established by current HTTP tests.
- Static scan: 108 HTML, 86 maintained URLs, no missing local target, duplicate maintained title/description, canonical/H1/GA4/OG/JSON-LD defect. Intentional template/consolidation noindex files outside the sitemap were not made indexable.
- Git timeline has no September 5 deployment: August 31's scoped Traverse fix precedes September 7's ACH/CFM work. The largest drop predates September 7, so that later change cannot explain its onset.

## Confirmed discovery weakness

All 86 initial Header/Footer containers were empty. Newer Home cards and 15 Heat Pump/Belt/Fume Hood pages' hub entries were created only by site.js. A breadth-first crawl from Home, following **initial-HTML anchors only**, without taking discovery links from the sitemap or executing JavaScript, reached 67/86 URLs.

Nineteen lacked that static Home path: 15 newer workflow pages plus About/Privacy/Contact/Disclaimer. Eighteen overlap the supplied 38 discovered exclusions.

This is a reproducible render-dependence problem previous target-existence scans missed. It is **not proven to be the sole cause**: Google can render JavaScript, and many crawled exclusions already have static paths. This repair is discovery hardening, not a manual-penalty diagnosis or an indexing guarantee.

## Repair and preserved boundaries

- Home and four existing hubs now include their **existing rendered** navigation, cards and hub breadcrumbs in initial HTML. Their text, card order, URLs, heading hierarchy, current-page indicators, classes and design are retained.
- Existing directory/breadcrumb CSS and body class are present before loader execution.
- site.js preserves populated navigation and skips duplicate dynamic cluster/Latest insertion on marked static entry pages; cached legacy/detail-page fallbacks remain. Already-present CSS is not appended twice.
- Only those five actually changed entry pages receive October 22 updated metadata and matching sitemap lastmod. No blanket “freshness” changes to unchanged pages.
- After repair all 86 maintained pages are reached in at most **two static link steps** from Home.
- No public URL created/deleted/merged. llms.txt reviewed and unchanged because its core URLs remain correct; it is not a Google indexing mechanism.
- No calculator logic, CSS, common Print behavior, canonical, contact email or intentional noindex redirect changed. Home's protected post-footer badges are byte-identical to baseline.

### Current 38 discovered rows

“Present” means initial-HTML discovery, not Google indexing. Exported exclusion status is retained until Google reassesses it.

| URL path | Before: Home static path | After: Home static path |
|---|---|---|
| /blog/btu-chart-guide.html | Present | Present, max 2 clicks |
| /blog/common-hvac-duct-sizing-mistakes.html | Present | Present, max 2 clicks |
| /blog/fume-hood-airflow-verification-workflow.html | JS-dependent | Present, max 2 clicks |
| /blog/heat-pump-cop-and-operating-cost.html | JS-dependent | Present, max 2 clicks |
| /blog/how-many-cfm-do-i-need-per-room.html | Present | Present, max 2 clicks |
| /blog/how-to-calculate-cfm.html | Present | Present, max 2 clicks |
| /blog/hvac-fan-belt-and-sheave-workflow.html | JS-dependent | Present, max 2 clicks |
| /blog/hvac-load-per-square-foot-guide.html | Present | Present, max 2 clicks |
| /blog/why-oversized-hvac-systems-cause-problems.html | Present | Present, max 2 clicks |
| /compare/ | Present | Present, max 2 clicks |
| /compare/btu-vs-kw.html | Present | Present, max 2 clicks |
| /compare/cfm-vs-air-changes-per-hour.html | Present | Present, max 2 clicks |
| /compare/cfm-vs-cubic-meters-per-hour.html | Present | Present, max 2 clicks |
| /compare/cooling-load-vs-heating-load.html | Present | Present, max 2 clicks |
| /compare/flexible-duct-vs-rigid-duct.html | Present | Present, max 2 clicks |
| /compare/low-velocity-vs-high-velocity-duct-systems.html | Present | Present, max 2 clicks |
| /compare/manual-j-vs-rule-of-thumb-hvac-sizing.html | Present | Present, max 2 clicks |
| /compare/residential-vs-commercial-hvac-load-calculation.html | Present | Present, max 2 clicks |
| /compare/round-duct-vs-rectangular-duct.html | Present | Present, max 2 clicks |
| /contact/ | JS-dependent | Present, max 2 clicks |
| /disclaimer/ | JS-dependent | Present, max 2 clicks |
| /privacy/ | JS-dependent | Present, max 2 clicks |
| /reference/cfm-conversion-chart.html | Present | Present, max 2 clicks |
| /reference/fan-belt-and-sheave-formulas.html | JS-dependent | Present, max 2 clicks |
| /reference/fume-hood-airflow-formulas.html | JS-dependent | Present, max 2 clicks |
| /reference/heat-pump-efficiency-ratings-reference.html | JS-dependent | Present, max 2 clicks |
| /reference/hvac-duct-size-chart.html | Present | Present, max 2 clicks |
| /tool/btu-per-square-foot-calculator.html | Present | Present, max 2 clicks |
| /tool/fan-law-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/fan-pulley-rpm-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/fume-hood-exhaust-load-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/fume-hood-face-velocity-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/fume-hood-traverse-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/heat-pump-operating-cost-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/motor-sheave-size-calculator.html | JS-dependent | Present, max 2 clicks |
| /tool/multi-fume-hood-exhaust-planner.html | JS-dependent | Present, max 2 clicks |
| /tool/rectangular-duct-size-calculator.html | Present | Present, max 2 clicks |
| /tool/v-belt-length-calculator.html | JS-dependent | Present, max 2 clicks |

## QA before deployment

- `tests/index-discovery-validation.cjs`: **317 assertions**, all maintained URLs reachable without JS, max Home depth two, complete four hub inventories, static navigation/styles and duplicate-insertion guards.
- Existing Duct 561 + Airflow 85 + Equivalent Reference 14 = **660** passing checks.
- Static scan after repair: 108 HTML, 86 maintained URLs, **1,212** local targets, 14 browser JS syntax checks, no detected error; sitemap XML/diff whitespace checked.
- Actual browser comparison against pre-change production: all five entry pages have **identical visible main text, card text/URL sequence, H2 sequence, Header and Footer**. Cards remain Home 46, Tools 30, Guides 25, Compare 13 (10 Comparisons + next-step cards), Reference 18 (12 References + next-step cards).
- Twenty local responsive checks: five entry pages × 390/768/1024/1440; one H1/navigation, stable card counts, no horizontal overflow or captured warning/error.
- CFM detail-page compatibility: default 240.00 CFM, 2,400.00 ft³, 407.76 m³/h; six primary/four footer links, one Print stylesheet, no captured warning/error.
- Initial task-owned local listener timed out; a fresh task-owned listener at another port completed QA. No user environment/security changes. Incomplete attempts are not passes.

## Remaining diagnosis and recovery acceptance

Confirmed: historical index loss, broad Google exclusion, no reproduced present blanket block, and a repaired render-dependent discovery gap.

Unconfirmed: Google's reason for each of the 43 crawled exclusions; selected canonical; historical host/robots failures; manual actions, security issues or removals; actual Google recrawl and reindexing after this change. These account-only diagnostics are not in the supplied exports. Do not claim a penalty, identify five specific currently indexed URLs by guesswork, or delete 81 useful pages blindly.

Pause expansion. Reassess existing CFM, Duct Size, HVAC Load, BTU and newer workflow pages after actual Google recrawls. If exclusion persists, inspect indexed/live HTML, selected canonical, host history and page-specific usefulness/overlap before targeted consolidation or substantive changes. Do not pad word count, invent sizing defaults, change URLs or refresh every date.

Release acceptance: pushed code, exact production-content/static-graph checks, browser regression. **Index recovery is separate:** fresh GSC status must show previously excluded maintained pages indexed with post-release crawl evidence. HTTP 200, a sitemap submission, a passed validation label or five impressions alone does not establish recovery.

No Indexing API abuse, parameter churn, mass submission, obsolete sitemap ping, sitemap rotation, robots blocking or removal of intentional legacy noindex pages.

## Official sources

- [Google: Troubleshoot crawling errors](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google: Debug traffic drops](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops)
- [Google: Technical requirements and indexing eligibility](https://developers.google.com/search/docs/essentials/technical)

## 2026-10-23 — Verified release closure

- Implementation commit `d780b46c1b4020d7d38de29487015cf2dfaaf461` was pushed. GitHub Pages build/deployment [39731943437](https://github.com/canghun13/hvactoolshub/actions/runs/39731943437) completed successfully on October 22. Resumption on October 23 found clean main/local/fetched/actual remote equality at that commit, 0/0; no intervening work was overwritten.
- Fresh October 23 production GET audit: **86/86 HTML pages and 27/27 directly referenced assets** return 200 and match the repository; expected self-canonicals/index directives preserved. Five entry pages expose the static-discovery marker and correct versioned loader. robots/sitemap/llms content matches; HTTP/www/project-host redirects and genuine 404 still pass. Seven Googlebot-UA samples pass; this remains a simulated UA check, not a verified Google-origin crawl.
- Since every public maintained document matches the checked source, the source anchor graph now also represents the published graph: **86/86 reachable without JavaScript, maximum Home depth two**. No URL added or removed.
- Public browser compares all five entry pages to the captured pre-change baseline: visible main text, cards/order, headings and navigation unchanged; no doubled cards/navigation. Fresh single-tab responsive QA on October 23 verifies **requested width equals actual innerWidth** at 390/768/1024/1440 for all five entry pages (20 checks), with one H1/navigation and no page overflow or captured warning/error. An earlier multi-tab loop that stayed at 1280 is not counted as responsive acceptance. Desktop and mobile screenshots were inspected; temporary viewport reset.
- All **977** regression assertions (317 discovery + 561 Duct + 85 Airflow + 14 reference) pass again. No further production edits needed after deployment. Protected badges, calculator formulas, Print and global CSS remain unchanged.
- This closes the confirmed code/discovery repair and deployment verification only. No fresh Search Console indexed/live inspection or post-release indexing export exists in this task. **Google index recovery is not yet verified; no indexing request or account-only diagnostic is claimed.** Keep the remaining diagnosis/acceptance conditions above; do not resume expansion or report all excluded pages recovered.
- Final documentation commit is pushed separately; its exact local/fetched/actual remote equality and clean status are verified before the final response.
