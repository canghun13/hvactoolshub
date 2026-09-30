# Weekly growth decision — 2026-09-30

## Repository and continuity

- Initial local/cached main: `d4e9954ac28e60a9fb66aa9b1e43643eef52679b`.
- Actual remote main: `2558a34bea2c146e258c285ac69b0b948f91b2cb`. Clean checkout was safely fast-forwarded (ahead 0 / behind 1 → 0 / 0). No reset, deletion, installation, or global Git configuration change.
- A separate older checkout contains uncommitted Belt-Drive work. It was not edited; its completed equivalents are already in remote history.
- Read the full handover and recent Belt-Drive, Fume Hood, ACH/CFM, Duct Area, Print, Psychrometrics, and prior discovery decisions. Existing integrated/redirect structures remain intentional.

## Attachment provenance

Only the six files explicitly attached to this request were analyzed. ZIP CSVs were read directly without overwriting source files.

| Attachment | Source/period available in export |
| --- | --- |
| `hvactoolshub.com-Performance-on-Search-2026-09-30.zip` | GSC Web, last-three-month export; daily rows 2026-07-15–2026-09-27 |
| `hvactoolshub.com-Coverage-Drilldown-2026-09-30 (1).zip` | GSC Discovered — currently not indexed; chart 2026-07-24–2026-09-21 |
| `hvactoolshub.com-Coverage-Drilldown-2026-09-30.zip` | GSC Crawled — currently not indexed; same chart period |
| `보고서_개요.csv` | GA4 overview, 2026-09-02–2026-09-29 |
| `hvactoolshub.com_PageTrafficReport_2026. 9. 30..csv` | Supplementary page-search report; engine and measurement period not stated in file |
| `hvactoolshub.com_KeywordReport_2026. 9. 30..csv` | Supplementary keyword-search report; engine and measurement period not stated in file |

The supplementary query file contains embedded unescaped inch quotes. Numeric fields were parsed from the right; all 151 data rows were retained. Supplementary impressions are not added to GSC impressions. No search-volume or paid keyword data was invented.

## Weekly metrics

- GSC: **1 click, 317 impressions, 0.3155% CTR, approximately 60.48 impression-weighted average position**. Position is computed from rounded daily export positions, not claimed to be an unrounded UI total.
- Latest seven available days (Sep 21–27): **2 impressions, 0 clicks**. Previous seven (Sep 14–20): **0 impressions, 0 clicks**. No percentage growth is calculated against zero.
- GSC query diversity: **192 exported query rows**; 42 page rows. This is export diversity, not evidence of 192 recent new queries.
- Leading query rows: `what is btu` (7 impressions, 38.57), `cfm calculator` (7, 88.71), `m3/hr to cfm` (3, 35.33), `what is superheat and subcooling` (3, 49.33). Small sample and historical impressions limit inference.
- Leading page rows: What Is BTU (51), CFM Calculator (39), m³/h → CFM (31), ACH Calculator (22), Superheat/Subcooling Guide (19), Tons → BTU (19). Home accounts for the one click, with 13 impressions.
- Indexing exports at Sep 21: discovered-not-indexed **38**, crawled-not-indexed **42**. Discovered was unchanged from Sep 14; crawled rose from 38 to 42. Export date Sep 30 is not the status date. `1970-01-01` in discovered last-crawl rows is treated as an unavailable/sentinel value, not an actual crawl date.
- Supplementary page report: **32 rows, 222 impressions, 1 click**. Top rows: What Is BTU 29, What Is CFM 27, Duct Area 24, Fan Pulley RPM 20 (1 click), BTU Conversion Reference 14, ACH Guide 13.
- Supplementary keyword report: **151 rows, 197 impressions, 1 click**. `btu lookup table` leads with 13 impressions / 2.08 average position. These counts have a different export population from the page report and are not required to reconcile.
- GA4: **66 active users, 62 new users**, about 60.02 seconds mean engagement, 330 events. First-user direct 54; session direct 55. Google organic has no visible row in this overview; absence is not proof of zero organic visits.
- Referrals worth observing: KittyLaunch 3 first users and Twelve.Tools 1; ChatGPT 2 first users / 4 sessions and Copilot 1 / 1 are AI referral signals, not Google organic. No per-source engagement/conversion evidence is available to certify their quality.
- QA/direct contamination remains possible. Recently tested pages such as the ACH Guide and calculators have pageviews, but those views do not establish search demand. No bot or location identity is inferred.

