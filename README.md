# Safety Risk Formulation: Harm to Self & Others

**Live app:** https://lordkelv.github.io/safety-risk-formulation/

A clinician teaching tool for structuring suicide and violence risk formulation in psychiatric emergency settings. Select chronic, acute, lethal-means and protective factors; each shows its published association (RR/OR/HR with 95% CI), the comparison group it came from, and its reference. An interactive log-scale chart compares each factor, and an illustrative combined estimate, against the average person in the general population.

> **Teaching tool only. Not a prediction instrument.** Risk factors predict suicide and violence only slightly better than chance (Franklin et al., 2017), and high/low risk categorization misses many people who later die (Large et al., 2016). Use this to structure a formulation, never to decide disposition by a number. If someone is in immediate danger call 911; for a suicidal crisis call or text 988 (US).

## Features

- ~125 factor estimates across suicide and violence/homicide: chronic, acute, firearms/lethal means, intimate partner violence and protective factors
- Single-choice questions for sex/age, C-SSRS ideation severity, acute alcohol, firearm access and psychosis; checkboxes for everything else
- References shown under every factor, plus a numbered reference list for the current selection
- Badges for comparator type (general population vs clinical/subgroup) and research agreement (✓✓ both sources, ≠ sources differ, with explanation)
- Forest-style chart with hover/keyboard tooltips and a data-table view; red-flag banner for acute warning signs
- Copyable formulation summary, example case, dark mode
- Runs entirely in the browser: nothing selected is stored or transmitted

## How the combined estimate works

Relative risks are not independent, so multiplying them overstates risk. The app shows a range from the strongest single factor (lower end) to the naive product (upper end), with a damped central estimate: factors sorted by strength and added on the log scale with weights 1, ½, ¼, … Protective factors are damped the same way and applied at half weight (SAFE-T: protective factors do not negate acute risk). Only general-population-comparator factors are included by default; hours-long exposures such as acute intoxication are excluded. This is a teaching heuristic, not a validated model.

## Data

Figures were researched independently by two AI research agents (Gemini 4 Argon and GPT-6.1 Sol) from peer-reviewed meta-analyses, cohort studies and US national statistics, then reconciled. The raw registers are in [`research/`](research/). All data live in [`data.js`](data.js); every statistic carries its comparator, outcome and source. Verify figures against the cited primary sources before teaching from them.

## Printable summary

[`risk-factors-by-rr.pdf`](risk-factors-by-rr.pdf) lists every factor in the app ranked by relative risk (highest to lowest) for each domain, with 95% CIs, comparator, outcome, source, notes and full references. Rebuild it after editing `data.js` with `python tools/build_pdf.py` (needs Node and WeasyPrint).

## Run locally

Open `index.html` in a browser. No build step or dependencies.
