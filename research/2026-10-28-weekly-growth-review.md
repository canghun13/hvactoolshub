# HVAC Tools Hub weekly review — 2026-10-28

## Repository

- Repository: https://github.com/canghun13/hvactoolshub
- Branch: main.
- Start local HEAD, cached origin/main and actual remote main: `00e3cfe36b14738297e2e4660101587f04d2893c`.
- Actual remote checked before fetch; fetch confirmed 0/0. Clean working tree. No reset, clean, stash, force push, installation or environment changes.
- Read current handover/history, October 15 weekly review and October 22–23 index-repair record. Public inventory remains 108 HTML files, 86 maintained canonical URLs: 30 Tools, 25 Guides, 10 Comparisons, 12 References, four hubs, Home and four information pages.
- Latest new cluster: Laboratory Fume Hood (August 27). Recent work: ACH/CFM, Duct Area, Belt workflow, Duct validation, Print/Equivalent data, and October 22 static discovery. Their boundaries and previous NO-GO/merge decisions are retained.

## Attachments and periods

All six current-session report files were accessible. Archives were read directly. Source originals are unchanged and are not committed.

| Attachment | Verified contents / period |
|---|---|
| hvactoolshub.com-Performance-on-Search-2026-10-28.zip | Web, last three months; July 26–October 25, 92 daily rows; three visible query rows, 20 page rows |
| hvactoolshub.com-Coverage-Drilldown-2026-10-28 (1).zip | Metadata confirms Discovered — currently not indexed; August 5–October 23; 38 detail rows |
| hvactoolshub.com-Coverage-Drilldown-2026-10-28.zip | Metadata confirms Crawled — currently not indexed; same chart period; 43 detail rows |
| hvactoolshub.com_KeywordReport_2026. 10. 28..csv | 358 keyword rows; engine and measurement window unspecified |
| hvactoolshub.com_PageTrafficReport_2026. 10. 28..csv | 45 page rows; engine and measurement window unspecified |
| 보고서_개요 (1).csv | GA4 property hvactoolshub, September 30–October 27 |

Supplementary numeric columns were parsed from the right to retain labels containing inch quotes. Do not add supplementary impressions/clicks to GSC, or add page and keyword totals together.

## Weekly metrics

- GSC: **25 impressions, zero clicks, 0% CTR**. Approximate impression-weighted mean of rounded daily positions: **23.644**, not an unrounded account headline.
- October 19–25: **2 impressions / 0 clicks**. Matched prior seven days October 12–18: **5 / 0**.
- Visible query diversity: three rows, four query impressions: refrigeration formulas 2 at 77.5; capacity of refrigeration 1 at 20; refrigeration effect formula 1 at 72. Query privacy/aggregation means these do not cover all 25 property impressions.
- GSC leading pages: Home 19 impressions, Refrigeration Capacity Guide 6, CFM per area 3, Duct Size 3, Refrigeration Units Reference 3. Page-level impressions are a different aggregation; do not sum them as the property total.
- Coverage as of **October 23**, not export day: Discovered **38**, Crawled **43**. All reported Crawled last-crawl dates precede the October 22 repair; latest is September 25. Discovered 1970 dates are unavailable/sentinel data. Neither export supplies current total indexed count, Google-selected canonical or a live inspection.
- Supplementary keyword report: **485 impressions / 14 clicks**, 358 rows. Page report: **618 / 14**, 45 rows. Top pages: CFM definition 124/1, BTU definition 89/0, Duct Area 75/0, ACH guide 35/0, Belt guide 33/1, Fan Pulley 32/1, BTU Calculator 21/0, Fan Law 18/1. These are separate unidentified-engine/window signals, not Google growth.
- GA4 September 30–October 27: **53 active users, 51 new, 78 seconds mean engagement, 458 events**. Direct 39 first-source users / 46 sessions; Bing organic 10/13, Yahoo 2/3, DuckDuckGo 1/1, ChatGPT 1/1. Google organic row absent: unavailable, not asserted zero.
- Singapore accounts for 27 users; production QA occurred in this period. Direct traffic, hub/Equivalent/ACH/Duct views and cloud-region traffic must not be promoted to genuine organic demand. AI referral is not search organic.

## Week-over-week interpretation

