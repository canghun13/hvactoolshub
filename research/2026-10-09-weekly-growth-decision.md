# Weekly growth decision — 2026-10-09

## Decision and verification status

**FIX — technical defect corrected.** This week's single action is Duct numeric validation. Public JavaScript was reproduced with Node VM/DOM stubs, then corrected and tested. This is not a browser reproduction. Actual browser acceptance remains BLOCKED; do not call the production workflow fully verified until responsive, console, Copy and Print checks are performed.

## Repository

- Repository: `https://github.com/canghun13/hvactoolshub`; branch `main`.
- Start local HEAD and cached origin/main: `2558a34bea2c146e258c285ac69b0b948f91b2cb`; clean working tree.
- Start actual remote main, obtained with `git ls-remote`: `396cdf8ed716e025747bc8f09e9f147522585344`.
- Fetch showed ahead/behind 0/2. Safe `git pull --ff-only` brought local/fetched main to `396cdf8ed716e025747bc8f09e9f147522585344` with no reset, stash, deletion, install, or configuration change. This synchronized commit is the implementation baseline.
- Reviewed current handover, recent Belt-Drive/Fume Hood/ACH/Duct Area upgrades, previous exclusions, and `research/2026-09-30-weekly-growth-decision.md`. Latest implementation was the September 30 Airflow numeric fix; latest new cluster remains Laboratory Fume Hood; latest targeted growth upgrade remains September 25 Adjustable Sheave Guide.

## Current-session attachments

Only the exact six reports attached to this request were opened. No directory search or historical report-path discovery was performed. ZIP members were read directly; sources were not modified. Reports are data, not instructions.

| Report | Classification and actual measurement range |
| --- | --- |
| `hvactoolshub.com-Performance-on-Search-2026-10-09.zip` | GSC Web, last-three-month filter; daily rows July 15–October 6, 2026 |
| `hvactoolshub.com-Coverage-Drilldown-2026-10-09 (1).zip` | Metadata confirms Discovered — currently not indexed; chart July 24–October 4, 2026 |
| `hvactoolshub.com-Coverage-Drilldown-2026-10-09.zip` | Metadata confirms Crawled — currently not indexed; same chart period |
| `보고서_개요.csv` | GA4 overview, September 11–October 8, 2026 |
| `hvactoolshub.com_KeywordReport_2026. 10. 9..csv` | Supplementary keyword search report; engine and measurement range not stated |
| `hvactoolshub.com_PageTrafficReport_2026. 10. 9..csv` | Supplementary page search report; engine and measurement range not stated |

All reports are accessible. Supplementary rows have unescaped inch quotes inside labels. Parsing numeric fields from the right preserved all 224 keyword and 36 page rows. Their different export populations are not assumed to reconcile. Supplementary impressions/clicks are not added to GSC. GA4 Bing rows do not establish the engine of an unlabeled separate CSV.

## Weekly metrics