## Week-over-week limitations

The daily GSC and indexing charts support the same-source seven-day comparisons above. There is no prior matching GA4 or supplementary export in this request, and no dated query/page breakdown by week. Query growth, page rank movement, and organic movement are therefore unavailable. The older handover's 308/315 impression observations are differently dated summaries, not matching weekly baselines.

## Technical decision and reproduction

**Final decision: FIX — technical defect corrected.**

- Target: `/tool/air-changes-per-hour-calculator.html` on production.
- Healthy control: `/tool/cfm-calculator.html` (enhanced implementation).
- Reproduction before change: keep 20 × 15 × 8 ft, enter `1e308` CFM. Live output displays **`∞ ACH`**. Large finite dimensions can also overflow the room-volume intermediate and produce a misleading zero result. A value below HTML `min="0.000001"` was accepted by the live calculation even though native submission rejects it.
- Healthy control rejects `1e308` ACH and clears all three results.
- Root cause: `bindLegacyAirflow` checked only whether individual numbers were finite and positive. It did not apply HTML input validity or validate intermediate room volume and the final result. Finite inputs can still overflow during arithmetic.
- Affected maintained modes: ACH, CFM per square foot, CFM → m³/h, and m³/h → CFM share this validation path. The enhanced CFM path is unchanged. Intentional noindex legacy room/airflow redirects are not republished.
- Fix: apply existing native constraints, require positive finite room volume where used, and require a positive finite calculated result before formatting. On failure, clear stale output and report the unsupported calculation. No arbitrary design limit, coefficient, preset, or new formula is introduced.

## Existing growth and expansion decision

Priority A closes this week's decision tree. Existing search candidates were not advanced or given invented opportunity scores. The current converter, BTU lookup, and CFM-definition signals remain observations, not a claim that their already-maintained content has a new demonstrated gap.

**Expansion considered for implementation: No.** The confirmed calculation defect takes priority under the request. Prior exclusion sets were reviewed; no renamed candidate, fake 40-family exploration, new cluster, or thin page is claimed. Recent ACH/CFM, Duct Area, and adjustable-sheave upgrades are not reworked without new evidence.

## Changes and source boundaries

- Four existing Tool HTML files: cache-versioned Airflow script and updated/dateModified date 2026-09-30. Titles, H1s, descriptions, canonicals, formulas, units, and roles unchanged.
- `assets/js/airflow.js`: legacy validation guards only.
- `tests/airflow-validation.cjs`: dependency-free regression checks across four maintained modes.
- `assets/js/site.js`: add only the four maintained calculators to Homepage Latest at the current update date; no hub redesign.
- `index.html`: cache-version the shared loader so the Latest update is requested. Protected post-footer badge markup is identical to the starting commit.
- No new public URL, CSS, Header/Footer, calculator layout, generator, contact-email, sitemap inventory, robots, or llms inventory change.
- Technical references: [MDN Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite), [HTML number input constraints](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number), and [NIST SP 811 conversion factors](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9). Existing conversion factors and HVAC scope remain unchanged; these references support numeric handling and conversion context, not sizing recommendations.

## Local QA