- Prior documented GSC window July 20–October 19: 304 impressions / one click. Current July 26–October 25: 25/0. The six early days left the rolling window; the numeric difference is **not evidence of 279 newly lost impressions this week**. No matching query/page-by-week breakdown is supplied.
- Current same-source last-seven comparison is 2 versus 5, no clicks in either. Prior report's October 13–19 also had five, but that is a different seven-day boundary.
- Coverage 38/43 is unchanged from the prior October 12 status. Current status endpoint extends only one day past the October 22 release and supplies no post-repair Crawled timestamp. No recovery or new technical failure inferred.
- The previous review did not record comparable October 22 supplementary/GA4 totals. Earlier October 15 GA4 was September 17–October 14 (60 active/56 new, 44.07 seconds, 263 events). Shifted windows and QA make this a context comparison, not weekly organic movement.
- Three visible GSC queries versus prior 182 likewise compares shifted windows/privacy-visible rows, not an isolated this-week query collapse.

## Technical health and selected reproduction

No new host/indexing regression was established. The October 22–23 full HTTP/index audit is not repeated just because 38/43 is unchanged. The discovery regression remains in the static suite.

**Priority A defect reproduced on production before editing:**

1. BTU Calculator: select refrigeration tons, enter `1e308`. Native input validity is true; all four outputs become `∞` while the message describes a valid thermal conversion.
2. Same page: `0.0000001` BTU/h is below the existing HTML minimum `0.000001`. Native validity is false, yet the live input handler publishes four rounded zero outputs and a normal result message.
3. Tons to BTU: `1e308` publishes `∞` BTU/h and `∞ kW of capacity`.
4. Both public BTU script files match starting-commit contents, so this is not a local-only or deployment-mismatch finding.
5. Healthy control: maintained ACH at `1e308` CFM clears the output and displays its unsupported-result message. The previously corrected Airflow/Duct guard is not rewritten.

Root cause: BTU scripts check only finite positive **individual inputs**, not native input constraints or derived/intermediate arithmetic. Multiplication can overflow even when the entered value is finite. The four cluster modes share this path; area/rate multiplication and capacity/area division have the same failure boundary.

This is a calculator validation defect, **not identified as the cause of Google's indexing loss**.

## Existing growth candidates

No speculative growth scores assigned after a hard defect is reproduced.

| Workflow | Actual signal | Current gap / disposition |
|---|---|---|
| Refrigeration Capacity Guide | Three GSC query labels, four visible query impressions | Existing guide already covers mass flow × enthalpy difference and links calculator/reference. Insufficient new interactive-gap evidence for another immediate revision |
| CFM definition | Supplementary 124 impressions, one click | Recently corrected October 15; unspecified reporting window and no new intent gap. Do not rewrite again |
| Duct Area / Velocity | Supplementary 75 Area impressions; round-velocity query seven | Existing round/rectangular modes and recent September/October work. No demonstrated missing mode |

## Expansion decision

- Expansion branch entered: **No**. The reproduced hard defect takes priority over existing-growth scoring or new discovery.
- Current implemented clusters, integrated Psychrometric Tool, legacy merges and prior exclusions retained.
- No 40-family funnel, new-cluster scoring or expansion NO-GO claimed. No new public URL created.

## Final decision

**FIX — BTU numeric validation defect corrected.**

## Changes

- `assets/js/btu-calculator.js`: honor existing native input validity and supported units; validate all normalized/derived outputs before publishing; clear all stale results for unsupported arithmetic.
- `assets/js/btu-cluster.js`: same native/finite-positive guard for all four maintained modes; delay secondary formatting until both numeric results are supported; clear primary and secondary values together.
- Conversion factors, equations, defaults, normal precision, units, limits and engineering scope remain unchanged. No invented upper engineering limit.
- Five maintained BTU HTML pages: versioned affected script, October 28 visible/meta/schema modification date and existing July 16 creation date. No title/H1/description/canonical/URL change.
- Corrected one checked example within the affected Tons to BTU page: 1.5 RT = 18,000 BTU/h = **5.275 kW thermal** at three decimals, not 5.276.
- Home: five actual updated Tool cards in the **static** Latest list, before older updates. The October 22 initial-HTML discovery repair is preserved, not replaced with runtime-only cards.
- Sitemap: same 86 URLs; real lastmod for five changed Tools and Home only. Four hubs already list all maintained BTU Tools; no forced hub change. llms.txt core inventory verified, unchanged.
- Added `tests/btu-validation.cjs`; all source/test edits stay in this workflow. No CSS, shared loader, global layout, Header/Footer, common Print code, new generator, AdSense or badge change.