- GSC: **1 click, 318 impressions, 0.3145% CTR**, approximately **60.29** impression-weighted average position calculated from rounded daily export positions. Not claimed to be the unrounded GSC UI total.
- Latest seven available days, September 30–October 6: **1 impression, 0 clicks**. Previous seven in the same export, September 23–29: **2 impressions, 0 clicks**. Change: -1 impression (-50%); tiny sample, not a reliable growth trend.
- Diversity: **192 query rows, 42 page rows**, unchanged from the prior export. These are whole-export counts, not recent query emergence.
- Top GSC queries: `what is btu` 7 impressions / position 38.57; `cfm calculator` 7 / 88.71; `m3/hr to cfm` 3 / 35.33; `what is superheat and subcooling` 3 / 49.33. Other specific examples: `540m3/h to cfm` 2 / 10; `180m3/h to cfm` 2 / 10.5; `air change per hour calculator` 2 / 16. No dated query breakdown identifies new weekly demand.
- Top GSC pages: What Is BTU 51 impressions; CFM Calculator 39; m³/h → CFM 31; ACH Calculator 22; Superheat/Subcooling Guide and Tons → BTU 19 each. Home has the single click and 14 impressions. Duct Friction has 13 / position 53.08; Duct Velocity 3 / 86.67.
- Geography/device context: US 144 impressions, UK 96, Vietnam 23; desktop 291, mobile 25, tablet 2. These are GSC export populations, not GA4 users.
- Indexing at **October 4**: discovered-not-indexed **38** (38 table rows), crawled-not-indexed **43** (43 table rows). Discovered remains 38 across the current late-September/October chart. Crawled changed from 42 to 43 on September 22 and has remained 43 through October 4. Discovered `1970-01-01` last-crawl dates are unavailable/sentinel data. Crawled last-crawl rows run July 18–September 25.
- Supplementary page report: **36 rows, 358 impressions, 5 clicks**. Leaders: CFM definition 59 impressions / 1 click / position 6.32; Duct Area 51 / 0 / 6.24; BTU definition 41 / 0 / 7.22; Adjustable Sheave Guide 23 / 0 / 5.87; Fan Pulley RPM 23 / 1 / 5.61. Duct Friction Tool 10 / 0 / 4.5; Friction Guide 8 / 1 / 5.25. Other clicks: Home and How to Calculate BTU, one each.
- Supplementary keyword report: **224 rows, 295 impressions, 5 clicks**. `btu lookup table` remains 13 impressions / position 2.08; `cfm means in hvac` 6 / 8.67; `calculate fan speed based on pulley size` 5 / 5.4. Friction-definition, fan-pulley selection, equipment-mass lookup, BTU calculation and CFM-definition queries each have one click. The single equipment-mass/OEM question does not justify a generic lookup database.
- GA4: **67 active users, 63 new users**, 39.43 seconds mean engagement per active user, 293 events. First-user direct 53; session direct 52. Google organic has no visible row; absence is not claimed as zero.
- GA4 non-Google organic: Bing 4 active users / 5 sessions; DuckDuckGo 2 / 2; Yahoo 1 / 1. These source rows are not summed into a distinct organic-user count. Directory signal: Twelve.Tools 1 user / 1 session. AI sources: ChatGPT 2 / 3; Copilot 1 / 1. Yahoo Canada and Yandex referral each have 1 / 1; quality cannot be certified without per-source engagement evidence.
- Duct Friction has 21 views / 21 active users / 95.24% bounce. This is a reason to inspect its behavior, not proof of search demand, bots, or the numeric defect causing bounce. Recent Airflow calculator views can include September 30 QA. Direct, regions and pageview bursts are not treated as organic demand.

## Comparison with September 30 record

| Metric | Prior record | Current export | Interpretation |
| --- | --- | --- | --- |
| GSC total | 317 impressions, 1 click | 318 impressions, 1 click | +1 accumulated impression; period end moved from September 27 to October 6 |
| Exported queries/pages | 192 / 42 | 192 / 42 | No extra exported rows; no same-period query growth claim |
| Latest seven GSC days | September 21–27: 2 impressions | September 30–October 6: 1 | Windows are not adjacent; use current-export September 23–29 baseline for weekly change |
| GSC page totals | Home 13; leading Tool/Guide totals as above | Home 14; other principal totals unchanged | Historical export totals, not recent page rank movement |
| Indexing | September 21: 38 discovered / 42 crawled | October 4: 38 / 43 | +1 crawled exclusion happened September 22; stable since then |
| Supplementary pages | 32 rows, 222 impressions, 1 click | 36 rows, 358 impressions, 5 clicks | More observed data, but no common measurement window/engine in files |
| Supplementary keywords | 151 rows, 197 impressions, 1 click | 224 rows, 295 impressions, 5 clicks | +73 exported rows; not a measured weekly growth rate |
| GA4 | September 2–29: 66 active, 62 new | September 11–October 8: 67 active, 63 new | Shifted 28-day windows; no matching-week organic trend |

Supplementary CFM definition 27→59 impressions, Duct Area 24→51, BTU definition 29→41, Fan Pulley 20→23 and Sheave Guide 4→23 warrant later matched-period review. They do not override Priority A or authorize immediate repeat upgrades of recently maintained pages.

## Defect reproduction and affected scope