- Before-fix unit test failed on below-minimum input; after fix **85 assertions passed**. Fixtures include 6 ACH, 0.8 CFM/ft², 169.9 m³/h, and reciprocal 100 CFM. Overflow, blank/zero/negative/NaN/Infinity, below-minimum, and Reset cases are covered.
- Browser: all four affected calculators pass normal calculation, empty/zero/negative/below-minimum clearing, Reset, Copy with correct units, and invalid Copy/Print blocking.
- Shared Print live-document data checked for all four with a **local-only window.print hook**, preserving live inputs, results, units, URL, and scope while avoiding the OS dialog. A real Print click opened the native print path; native printer/PDF rendering was not inspected. Print code/CSS are unchanged, and static print rules still hide controls/navigation.
- Six requested viewport overrides: **390, 768, 900, 1024, 1280, 1440**. Four affected Tools, healthy CFM control, and Home passed: zero document overflow, controls contained, Header/Footer and one H1 present. The browser's scrollbar takes 15 px from client width; requested viewport widths were not confused with content width.
- Healthy CFM US/SI round-trip remains 240.00 CFM / 2,400.00 ft³ / 407.76 m³/h and 407.76 m³/h / 67.96 m³ / 240.00 CFM.
- Latest: four current cards appear first, links resolve, displayed dates match their Tool dates, descending date order retained. Badge remains present.
- Static: 108 HTML files, 86 maintained sitemap URLs (30 Tools, 25 Guides, 10 Comparisons, 12 References, 4 hubs, Home, 4 information pages); 1,099 local href/src targets checked with zero missing targets. Unique maintained titles/descriptions, self-canonicals, one H1, GA4, OG, indexability, and JSON-LD checks passed. Fourteen JS files pass syntax. XML parsing and diff whitespace checks passed. llms has no URL outside sitemap. Robots allows crawling and names the canonical sitemap.

## Deployment

- Implementation: `e1fb9b5b35186fc62a2f647cfcd779704fcd8d64`, pushed successfully to main. After push, local HEAD, fetched origin/main, and actual `git ls-remote` main all matched this SHA.
- GitHub Pages production verification completed Sep 30. All four exact maintained URLs returned HTTP 200, the 2026-09-30 maintenance date, and the versioned Airflow asset. Production Airflow, shared loader, Tool polish, and Print CSS contents match repository contents after newline normalization.
- Exact original reproduction now clears the output and displays the unsupported-result message instead of `∞ ACH`. All four production Tools passed normal fixtures, Reset, Copy with exact units, invalid output clearing, and invalid Copy/Print blocking.
- Production responsive checks: four affected Tools × six viewport widths = 24 checks, plus healthy CFM and Home × six widths = 12 checks; **36 passed, zero document overflow or captured console warning/error**. There is one visible H1 and one H1 in initial static HTML. An invalid Print attempt builds a hidden print-only document with its own H1; that intentional heading is excluded from visible-screen H1 checks, not repaired as an unrelated SEO defect.
- Production healthy CFM SI/IP round-trip preserved the independent fixtures. Production Home has the four current-date cards first, descending dates, valid links, and the existing KittyLaunch badge. No global layout redesign was made.
- Representative HTTP and www URLs redirect to HTTPS apex with HTTP 200. A Googlebot-user-agent request returns 200, self-canonical, and no noindex. This is a representative response test, not proof of Google crawl scheduling or indexing.
- Print limitation remains explicit: shared live Print document data was verified locally, invalid Print was verified locally and on production, and the real native Print entry point was exercised locally. Native printer/PDF rendering was not inspected. Unchanged production Print assets match the tested repository.
- This research and the handover are closed in a follow-up documentation commit; the final Git SHA/ahead-behind/clean result is verified after its push and reported in the task response.

## Protected scope and next state

Home badge content, contact email `canghun13@naver.com`, unrelated dirty checkout, all CSS, source coefficients, integrated Psychrometric Tool, recent Duct/ACH Guide/Belt upgrades, and existing redirect decisions are preserved.

Next checks, maximum three:

1. Obtain a fresh same-period GSC query/page export to distinguish new demand from historical July impressions.
2. Compare indexing counts at matching status dates; reopen technical work only on a reproduced site defect.
3. Use measured sustained converter/lookup/definition demand to decide the next existing-page or genuinely new workflow review, rather than treating QA/direct pageviews as growth.