## QA

- New BTU fixture initially failed on the unmodified code at below-minimum stale outputs; public browser separately reproduced overflow. After fix: **383** assertions across four core units/four cluster modes, normal/fractional/blank/zero/negative/nonfinite/below-minimum/overflow inputs, clearing/reset and large finite values. These are DOM stubs, not browser proof.
- Existing Duct 561 + Airflow 85 + Equivalent Reference 14 + discovery 317: **977** unchanged assertions. Combined **1,360** pass.
- Static audit: 108 HTML / 86 sitemap URLs / 1,217 local targets / 14 browser JS syntax checks, zero detected missing targets/maintained SEO/JSON-LD errors. Sitemap XML parses; llms has no invalid inventory. Changed Tools have one created and one updated meta each.
- Actual local browser: all five Tools normal samples, alternate core units, Calculate, Reset, blank/zero/negative/below-minimum/nonfinite input and overflow clearing. Actual clipboard readback includes expected labels/values/units on all five. No captured warning/error.
- Existing Print button through local-only native-dialog shim: each valid input/result summary is complete. Invalid results, including overflow with native-valid input, do not invoke Print. Common Print CSS/JS unchanged; no new PDF-pagination acceptance claim is made or needed for this non-Print patch.
- Local responsive: five affected Tools + healthy ACH + Home at **390/768/900/1024/1280/1440**, 42 checks with requested=actual width, header/H1 geometry, control bounds, stable navigation, no horizontal overflow. Core and cluster mobile/desktop screenshots inspected. Home Latest begins with five October 28 cards.
- Protected Home post-footer badge area remains identical; contact is unchanged `canghun13@naver.com`. No other project or user work touched.
- Production verification and final remote equality are recorded below after deployment.

## Technical sources

- [NIST SP 811 Appendix B.8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8), accessed October 28: Btu_IT/h to W convention; retained factors, no thermochemical-Btu substitution.
- Existing page sources retain NIST Federal Standard 376B and DOE Chilled-Water System Assessment manual for the 12,000 BTU/h refrigeration-ton convention. No new design/safety claims.

## Deployment

- Implementation `09168395b10ad6e54e321cd00a040cad03ee8262` pushed to main. [GitHub Pages run 40648527708](https://github.com/canghun13/hvactoolshub/actions/runs/40648527708) completed successfully at 07:13:16 UTC October 28. The initial in-progress response was not counted as deployment acceptance.
- After success, all nine focused public resources return HTTP 200 and match committed source after newline normalization: five changed Tool HTML pages, Home, sitemap, and the two versioned BTU scripts. All six checked page canonicals are correct. No repeat sitewide host/index audit inferred from unchanged Coverage counts.
- Actual production browser: all five Tools pass their normal/fractional calculation, Reset and actual clipboard readback. Blank, zero, negative, below-minimum and nonfinite values clear previous results; core ton overflow and Tons/area-ratio/room overflow clear primary and secondary outputs. Invalid Print actions show the valid-result instruction without launching Print. Local complete Print-summary checks and unchanged shared Print assets remain the scope of valid-print acceptance, not a new production PDF-pagination claim.
- Production responsive acceptance: all **42** combinations (five changed Tools, healthy ACH, Home; 390/768/900/1024/1280/1440) pass explicitly requested=actual width, one H1/primary nav, header/H1 separation, control bounds and no document overflow. Core desktop/mobile and Tons mobile screenshots inspected; no captured warning/error. Public Home Latest starts with the five October 28 BTU cards. Temporary browser viewports/tabs and local QA server cleaned up.
- Deployment of this FIX is complete. Google indexing recovery remains **unverified**, not failed or recovered by inference: the current report contains no post-repair crawl timestamps for the 43 reported Crawled exclusions and no current indexed-total export. No authenticated URL Inspection, recrawl request or manual-action result is claimed. Final clean local/fetched/actual remote equality is checked after the documentation closure push.

## Protected areas

Home user-managed post-footer badges unchanged; contact unchanged; unrelated user work preserved. No public pages added, deleted or merged.

## Next state

1. Check fresh post-October-22 Google crawl/index evidence without equating passed tests or unchanged 38/43 with recovery.
2. Use matching-period, identified-source query/page exports before another immediate CFM/Duct/Belt growth revision.
3. Re-enter expansion discovery only when it is the selected branch, using genuinely new families and the required independence/source gates.
