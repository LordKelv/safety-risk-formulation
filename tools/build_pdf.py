"""Build risk-factors-by-rr.pdf: every factor in data.js ranked by relative risk, per domain.

Usage:  python tools/build_pdf.py   (needs node and weasyprint)
"""
import html
import json
import math
import subprocess
from datetime import date
from pathlib import Path

from weasyprint import HTML

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "risk-factors-by-rr.pdf"
APP_URL = "https://lordkelv.github.io/safety-risk-formulation/"

data = json.loads(subprocess.check_output(["node", str(ROOT / "tools" / "export_data.js")]))
REFS, DOMAINS = data["REFS"], data["DOMAINS"]

GROUP_TAG = {"chronic": "Chronic", "acute": "Acute", "means": "Lethal means",
             "ipv": "Partner violence", "protective": "Protective"}
CMP = {"gp": "General population", "clin": "Clinical comparator", "sub": "Selected subgroup"}
COLOR = {"self": "#2a78d6", "others": "#eb6834"}
E = html.escape


def fmt(v):
    if v is None:
        return "—"
    if v >= 100:
        return f"{v:.0f}"
    if v >= 10:
        return f"{v:.1f}".rstrip("0").rstrip(".")
    return f"{v:.2f}".rstrip("0").rstrip(".") if v >= 1 else f"{v:.2f}"


def rows_for(dom):
    """Flatten items/options into one row per distinct estimate."""
    rows = []
    for g in DOMAINS[dom]["groups"]:
        for it in g["items"]:
            if "options" in it:
                seen = {}
                for o in it["options"]:
                    if o.get("none") or not o.get("stat"):
                        continue
                    s = o["stat"]
                    if "bySex" in s:
                        for sex, lab in (("male", "men"), ("female", "women")):
                            rows.append(dict(label=f"{it['label']}: {o['label']} ({lab})", group=g["key"], stat=s["bySex"][sex], flag=o.get("flag")))
                        continue
                    key = json.dumps(s, sort_keys=True)
                    if key in seen:  # identical estimate shared by several levels (e.g., C-SSRS 1-3)
                        seen[key]["opts"].append(o["label"])
                        seen[key]["flag"] = seen[key]["flag"] or o.get("flag")
                        continue
                    seen[key] = dict(item=it["label"], opts=[o["label"]], group=g["key"], stat=s, flag=o.get("flag"))
                for r in seen.values():
                    rows.append(dict(label=f"{r['item']}: {' / '.join(r['opts'])}", group=r["group"], stat=r["stat"], flag=r["flag"]))
            else:
                s = it["stat"]
                if "bySex" in s:
                    for sex, lab in (("male", "men"), ("female", "women")):
                        rows.append(dict(label=f"{it['label']} ({lab})", group=g["key"], stat=s["bySex"][sex], flag=it.get("flag")))
                else:
                    rows.append(dict(label=it["label"], group=g["key"], stat=s, flag=it.get("flag")))
    return rows


ref_order = []


def ref_num(rid):
    if rid not in ref_order:
        ref_order.append(rid)
    return ref_order.index(rid) + 1


def mini_plot(s, color):
    """Inline SVG: log scale 0.05x-300x, reference line at 1x, CI whisker, dot (filled = general population)."""
    w, h, pad = 150, 16, 4
    lo_l, hi_l = math.log(0.05), math.log(300)
    x = lambda v: pad + (math.log(min(300, max(0.05, v))) - lo_l) / (hi_l - lo_l) * (w - 2 * pad)
    parts = [f'<line x1="{x(t):.1f}" x2="{x(t):.1f}" y1="3" y2="{h - 3}" stroke="#e1e0d9" stroke-width="0.8"/>' for t in (0.1, 10, 100)]
    parts.append(f'<line x1="{pad}" x2="{w - pad}" y1="{h / 2}" y2="{h / 2}" stroke="#eeede8" stroke-width="0.8"/>')
    parts.append(f'<line x1="{x(1):.1f}" x2="{x(1):.1f}" y1="0" y2="{h}" stroke="#8a887f" stroke-width="1.2"/>')
    if s.get("lo") is not None:
        parts.append(f'<line x1="{x(s["lo"]):.1f}" x2="{x(s["hi"]):.1f}" y1="{h / 2}" y2="{h / 2}" stroke="{color}" stroke-width="1.6" stroke-linecap="round"/>')
    filled = s.get("cmp") == "gp"
    fill = color if filled else "#ffffff"
    parts.append(f'<circle cx="{x(s["est"]):.1f}" cy="{h / 2}" r="3.4" fill="{fill}" stroke="{color}" stroke-width="1.4"/>')
    return f'<svg width="{w}pt" height="{h}pt" viewBox="0 0 {w} {h}">{"".join(parts)}</svg>'


def flags(s, row):
    out = []
    if s.get("v") == "both":
        out.append('<span class="tag ok">✓✓ both sources</span>')
    if s.get("v") == "conflict":
        out.append('<span class="tag warn">≠ sources differ</span>')
    if s.get("derived"):
        out.append('<span class="tag">derived</span>')
    if s.get("transient"):
        out.append('<span class="tag">hours-long window</span>')
    if row.get("flag"):
        out.append('<span class="tag red">⚑ red flag</span>')
    return " ".join(out)


