# HVAC Tools Hub — November 23, 2026 weekly review

## Outcome: browser acceptance blocked, not a completed FIX

The current evidence identifies a Heat Pump input-validation FIX candidate. **No production application change was made.** Required actual-browser reproduction and post-change QA cannot start in this environment. This is not an expansion NO-GO based on weak traffic and is not a claim that the defect has been corrected. Continue from the precise reproduction below when the supported browser runtime works; do not repeat the completed report extraction or unrelated whole-site audits.

## Repository

- Repository: `canghun13/hvactoolshub`; branch `main`.
- Starting local HEAD, cached origin/main and actual remote main all `cbcb7af2fd2ec77b201c01bedd98735652336cc2`. Actual remote checked before fetch, then ahead/behind 0/0; clean tree; no synchronization required.
- Existing child checkout reused after checking the current working directory. No other checkout/project changed; no reset, clean, stash, force operation, installation, environment/credential/browser/security configuration change.
- Current request, handover rules/latest closure, previous weekly/index/growth records and current inventory reviewed. November 16 Belt, November 9 Load, November 3 Refrigeration, October BTU/Duct/Airflow fixes remain unchanged. Integrated Psychrometric and intentional legacy merges remain; latest implemented cluster is Fume Hood.

## Current-session attachments

All six supplied files were readable and used directly. ZIP CSVs were parsed in memory; originals unchanged. No attachment search, old raw-report reuse or inaccessible attachment. Comparisons use the committed November 16 review.

| Source | Actual scope |
|---|---|
| hvactoolshub.com-Performance-on-Search-2026-11-23.zip | GSC Web/text, last three months; 92 daily rows August 22–November 21 |
| hvactoolshub.com-Coverage-Drilldown-2026-11-23.zip | Crawled—currently not indexed; 81 chart rows August 28–November 16; 43 detail URLs |
| hvactoolshub.com-Coverage-Drilldown-2026-11-23 (1).zip | Discovered—currently not indexed; same chart period; 38 detail URLs |
| hvactoolshub.com_KeywordReport_2026. 11. 23..csv | Supplementary queries, 587 rows; engine and measurement window unspecified |
| hvactoolshub.com_PageTrafficReport_2026. 11. 23..csv | Supplementary pages, 57 rows; engine and measurement window unspecified |
| 보고서_개요.csv | GA4 October 26–November 22 |

## Weekly metrics / comparison

### GSC

- **19 impressions, zero clicks, 0% CTR**. Approximate impression-weighted position **15.00** from rounded daily values, not an asserted unrounded UI headline.
- Latest seven available dates **November 15–21: one impression / zero clicks**. Preceding **November 8–14: two / zero**. Last impression November 16. Previous report was August 14–November 13, 20/0; rolling 20→19 is not one newly lost impression or a matched-week growth rate.
- One exported query: `hvac takeoff calculator`, two impressions, no clicks, position 59.5 (previous one / 60). This is still a small, low-position sample, not a sufficient new cluster case. Exported query diversity remains one, not two distinct new queries.
- Two page rows: Home **18 impressions / 12.94 position**, Duct Velocity Guide **one / 52**. Previous six page rows used a different rolling window; missing detail rows do not establish new deindexing or a complete page-loss count. Page/query/daily aggregations are not combined.
- Country rows: US17, Mexico1, Thailand1. Devices: desktop18, mobile1.

### Indexing: first supplied post-repair crawl evidence

- Latest Coverage status **November 16: 43 Crawled / 38 Discovered**, same counts as prior November 13. Counts do not prove identical URL membership.
- **BTU Formula Explained now has last crawl November 16** in the Crawled list. The previous export's latest listed crawl was September 25. This is concrete supplied post-October-22 discovery-repair crawl evidence, but the URL is still excluded. Do not continue saying all listed Crawled timestamps predate the repair.
- Discovered dates remain 1970 sentinel/unavailable values. No fresh overall indexed total, Google-selected canonical, authenticated live URL Inspection, validation outcome, host history, manual-action check or recrawl submission is supplied/claimed.
- Focused BTU Formula public read returns200, correct self-canonical and source-equivalent content with unit distinctions, formulas, worked table and relevant converter links. A crawl without indexing is not by itself a reason to delete or rewrite this guide, change its canonical/URL, or repeat blanket TLS/robots audits.
- **Index recovery is not confirmed.** Neither these counts nor the historical five indexed pages provide today's indexed total. The browser-startup problem below is local QA infrastructure, not evidence of a production crawl/TLS failure.