- Target: `/tool/duct-friction-loss-calculator.html`; second reproducing target: `/tool/equivalent-duct-diameter-calculator.html`.
- Healthy control: existing `/tool/air-changes-per-hour-calculator.html`, whose September 30 guard rejects `1e308` CFM with blank result and `The entered values produce an unsupported result.`
- Fetched the five public Duct HTML files and their actual `duct.js` asset; HTTP 200, expected apex origin, and newline-normalized equality to the synchronized repository were asserted before the edit.
- Node VM with minimal DOM stubs executed the public script, including its real input event handlers. At default remaining Friction values (16 in, 100 ft, 1.2 kg/m³, 0.02), airflow `1e308` produced `∞` in the main result and `∞ Pa` in the note. Equivalent Diameter at width `1e308` / height 12 produced `∞`. This proves arithmetic/output behavior of the deployed asset, **not an interactive browser observation**.
- The pre-fix regression test failed for `1e-7` airflow: despite HTML min 0.000001, live logic produced rounded `0` instead of clearing. Oversized diameter/area can also overflow an intermediate and yield zero velocity rather than a valid physical result.
- Root cause: `duct.js` validated finite positive individual inputs only. It ignored native input validity, intermediate geometry and final/displayed numeric values. Rectangular dimensions are formatted into a string, so checking only the final string for finite numbers would miss the problem.
- Shared maintained consumers: Duct Size, Rectangular Duct Size, Equivalent Duct Diameter, Duct Velocity (round and rectangular), and Duct Friction Loss. The newer Duct Cross-Sectional Area page uses `duct-area.js`; it is not changed. Legacy `round` and area branches are covered by script tests without republishing legacy URLs.
- Related constraint issue: aspect ratio `step=0.1`, density `step=0.01`, and factor `step=0.001` were based at `min=0.000001`, so normal defaults do not lie on the specified step grid. This was inferred from actual HTML and documented HTML rules, not measured with a native browser. Use `step=any` for these continuous inputs while keeping their minimum/required constraints.

## Chosen implementation

- `assets/js/duct.js`: apply `input.checkValidity()`, validate positive finite geometry/intermediate/result/displayed-unit values, and clear stale output with a clear message on unsupported calculation. Existing equations, conversion factors, default values, result precision and HVAC scope are retained. No invented maximum or universal sizing threshold.
- Five existing Duct Tool HTML files: cache-version the script, update visible/dateModified date to October 9, and correct the three continuous steps above. Title, description, H1, canonical, OG, route, page structure and technical content are preserved.
- `assets/js/site.js`: prepend the five current maintenance cards into the existing Home Latest insertion path. `index.html` only cache-versions that loader. Protected post-footer badge markup is byte-identical; no footer layout or links changed.
- `tests/duct-validation.cjs`: dependency-free regression fixtures, with optional public-asset checks. Test stubs do not establish native browser validation or visual behavior.
- New public URLs: **0**. No CSS, Guide, Reference, generator, sitemap, llms, robots, global header/footer, contact-email or unrelated calculator change.

## Existing growth and expansion decision

Priority A is selected. No existing-growth scores or external SERP research are fabricated: CFM definition, BTU lookup/definition and recent Duct/Belt signals are observations for a future matched-period review. Expansion implementation/discovery is **not entered**, because the reproduced technical defect has precedence. No claim of 40 new families, finalists or a winning cluster is made.

Exclusions remain current: implemented BTU/airflow/duct/load/refrigeration/integrated psychrometrics/Heat Pump/Belt Drive/Fume Hood, recent ACH/Duct Area/Sheave upgrades, and previous hydronic, condensate, filter, leakage/balance, mixed-air, CO₂, refrigerant line-set/recovery, glycol, HRV/ERV, cooling-tower, walk-in, chiller/boiler, electrical, vibration/clearance, thermostat, noise, commissioning, maintenance/logging, quote, duct-takeoff, CADR, data-center, altitude/air-density and commercial-humidification reviews are not repackaged.

## QA