def notes(s):
    bits = [b for b in (s.get("cmpText"), s.get("note")) if b]
    if s.get("parts"):
        bits.append("Components: " + "; ".join(f"{p['partLabel']} {p['m']} {fmt(p['est'])} ({fmt(p['lo'])}–{fmt(p['hi'])}) [{ref_num(p['ref'])}]" for p in s["parts"]))
    if s.get("conflict"):
        bits.append(s["conflict"])
    return E(" · ".join(bits))


def axis_head():
    """Header row SVG with tick labels aligned to mini_plot's scale."""
    w, pad = 150, 4
    lo_l, hi_l = math.log(0.05), math.log(300)
    x = lambda v: pad + (math.log(v) - lo_l) / (hi_l - lo_l) * (w - 2 * pad)
    t = "".join(f'<text x="{x(v):.1f}" y="8" font-size="6.5" text-anchor="middle" fill="{"#0b0b0b" if v == 1 else "#6f6d68"}" font-weight="{"bold" if v == 1 else "normal"}">{v:g}×</text>' for v in (0.1, 1, 10, 100))
    return f'<svg width="{w}pt" height="10pt" viewBox="0 0 {w} 10">{t}</svg><div class="m">log scale · grey line = general population (1×)</div>'


AXIS_HEAD = axis_head()


def table(rows, dom, start_rank=1):
    color = COLOR[dom]
    body = []
    for i, r in enumerate(rows, start_rank):
        s = r["stat"]
        ci = f"{fmt(s['lo'])}–{fmt(s['hi'])}" if s.get("lo") is not None else "no CI"
        n = ref_num(s["ref"]) if s.get("ref") else ""
        body.append(f"""<tr>
<td class="rank">{i}</td>
<td class="factor"><b>{E(r['label'])}</b><div class="grp">{GROUP_TAG[r['group']]} {flags(s, r)}</div></td>
<td class="est"><b>{fmt(s['est'])}</b><div class="m">{E(s['m'])} · {ci}</div></td>
<td class="plot">{mini_plot(s, color)}</td>
<td class="cmp">{CMP.get(s.get('cmp'), '')}</td>
<td class="out">{E(s.get('outcome') or '')}</td>
<td class="src">{E(REFS[s['ref']]['short']) if s.get('ref') else ''} <span class="n">[{n}]</span></td>
<td class="notes">{notes(s)}</td></tr>""")
    return f"""<table><thead><tr><th>#</th><th>Factor</th><th>Estimate</th><th>{AXIS_HEAD}</th>
<th>Comparator</th><th>Outcome</th><th>Source</th><th>Comparison group &amp; notes</th></tr></thead><tbody>{''.join(body)}</tbody></table>"""


def section(dom):
    d = DOMAINS[dom]
    rows = rows_for(dom)
    q = [r for r in rows if r["stat"].get("est") is not None]
    risk = sorted([r for r in q if r["stat"]["est"] >= 1], key=lambda r: (-r["stat"]["est"], r["label"]))
    prot = sorted([r for r in q if r["stat"]["est"] < 1], key=lambda r: (-r["stat"]["est"], r["label"]))
    unq = [r for r in rows if r["stat"].get("est") is None]
    unq_html = "".join(
        f"<li><b>{E(r['label'])}</b>{' <span class=\"tag red\">⚑ red flag</span>' if r.get('flag') else ''}"
        f" ({GROUP_TAG[r['group']]}). {E(r['stat'].get('note') or r['stat'].get('conflict') or '')}"
        f" <span class='n'>[{ref_num(r['stat']['ref'])}]</span></li>" for r in unq)
    title = d["tileLabel"]
    return f"""
<h2 style="border-color:{COLOR[dom]}">{E(title)}</h2>
<p class="base"><b>General-population baseline:</b> {E(d['baseline'])}</p>
<h3>Risk factors, highest to lowest ({len(risk)})</h3>{table(risk, dom)}
<h3>Protective factors, highest to lowest ({len(prot)})</h3>
<p class="small">Values below 1 lower risk; the furthest from 1 (bottom of the table) are the most protective.</p>{table(prot, dom)}
<h3>Factors without a usable figure ({len(unq)})</h3>
<p class="small">No defensible general-population estimate exists, but several are among the strongest clinical warning signs.</p>
<ul class="unq">{unq_html}</ul>"""


sections = section("self") + '<div class="pb"></div>' + section("others")
refs_html = "".join(f"<li>{E(REFS[r]['full'])}{' ' + E(REFS[r]['url']) if REFS[r].get('url') else ''}</li>" for r in ref_order)