### Supplementary search

- Page report **57 rows /1,134 impressions /27 clicks**; query report **587 /857 /27**. Right-tail numeric parsing retains all rows, no rejects. Engine/date range unspecified; do not add either grain to GSC or to each other, or infer matched-week Google growth.
- Prior page54/1,009/25; query524/760/25. Leading page impressions/clicks: CFM definition186/1 (179/1), Duct Area152/1 (140/1), BTU definition125/0 (121/0), Belt Guide89/2 (77/2), ACH Guide69/1 (56/0), Fan Pulley53/3 (42/3), Motor Sheave38/5 (34/4), Fan Law29/2 (22/2).
- Adjustable-sheave formula remains22/0, position1.5; minimum driven-sheave/BHP question6/1, position3.33. Round-duct velocity9/0, position7.33 and CFM-definition8/0, position8.125. Existing recent features cover those observed tasks; no automatic exact-match page, repeat rewrite or universal motor-overload approval added.

### GA4

- October26–November22: **117 active,114 new,31.50 seconds mean engagement,671 events**. Prior October19–November15:83/80,47.02seconds,580events. Shifted periods and production QA mean these are not clean weekly organic-growth measurements.
- First-user source users / sessions: Direct106/115; Bing organic9/31; Twelve.Tools directory1/1; Yahoo organic1/1. Google organic row unavailable, not proven zero. Directory referral engagement/quality cannot be certified from the aggregate row alone.
- Singapore32 and Ashburn14 users; no bot identity inferred. Belt pages were tested November16, so their views and Direct growth are not independent organic-demand proof.

## Technical checks and execution limitation

- Default shell could not start with `CreateProcessWithLogonW failed: 1920`, including one explicit existing Windows PowerShell retry. Normal approved read execution succeeded; no shell/runtime installation or settings change was needed to read reports, Git, files or run existing Node checks.
- Supported in-app browser creation failed before a tab existed: `node_repl kernel exited`, stderr `windows sandbox failed: CreateProcessWithLogonW failed: 1920`. One runtime reset and a lightweight `cua.getState()` retry produced the same startup failure. No user denial, CAPTCHA, TLS warning or page-specific error was observed. No browser installation, alternate environment or security bypass attempted.
- Consequently actual before/after browser interaction, responsive screenshots, native input validation, actual Copy/Print/Reset and production UI acceptance are **not performed this week**. Do not relabel VM/static checks as browser QA or claim a production FIX/deployment.
- Focused public HTTP checks: Heat Pump Tool HTML, its JS and BTU Formula HTML return200 and match source; both HTML canonicals correct. robots allows all and points to canonical sitemap. No new Googlebot-specific result or whole-host audit claimed.

## Heat Pump FIX candidate: source-only diagnostic

Target: `/tool/heat-pump-operating-cost-calculator.html`; dedicated `assets/js/heat-pump-20260808.js`. These public files match the starting checkout.

The deployed-source-equivalent script was executed with lightweight form/output fixtures outside the public repository. This is deterministic code evidence, **not native browser reproduction**. The fixture's validity predicate is a model of the current HTML attributes, not proof of browser behavior.

| Input case (other inputs:24,000 BTU/h,8h,COP3,rate0.15) | Existing HTML contract | Current JS diagnostic |
|---|---|---|
| Default | Valid | 192,000 BTU;18.76kWh;2.81 currency;resistance8.44;difference5.63 |
| Rate cleared to blank | Required field missing | Cost/hourly/resistance/difference all0, ordinary estimate-success message |
| Rate explicitly0 | Valid zero | Same zero cost values; this legitimate zero must remain supported |
| Hours87,601 | Above existing87,600 maximum | Publishes205,386.55kWh and30,807.98currency, ordinary success message |
| COP0.001 | Below existing0.01 minimum | Publishes56,269.65kWh and8,440.45currency, ordinary success message |