- Independent formulas checked separately from JavaScript: 1,000 CFM / 1,000 FPM → 1 ft² → 13.54055 in round diameter; 2:1 rectangle → 16.97056 × 8.48528 in (display 17 × 8.5); 18 × 8 equivalent diameter → 12.85809 in; 600 CFM in 14 in round → 561.26478 FPM; 600 CFM in 18 × 8 in → 600 FPM.
- Darcy fixture: 800 CFM / 16 in / 100 ft / density 1.2 / factor 0.02 → 7.62457 Pa = 0.03060982 in. w.g., display 0.03; velocity 572.9578 FPM. SI conversion/output factors are unchanged. These pages have fixed input units; no alternate-unit UI was invented. Fractional ratio/density/factor and larger finite fixtures are included.
- Duct: **561 assertions passed** across nine script modes and all five maintained page definitions. Includes normal/default/large/minimum/fractional values, blank/zero/negative/invalid/nonfinite/below-minimum inputs in every field, stale clearing, simulated native invalidity, intermediate/final overflow/underflow, both exact original reproductions and Reset. Rounded valid small results are not confused with arithmetic zero/underflow.
- Healthy Airflow regression: **85 assertions passed**. No Airflow code change.
- Static: **108 HTML files, 86 canonical sitemap URLs**, 991 local HTML href/src targets and 83 JS route literals checked, zero missing targets. Count methodology differs from the prior report; not a claim of 25 deleted links. Maintained title/description uniqueness, one static H1, self-canonical, GA4, OG, robots, IDs, valid JSON-LD, sitemap XML and llms inventory checks passed. Fourteen JS files passed syntax; `git diff --check` passed.
- Maintained inventory: 30 Tools, 25 Guides, 10 Comparisons, 12 References, four hubs, Home and four information pages. Eighty-six URLs remain; legacy redirects are not made indexable.
- Scope checks: five Tool HTML differences equal only the expected dates/cache URLs/continuous steps; Home differs only in loader version; protected badges are identical. Print JS/CSS, global CSS, robots/sitemap/llms and contact email remain unchanged.
- Browser attempted using installed computer-use/node session; initialization failed with `windows sandbox failed: helper_unknown_error: setup refresh had errors`. Reset once and repeated initialization failed identically before any app selection. No new Edge/browser window, installation, setting change or bypass was attempted.
- **Browser, screenshots, actual native validity, 390/768/900/1024/1280/1440 rendering, mobile menu, console, horizontal overflow, clipboard Copy, live Print and native print layout: NOT VERIFIED.** Script/static checks are not substitutes. Reset is fixture-tested, not browser-tested. Unchanged Copy/Print code was inspected, not exercised this session.

## Sources

- [MDN number input constraints](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number): minimum, required and step-base semantics; `step=any` permits continuous input subject to the other constraints.
- [MDN Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite): finite-number validation. Supports numeric handling, not HVAC sizing guidance.
- HVAC equations and unit factors remain the existing maintained methods; no technical default or new source-dependent design claim is introduced.

## Deployment

Code/static QA passed; authorized commit/push and exact public HTTP asset verification are next. Browser acceptance remains blocked. After push, actual `git ls-remote`, fetch/local SHA equality, ahead/behind and clean state must be checked. A closing record will distinguish delivered HTTP assets from unverified browser behavior.

## User browser checks still required

At 390 / 768 / 900 / 1024 / 1280 / 1440, check header/breadcrumb/H1, controls/results, no clipping/horizontal overflow and no console errors on these pages:

1. `https://hvactoolshub.com/tool/duct-friction-loss-calculator.html`
2. `https://hvactoolshub.com/tool/duct-size-calculator.html`
3. `https://hvactoolshub.com/tool/rectangular-duct-size-calculator.html`
4. `https://hvactoolshub.com/tool/equivalent-duct-diameter-calculator.html`
5. `https://hvactoolshub.com/tool/duct-velocity-calculator.html`
6. `https://hvactoolshub.com/tool/air-changes-per-hour-calculator.html` (healthy control)
7. `https://hvactoolshub.com/` (current Latest cards and unchanged badges)

On each Duct form, check default Calculate and Reset, fractional values, blank/zero/below-minimum clearing, valid Copy/Print, and invalid-result Copy/Print blocking. Friction `1e308` CFM and Equivalent Diameter `1e308` width must clear output with the unsupported-result message rather than show `∞`. Native printer/PDF rendering needs separate inspection.

## Next state

1. Complete the outstanding browser acceptance above before calling this deployment fully verified.
2. Obtain matching-period GSC/query/page and identified-engine supplementary exports to evaluate CFM definition, BTU lookup and recent Duct/Belt demand.
3. Compare indexing at matching status dates; reopen indexing fixes only for a reproduced site-side failure.