doc = f"""<!doctype html><html><head><meta charset="utf-8"><title>Suicide and Violence Risk Factors Ranked by Relative Risk</title>
<style>
@page {{ size: letter landscape; margin: 0.45in 0.45in 0.55in;
  @bottom-left {{ content: "Teaching reference, not a prediction instrument. {APP_URL}"; font: 7pt 'DejaVu Sans'; color: #6f6d68; }}
  @bottom-right {{ content: "Page " counter(page) " of " counter(pages); font: 7pt 'DejaVu Sans'; color: #6f6d68; }} }}
body {{ font-family: 'DejaVu Sans', sans-serif; font-size: 7.6pt; color: #0b0b0b; line-height: 1.3; }}
h1 {{ font-size: 17pt; margin: 0 0 2pt; }}
.sub {{ color: #52514e; font-size: 9pt; margin-bottom: 8pt; }}
h2 {{ font-size: 13pt; margin: 10pt 0 4pt; padding-left: 6pt; border-left: 5px solid; }}
h3 {{ font-size: 10pt; margin: 9pt 0 3pt; }}
.box {{ border: 1px solid #d9d7cf; border-radius: 6px; padding: 6pt 9pt; background: #f9f9f7; font-size: 8pt; }}
.box ul {{ margin: 3pt 0 0; padding-left: 14pt; }}
.base {{ font-size: 8pt; color: #52514e; margin: 2pt 0; }}
.small {{ font-size: 7.5pt; color: #52514e; margin: 1pt 0 3pt; }}
table {{ width: 100%; border-collapse: collapse; }}
thead {{ display: table-header-group; }}
th {{ text-align: left; font-size: 7pt; color: #52514e; border-bottom: 1.2px solid #a9a79f; padding: 3pt 3pt; }}
td {{ border-bottom: 0.6px solid #e1e0d9; padding: 2.5pt 3pt; vertical-align: top; }}
tr {{ page-break-inside: avoid; }}
td.rank {{ color: #6f6d68; width: 14pt; }}
td.factor {{ width: 140pt; }}
td.est {{ width: 52pt; font-variant-numeric: tabular-nums; }}
td.est b {{ font-size: 9.5pt; }}
.m {{ font-size: 6.6pt; color: #52514e; }}
td.plot {{ width: 154pt; vertical-align: middle; }}
td.cmp {{ width: 62pt; font-size: 7pt; }}
td.out {{ width: 58pt; font-size: 7pt; }}
td.src {{ width: 84pt; font-size: 7pt; }}
td.notes {{ font-size: 6.6pt; color: #52514e; }}
.grp {{ font-size: 6.6pt; color: #6f6d68; margin-top: 1pt; }}
.tag {{ display: inline-block; font-size: 6.2pt; padding: 0 3pt; border: 0.6px solid #c3c2b7; border-radius: 6pt; color: #52514e; }}
.tag.ok {{ border-color: #0ca30c; color: #006300; }}
.tag.warn {{ border-color: #d03b3b; color: #a32a2a; }}
.tag.red {{ border-color: #d03b3b; color: #a32a2a; }}
.n {{ color: #6f6d68; }}
ul.unq {{ font-size: 7.4pt; padding-left: 14pt; margin: 2pt 0; }}
ul.unq li {{ margin-bottom: 2pt; }}
ol.refs {{ font-size: 6.8pt; padding-left: 16pt; color: #33322f; }}
ol.refs li {{ margin-bottom: 1.5pt; }}
.pb {{ page-break-before: always; }}
.legend svg {{ vertical-align: middle; }}
</style></head><body>
<h1>Suicide &amp; Violence Risk Factors Ranked by Relative Risk</h1>
<div class="sub">Companion to the Safety Risk Formulation teaching app · {APP_URL} · Generated {date.today():%B %-d, %Y}</div>
<div class="box">
<b>How to read this.</b> Each domain lists every factor in the app, ranked by its point estimate from highest to lowest, with risk factors (estimate ≥ 1) and protective factors (&lt; 1) in separate tables.
<ul>
<li><b>Measures are not interchangeable.</b> Odds ratios (OR), relative risks (RR), hazard ratios (HR), standardized mortality ratios (SMR) and rate ratios come from different designs. The ranking is by point estimate only and is a rough ordering, not a strict comparison.</li>
<li><b>Comparator matters most.</b> Filled dots compare people with the factor to the general population. Hollow dots compare within an already-selected group (e.g., other people with psychosis, other abused women), so those figures are not population multipliers.</li>
<li><b>Outcomes differ:</b> suicide death vs attempt; violence perpetration vs homicide victimization of household members. Check the Outcome column before comparing rows.</li>
<li><b>Do not multiply rows.</b> Factors cluster in the same people, so products overstate risk. Risk factors predict suicide only slightly better than chance (Franklin 2017); "high-risk" categories miss ~44% of suicides (Large 2016).</li>
<li><b>Tags:</b> ✓✓ same figure found independently by both research sources (Gemini 4 Argon, GPT-6.1 Sol); ≠ sources reported different figures (explanation in notes); derived = calculated from two published estimates; ⚑ red flag = needs clinical action regardless of any number.</li>
</ul></div>
{sections}
<div class="pb"></div>
<h2 style="border-color:#52514e">References</h2>
<ol class="refs">{refs_html}</ol>
<p class="small">For clinical teaching only. If someone is in immediate danger call 911; for a suicidal crisis call or text 988 (US).</p>
</body></html>"""

HTML(string=doc).write_pdf(OUT)
print(OUT)