Root cause indicated by source: `Number('')` maps the required blank rate to0. The live handler invokes calculate without native required/min/max checks; calculate only checks finite/sign/COP upper20. Native submit constraints and live calculation therefore disagree. No formula error, new engineering bound or pricing recommendation is inferred.

### Exact continuation, before any production code change

1. Re-establish the supported browser runtime without installation/security changes. Verify the public target: clear rate; compare with explicit0; enter87,601hours andCOP0.001. Check actual result, Copy and Print. Use the recently fixed Belt or Load Tool as a healthy control. These mandatory live observations have not been completed.
2. If the source-only failures reproduce, keep scope to this Tool's existing validity contract. Honor required/min/max and supported mode/unit; preserve explicit0 rate, positive COP below1 when within existing bounds, negative savings when valid, US/SI conversion/defaults/precision and heating/cooling behavior. Do not rewrite COP physics or choose a new arbitrary limit.
3. Add independent regression tests for both unit systems/modes, blank versus0, native bounds, valid calculations, Reset, unit switching and output clearing. Reject unsupported derived arithmetic atomically if demonstrated/necessary. Preserve shared Copy/Print, design and user badges.
4. Complete actual local and public browser QA at390/768/900/1024/1280/1440, actual clipboard and current-input Print summary; then update real changed-page dates, Latest/sitemap as appropriate, handover, commit/push and remote equality. No such application update is claimed here.

## Candidates / expansion decision

| Candidate | Actual evidence / gap | Disposition |
|---|---|---|
| Heat Pump validation | Source-equivalent blank/range failure, native browser still unavailable | FIX candidate; do not call corrected or production-accepted |
| Belt / CFM / Duct Area | Supplementary demand continues, recent fixes/features already cover observed tasks | No newly established growth-function gap; unchanged |
| BTU Formula | New November16 crawl but still excluded; useful formula/example/converter content present | Observe page-specific indexing evidence, no blind rewrite |

No fabricated growth scores. Expansion considered at decision-tree level but not entered while the higher-priority technical candidate requires reproduction/acceptance. Implemented/excluded boundaries retained; no40-family funnel or scored expansion NO-GO claimed. Low organic traffic is not the reason for withholding production changes.

## QA / changes / protected areas

- All existing **3,254 assertions pass**. They do not cover/fix the newly diagnosed Heat Pump gap.
- Static audit: **108 HTML /86 sitemap URLs /1,223 local targets /14 JS syntax checks**, no detected missing-target/maintained SEO/JSON-LD errors. All86 maintained URLs reachable from Home initial HTML within two links.
- Inventory unchanged:30Tools,25Guides,10Compare,12Reference,four hubs,Home,four information pages; integrated Psychrometric structure retained.
- **Repository changes are documentation only:** this review and appended handover. No production HTML/JS/CSS/shared layout/Header/Footer/Print/generator change; no new/deleted/merged URL; no fake updated dates or Latest card.
- Sitemap, llms.txt, robots, contact `canghun13@naver.com`, GA4 `G-EDV0PS9MP3` and Home protected badge content unchanged. Other user work and projects preserved.
- Docs-only commit/push and final local/fetched/actual remote equality are checked separately. A docs deployment is not application FIX acceptance. This week's implementation remains **blocked/incomplete** by mandatory browser QA, not falsely classified as completed FIX or completed growth/expansion NO-GO.

## Technical sources

- [DOE GEB HVAC technical report](https://www.energy.gov/cmei/buildings/articles/geb-technical-report-series-heating-ventilation-and-air-conditioning), current official search evidence: point-condition COP is thermal output divided by electrical input; distinct from seasonal ratings.
- [ENERGY STAR light-commercial HVAC definitions](https://www.energystar.gov/products/light_comm_heating_cooling/light_commercial_hvac_key_product_criteria): heating COP compares delivered heating with consumed electrical energy.
- Existing NIST/DOE page sources retained. No numerical constant, rating, electricity tariff or formula changed.

## Next state (maximum three)

1. Restore supported browser execution and finish the exact Heat Pump before/after reproduction/QA above. Do not repeat report extraction or declare this already fixed.
2. Track fresh BTU Formula indexing/selected-canonical evidence after the November16 crawl; recovery and today's indexed count remain unknown.
3. Re-enter the weekly growth/expansion decision only after the technical candidate is resolved or disproved, without repeating recent candidates under new names.
