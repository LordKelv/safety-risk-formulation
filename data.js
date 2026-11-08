/* Risk-factor data for the Safety Risk Formulation teaching tool.
   Researched independently by Gemini 4 Argon and GPT-6.1 Sol (research/gemini.md, research/gpt.md),
   reconciled by Claude. Every numeric figure carries its comparator, outcome and source.

   Stat fields:
     m       measure: OR | RR | HR | SMR | IRR | Rate ratio
     est/lo/hi   point estimate and 95% CI (null = no defensible general-population figure)
     cmp     'gp' general-population comparator | 'clin' clinical comparator | 'sub' selected subgroup
     cmpText short description of the comparison group
     outcome suicide death | suicide attempt | violence | homicide …
     ref     key into REFS
     v       'both' (found by both research models) | 'one' | 'conflict'
*/
(function () {
const R = (id, short, full, url) => { REFS[id] = { short, full, url }; };

/* ------------------------------ references ------------------------------ */
R('favril2022', 'Favril 2022, Evid Based Ment Health',
  'Favril L, Yu R, Uyar A, Sharpe M, Fazel S. Risk factors for suicide in adults: systematic review and meta-analysis of psychological autopsy studies. Evid Based Ment Health. 2022;25(4):148–155. doi:10.1136/ebmental-2022-300549',
  'https://doi.org/10.1136/ebmental-2022-300549');
R('favril2023', 'Favril 2023, Lancet Public Health',
  'Favril L, Yu R, Geddes JR, Fazel S. Individual-level risk factors for suicide mortality in the general population: an umbrella review. Lancet Public Health. 2023;8(11):e868–e877. doi:10.1016/S2468-2667(23)00207-4',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC10932753/');
R('webb2014', 'Webb 2014, J Clin Psychiatry',
  'Webb RT, Lichtenstein P, Larsson H, Geddes JR, Fazel S. Suicide, hospital-presenting suicide attempts, and criminality in bipolar disorder: examination of risk for multiple adverse outcomes. J Clin Psychiatry. 2014;75(8):e809–e816. doi:10.4088/JCP.13m08899',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC4226039/');
R('akbar2023', 'Akbar 2023, Suicide Life Threat Behav',
  'Akbar R, et al. Posttraumatic stress disorder and risk of suicidal behavior: a systematic review and meta-analysis. Suicide Life Threat Behav. 2023;53(1):163–184. PMID 36385705',
  'https://pubmed.ncbi.nlm.nih.gov/36385705/');
R('angelakis2019', 'Angelakis 2019, Psychol Med',
  'Angelakis I, Gillespie EL, Panagioti M. Childhood maltreatment and adult suicidality: a comprehensive systematic review with meta-analysis. Psychol Med. 2019;49(7):1057–1078. PMID 30608046',
  'https://pubmed.ncbi.nlm.nih.gov/30608046/');
R('va2025', 'US VA 2025 Annual Report',
  'US Department of Veterans Affairs, Office of Mental Health and Suicide Prevention. 2025 National Veteran Suicide Prevention Annual Report, Part 2 (2023 data).',
  'https://www.mentalhealth.va.gov/docs/data-sheets/2025/2025_Annual_Report_Part_2_508.pdf');
R('cdc2026', 'CDC NCHS Data Brief 572 (2024 data)',
  'Garnett MF, Zehner AE. Suicide mortality in the United States, 2004–2024. NCHS Data Brief No. 572. National Center for Health Statistics; 2026.',
  'https://www.cdc.gov/nchs/products/databriefs/db572.htm');
R('cdcHom', 'CDC FastStats: Homicide',
  'Centers for Disease Control and Prevention, National Center for Health Statistics. FastStats: Assault or Homicide (2024 final mortality).',
  'https://www.cdc.gov/nchs/FASTATS/homicide.htm');
R('saulnier2025', 'Saulnier 2025, JAMA Netw Open',
  'Saulnier KG, et al. Suicide risk factors and warning signs documented in the Comprehensive Suicide Risk Evaluation and subsequent suicide death among veterans. JAMA Netw Open. 2025. PMID 39998832',
  'https://pubmed.ncbi.nlm.nih.gov/39998832/');
R('borges2017', 'Borges 2017, Psychol Med',
  'Borges G, Bagge CL, Cherpitel CJ, Conner KR, Orozco R, Rossow I. A meta-analysis of acute use of alcohol and the risk of suicide attempt. Psychol Med. 2017;47(5):949–957. PMID 27928972',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC5340592/');
R('posner2011', 'Posner 2011, Am J Psychiatry (C-SSRS)',
  'Posner K, Brown GK, Stanley B, et al. The Columbia–Suicide Severity Rating Scale: initial validity and internal consistency findings from three multisite studies with adolescents and adults. Am J Psychiatry. 2011;168(12):1266–1277. PMID 22193671',
  'https://pubmed.ncbi.nlm.nih.gov/22193671/');
R('safet', 'SAMHSA SAFE-T (2024)',
  'Substance Abuse and Mental Health Services Administration. Suicide Assessment Five-Step Evaluation and Triage (SAFE-T). PEP24-01-036. 2024.',
  'https://library.samhsa.gov/sites/default/files/safet-flyer-pep24-01-036.pdf');
R('chung2019', 'Chung 2019, BMJ Open',
  'Chung D, Hadzi-Pavlovic D, Wang M, Swaraj S, Olfson M, Large M. Meta-analysis of suicide rates in the first week and the first month after psychiatric hospitalisation. BMJ Open. 2019;9(3):e023883. PMID 30904843',
  'https://pubmed.ncbi.nlm.nih.gov/30904843/');
R('chung2017', 'Chung 2017, JAMA Psychiatry',
  'Chung DT, Ryan CJ, Hadzi-Pavlovic D, Singh SP, Stanton C, Large MM. Suicide rates after discharge from psychiatric facilities: a systematic review and meta-analysis. JAMA Psychiatry. 2017;74(7):694–702. PMID 28564699',
  'https://pubmed.ncbi.nlm.nih.gov/28564699/');
R('cassidy2018', 'Cassidy 2018, Schizophr Bull',
  'Cassidy RM, Yang F, Kapczinski F, Passos IC. Risk factors for suicidality in patients with schizophrenia: a systematic review, meta-analysis, and meta-regression of 96 studies. Schizophr Bull. 2018;44(4):787–797.',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC6007264/');
R('fazel2009', 'Fazel 2009, PLoS Med',
  'Fazel S, Gulati G, Linsell L, Geddes JR, Grann M. Schizophrenia and violence: systematic review and meta-analysis. PLoS Med. 2009;6(8):e1000120. PMID 19668362',
  'https://pubmed.ncbi.nlm.nih.gov/19668362/');
R('fazel2010', 'Fazel 2010, Arch Gen Psychiatry',
  'Fazel S, Lichtenstein P, Grann M, Goodwin GM, Långström N. Bipolar disorder and violent crime: new evidence from population-based longitudinal studies and systematic review. Arch Gen Psychiatry. 2010;67(9):931–938. PMID 20819987',
  'https://pubmed.ncbi.nlm.nih.gov/20819987/');
R('fazel2015', 'Fazel 2015, Lancet Psychiatry',
  'Fazel S, Wolf A, Chang Z, Larsson H, Goodwin GM, Lichtenstein P. Depression and violence: a Swedish population study. Lancet Psychiatry. 2015;2(3):224–232. doi:10.1016/S2215-0366(14)00128-X',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC4520382/');
R('chow2025', 'Chow 2025, Br J Psychiatry',
  'Chow RTS, Yu R, Geddes JR, Fazel S. Personality disorders, violence and antisocial behaviour: updated systematic review and meta-regression analysis. Br J Psychiatry. 2025. doi:10.1192/bjp.2024.226',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC12278050/');
R('paulino2023', 'Paulino 2023, Lancet Public Health',
  'Paulino S, et al. Post-traumatic stress disorder and violent crime: a Swedish population-based cohort and sibling-comparison study. Lancet Public Health. 2023. PMID 37244673',
  'https://pubmed.ncbi.nlm.nih.gov/37244673/');
R('fazel2011', 'Fazel 2011, PLoS Med',
  'Fazel S, Lichtenstein P, Grann M, Långström N. Risk of violent crime in individuals with epilepsy and traumatic brain injury: a 35-year Swedish population study. PLoS Med. 2011;8(12):e1001150. PMID 22215988',
  'https://pubmed.ncbi.nlm.nih.gov/22215988/');
R('lagerberg2025', 'Lagerberg 2025, Br J Psychiatry',
  'Lagerberg T, et al. Risk factors for violence in psychosis: updated systematic review and meta-analysis of longitudinal studies. Br J Psychiatry. 2025. doi:10.1192/bjp.2024.120',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC7617503/');
R('witt2013', 'Witt 2013, PLoS ONE',
  'Witt K, van Dorn R, Fazel S. Risk factors for violence in psychosis: systematic review and meta-regression analysis of 110 studies. PLoS ONE. 2013;8(2):e55942. doi:10.1371/journal.pone.0055942',
  'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0055942');
R('hcr20', 'Douglas 2013, HCR-20 V3',
  'Douglas KS, Hart SD, Webster CD, Belfrage H. HCR-20 V3: Assessing Risk for Violence. Burnaby, BC: Mental Health, Law, and Policy Institute, Simon Fraser University; 2013.',
  'https://www.sfu.ca/psychology/research/drl/hcr-20--version-3-/');
R('ullrich2014', 'Ullrich 2014, Schizophr Bull',
  'Ullrich S, Keers R, Coid JW. Delusions, anger, and serious violence: new findings from the MacArthur Violence Risk Assessment Study. Schizophr Bull. 2014;40(5):1174–1181. doi:10.1093/schbul/sbt126',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC4133660/');
R('campbell2003', 'Campbell 2003, Am J Public Health',
  'Campbell JC, Webster D, Koziol-McLain J, et al. Risk factors for femicide in abusive relationships: results from a multisite case control study. Am J Public Health. 2003;93(7):1089–1097. PMID 12835191',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC1447915/');
R('glass2008', 'Glass 2008, J Emerg Med',
  'Glass N, Laughon K, Campbell J, et al. Non-fatal strangulation is an important risk factor for homicide of women. J Emerg Med. 2008;35(3):329–335. PMID 17961956',
  'https://pubmed.ncbi.nlm.nih.gov/17961956/');
R('anglemyer2014', 'Anglemyer 2014, Ann Intern Med',
  'Anglemyer A, Horvath T, Rutherford G. The accessibility of firearms and risk for suicide and homicide victimization among household members: a systematic review and meta-analysis. Ann Intern Med. 2014;160(2):101–110. doi:10.7326/M13-1301',
  'https://doi.org/10.7326/M13-1301');
R('studdert2020', 'Studdert 2020, N Engl J Med',
  'Studdert DM, Zhang Y, Swanson SA, et al. Handgun ownership and suicide in California. N Engl J Med. 2020;382(23):2220–2229. PMID 32492303',
  'https://pubmed.ncbi.nlm.nih.gov/32492303/');
R('studdert2022', 'Studdert 2022, Ann Intern Med',
  'Studdert DM, Zhang Y, Holsinger EE, et al. Homicide deaths among adult cohabitants of handgun owners in California, 2004 to 2016: a cohort study. Ann Intern Med. 2022;175(6):804–811. PMID 35377715',
  'https://pubmed.ncbi.nlm.nih.gov/35377715/');
R('cipriani2013', 'Cipriani 2013, BMJ',
  'Cipriani A, Hawton K, Stockton S, Geddes JR. Lithium in the prevention of suicide in mood disorders: updated systematic review and meta-analysis. BMJ. 2013;346:f3646. PMID 23814104',
  'https://pubmed.ncbi.nlm.nih.gov/23814104/');
R('riblet2022', 'Riblet 2022, BJPsych Open',
  'Riblet NB, Shiner B, Young-Xu Y, Watts BV. Lithium in the prevention of suicide in adults: systematic review and meta-analysis of clinical trials. BJPsych Open. 2022;8(6):e199. PMID 36384820',
  'https://pubmed.ncbi.nlm.nih.gov/36384820/');
R('meltzer2003', 'Meltzer 2003, Arch Gen Psychiatry (InterSePT)',
  'Meltzer HY, Alphs L, Green AI, et al. Clozapine treatment for suicidality in schizophrenia: International Suicide Prevention Trial (InterSePT). Arch Gen Psychiatry. 2003;60(1):82–91. PMID 12511175',
  'https://pubmed.ncbi.nlm.nih.gov/12511175/');
R('vanderweele2016', 'VanderWeele 2016, JAMA Psychiatry',
  'VanderWeele TJ, Li S, Tsai AC, Kawachi I. Association between religious service attendance and lower suicide rates among US women. JAMA Psychiatry. 2016;73(8):845–851. PMID 27367927',
  'https://pubmed.ncbi.nlm.nih.gov/27367927/');
R('stanley2018', 'Stanley 2018, JAMA Psychiatry',
  'Stanley B, Brown GK, Brenner LA, et al. Comparison of the Safety Planning Intervention with follow-up vs usual care of suicidal patients treated in the emergency department. JAMA Psychiatry. 2018;75(9):894–900. PMID 29998307',
  'https://pubmed.ncbi.nlm.nih.gov/29998307/');
R('shenassa2004', 'Shenassa 2004, J Epidemiol Community Health',
  'Shenassa ED, Rogers ML, Spalding KL, Roberts MB. Safer storage of firearms at home and risk of suicide: a study of protective factors in a nationally representative sample. J Epidemiol Community Health. 2004;58(10):841–848. PMID 15365110',
  'https://pubmed.ncbi.nlm.nih.gov/15365110/');
R('miller2025', 'Miller 2025, JAMA Netw Open',
  'Miller M, et al. Firearm storage and firearm suicide. JAMA Netw Open. 2025.',
  'https://pmc.ncbi.nlm.nih.gov/articles/PMC12235496/');
R('fazel2014', 'Fazel 2014, Lancet',
  'Fazel S, Zetterqvist J, Larsson H, Långström N, Lichtenstein P. Antipsychotics, mood stabilisers, and risk of violent crime. Lancet. 2014;384(9949):1206–1214. PMID 24816046',
  'https://pubmed.ncbi.nlm.nih.gov/24816046/');
R('franklin2017', 'Franklin 2017, Psychol Bull',
  'Franklin JC, Ribeiro JD, Fox KR, et al. Risk factors for suicidal thoughts and behaviors: a meta-analysis of 50 years of research. Psychol Bull. 2017;143(2):187–232. PMID 27841450',
  'https://pubmed.ncbi.nlm.nih.gov/27841450/');
R('large2016', 'Large 2016, PLoS ONE',
  'Large M, Kaneson M, Myles N, Myles H, Gunaratne P, Ryan C. Meta-analysis of longitudinal cohort studies of suicide risk assessment among psychiatric patients: heterogeneity in results and lack of improvement over time. PLoS ONE. 2016;11(6):e0156322.',
  'https://pubmed.ncbi.nlm.nih.gov/27285387/');
R('swanson1990', 'Swanson 1990, Hosp Community Psychiatry',
  'Swanson JW, Holzer CE, Ganju VK, Jono RT. Violence and psychiatric disorder in the community: evidence from the Epidemiologic Catchment Area surveys. Hosp Community Psychiatry. 1990;41(7):761–770. PMID 2142118',
  'https://pubmed.ncbi.nlm.nih.gov/2142118/');
R('nsduh2024', 'SAMHSA NSDUH 2024',
  'Substance Abuse and Mental Health Services Administration. 2024 National Survey on Drug Use and Health: companion report. 2025.',
  'https://www.samhsa.gov/data/sites/default/files/reports/rpt56462/2024-nsduh-companion-report.pdf');
R('stanleybrown', 'Stanley & Brown 2012 (Safety Planning)',
  'Stanley B, Brown GK. Safety Planning Intervention: a brief intervention to mitigate suicide risk. Cogn Behav Pract. 2012;19(2):256–264.',
  'https://suicidesafetyplan.com/');
R('calm', 'SPRC: CALM',
  'Suicide Prevention Resource Center. CALM: Counseling on Access to Lethal Means.',
  'https://sprc.org/resources/calm-counseling-on-access-to-lethal-means/');
R('jcNPSG', 'Joint Commission NPSG 15.01.01',
  'The Joint Commission. National Patient Safety Goal 15.01.01: Reduce the risk for suicide.',
  'https://www.jointcommission.org/en-us/knowledge-library/suicide-prevention');
R('fazelOxMIS', 'Fazel 2019, Transl Psychiatry (OxMIS)',
  'Fazel S, Wolf A, Larsson H, Mallett S, Fanshawe TR. The prediction of suicide in severe mental illness: development and validation of a clinical prediction rule (OxMIS). Transl Psychiatry. 2019;9:98.',
  'https://www.nature.com/articles/s41398-019-0428-3');

/* ---- references added from the Gemini 4 Argon register ---- */
R('gradus2010', 'Gradus 2010, Am J Epidemiol',
  'Gradus JL, Qin P, Lincoln AK, et al. Posttraumatic stress disorder and completed suicide. Am J Epidemiol. 2010;171(6):721–727. PMID 20164191',
  'https://pubmed.ncbi.nlm.nih.gov/20164191/');
R('chesney2014', 'Chesney 2014, World Psychiatry',
  'Chesney E, Goodwin GM, Fazel S. Risks of all-cause and suicide mortality in mental disorders: a meta-review. World Psychiatry. 2014;13(2):153–160. PMID 24890068',
  'https://pubmed.ncbi.nlm.nih.gov/24890068/');
R('ilgen2013', 'Ilgen 2013, JAMA Psychiatry',
  'Ilgen MA, Kleinberg F, Ignacio RV, et al. Noncancer pain conditions and risk of suicide. JAMA Psychiatry. 2013;70(7):692–697. PMID 23699975',
  'https://pubmed.ncbi.nlm.nih.gov/23699975/');
R('hughes2017', 'Hughes 2017, Lancet Public Health',
  'Hughes K, Bellis MA, Hardcastle KA, et al. The effect of multiple adverse childhood experiences on health: a systematic review and meta-analysis. Lancet Public Health. 2017;2(8):e356–e366. PMID 29253477',
  'https://pubmed.ncbi.nlm.nih.gov/29253477/');
R('erlangsen2023', 'Erlangsen 2023, JAMA',
  'Erlangsen A, Jacobsen AL, Ranning A, Delamare AL, Nordentoft M, Frisch M. Transgender identity and suicide attempts and mortality in Denmark. JAMA. 2023;329(24):2145–2153. PMID 37367977',
  'https://pubmed.ncbi.nlm.nih.gov/37367977/');
R('miranda2017', 'Miranda-Mendizábal 2017, Br J Psychiatry',
  'Miranda-Mendizábal A, Castellví P, Parés-Badell O, et al. Sexual orientation and suicidal behaviour in adolescents and young adults: systematic review and meta-analysis. Br J Psychiatry. 2017;211(2):77–87. PMID 28254960',
  'https://pubmed.ncbi.nlm.nih.gov/28254960/');
R('va2024', 'US VA 2024 Annual Report',
  'US Department of Veterans Affairs. National Veteran Suicide Prevention Annual Report (age- and sex-adjusted comparison with non-veteran US adults).',
  'https://www.mentalhealth.va.gov/suicide_prevention/data.asp');
R('ribeiro2018', 'Ribeiro 2018, Br J Psychiatry',
  'Ribeiro JD, Huang X, Fox KR, Franklin JC. Depression and hopelessness as risk factors for suicide ideation, attempts and death: meta-analysis of longitudinal studies. Br J Psychiatry. 2018;212(5):279–286. PMID 29587888',
  'https://pubmed.ncbi.nlm.nih.gov/29587888/');
R('hawton2005', 'Hawton 2005, Br J Psychiatry',
  'Hawton K, Sutton L, Haw C, Sinclair J, Deeks JJ. Schizophrenia and suicide: systematic review of risk factors. Br J Psychiatry. 2005;187:9–20. PMID 15994566',
  'https://pubmed.ncbi.nlm.nih.gov/15994566/');
R('pratt2006', 'Pratt 2006, Lancet',
  'Pratt D, Piper M, Appleby L, Webb R, Shaw J. Suicide in recently released prisoners: a population-based cohort study. Lancet. 2006;368(9530):119–123. PMID 16829295',
  'https://pubmed.ncbi.nlm.nih.gov/16829295/');
R('wintemute1999', 'Wintemute 1999, N Engl J Med',
  'Wintemute GJ, Parham CA, Beaumont JJ, Wright M, Drake C. Mortality among recent purchasers of handguns. N Engl J Med. 1999;341(21):1583–1589. PMID 10564688',
  'https://pubmed.ncbi.nlm.nih.gov/10564688/');
R('tiihonen2009', 'Tiihonen 2009, Lancet',
  'Tiihonen J, Lönnqvist J, Wahlbeck K, et al. 11-year follow-up of mortality in patients with schizophrenia: a population-based cohort study (FIN11 study). Lancet. 2009;374(9690):620–627. PMID 19595447',
  'https://pubmed.ncbi.nlm.nih.gov/19595447/');
R('dehara2021', 'Dehara 2021, Acta Psychiatr Scand',
  'Dehara M, Wells MB, Sjöqvist H, et al. Parenthood is associated with lower suicide risk: a register-based cohort study of 1.5 million Swedes. Acta Psychiatr Scand. 2021;143(3):206–215. PMID 33067802',
  'https://pubmed.ncbi.nlm.nih.gov/33067802/');
R('kyung2018', 'Kyung-Sook 2018, Soc Sci Med',
  'Kyung-Sook W, SangSoo S, Sangjin S, Young-Jeon S. Marital status integration and suicide: a meta-analysis and meta-regression. Soc Sci Med. 2018;197:116–126. PMID 29227910',
  'https://pubmed.ncbi.nlm.nih.gov/29227910/');
R('lizardi2007', 'Lizardi 2007, J Nerv Ment Dis',
  'Lizardi D, Currier D, Galfalvy H, et al. Perceived reasons for living at index hospitalization and future suicide attempt. J Nerv Ment Dis. 2007;195(5):451–455. PMID 17502812',
  'https://pubmed.ncbi.nlm.nih.gov/17502812/');
R('molero2018', 'Molero 2018, Am J Psychiatry',
  'Molero Y, Zetterqvist J, Binswanger IA, et al. Medications for alcohol and opioid use disorders and risk of suicidal behavior, accidental overdoses, and crime. Am J Psychiatry. 2018;175(10):970–978. PMID 30068260',
  'https://pubmed.ncbi.nlm.nih.gov/30068260/');
R('fazel2018', 'Fazel 2018, Br J Psychiatry',
  'Fazel S, Smith EN, Chang Z, Geddes JR. Risk factors for interpersonal violence: an umbrella review of meta-analyses. Br J Psychiatry. 2018;213(4):609–614. PMID 30058516',
  'https://pubmed.ncbi.nlm.nih.gov/30058516/');
R('whiting2022', 'Whiting 2022, JAMA Psychiatry',
  'Whiting D, Gulati G, Geddes JR, Fazel S. Association of schizophrenia spectrum disorders and violence perpetration in adults and adolescents from 15 countries: a systematic review and meta-analysis. JAMA Psychiatry. 2022;79(2):120–132. PMID 34935869',
  'https://pubmed.ncbi.nlm.nih.gov/34935869/');
R('yukhnenko2019', 'Yukhnenko 2019, CNS Spectr',
  'Yukhnenko D, Sridhar S, Fazel S. A systematic review of criminal recidivism rates worldwide: 3-year update. Wellcome Open Res / CNS Spectr. 2019. PMID 31185959',
  'https://pubmed.ncbi.nlm.nih.gov/31185959/');
R('bjsHomicide', 'BJS / FBI Supplementary Homicide Reports',
  'Cooper A, Smith EL. Homicide Trends in the United States, 1980–2008. Bureau of Justice Statistics; 2011; and FBI Uniform Crime Reporting Supplementary Homicide Reports (offender sex where known).',
  'https://bjs.ojp.gov/library/publications/homicide-trends-united-states-1980-2008');
R('haggard2006', 'Haggård-Grann 2006, Addiction',
  'Haggård-Grann U, Hallqvist J, Långström N, Möller J. The role of alcohol and drugs in triggering criminal violence: a case-crossover study. Addiction. 2006;101(1):100–108. PMID 16393196',
  'https://pubmed.ncbi.nlm.nih.gov/16393196/');
R('keers2014', 'Keers 2014, Am J Psychiatry',
  'Keers R, Ullrich S, DeStavola BL, Coid JW. Association of violence with emergence of persecutory delusions in untreated schizophrenia. Am J Psychiatry. 2014;171(3):332–339. PMID 24220644',
  'https://pubmed.ncbi.nlm.nih.gov/24220644/');
R('vanveen2022', 'van Veen 2022, Sleep Med Rev',
  'van Veen MM, Lancel M, Şener O, Verkes RJ, Bouman EJ, Rutters F. Observational and experimental studies on sleep duration and aggression: a systematic review and meta-analysis. Sleep Med Rev. 2022;64:101661. PMID 35810548',
  'https://pubmed.ncbi.nlm.nih.gov/35810548/');
R('steadman1998', 'Steadman 1998, Arch Gen Psychiatry',
  'Steadman HJ, Mulvey EP, Monahan J, et al. Violence by people discharged from acute psychiatric inpatient facilities and by others in the same neighborhoods. Arch Gen Psychiatry. 1998;55(5):393–401. PMID 9596041',
  'https://pubmed.ncbi.nlm.nih.gov/9596041/');
R('ullrich2011', 'Ullrich & Coid 2011, J Consult Clin Psychol',
  'Ullrich S, Coid J. Protective factors for violence among released prisoners: effects over time and interactions with static risk. J Consult Clin Psychol. 2011;79(3):381–390. PMID 21500889',
  'https://pubmed.ncbi.nlm.nih.gov/21500889/');
R('bhavsar2020', 'Bhavsar 2020, Schizophr Bull',
  'Bhavsar V, Kosidou K, Widman L, et al. Clozapine treatment and offending: a within-subject study of patients with psychotic disorders in Sweden. Schizophr Bull. 2020;46(2):303–310. PMID 31150553',
  'https://pubmed.ncbi.nlm.nih.gov/31150553/');

/* ------------------------------ helpers ------------------------------ */
// v: 'both' = same figure found independently by Gemini 4 Argon and GPT-6.1 Sol
//    'one'  = one model only (source cited)    'conflict' = models reported different figures
const S = (m, est, lo, hi, cmp, outcome, ref, extra = {}) => Object.assign({ m, est, lo, hi, cmp, outcome, ref, v: 'one' }, extra);
const B = (m, est, lo, hi, cmp, outcome, ref, extra = {}) => S(m, est, lo, hi, cmp, outcome, ref, Object.assign({ v: 'both' }, extra));
const C = (m, est, lo, hi, cmp, outcome, ref, conflict, extra = {}) => S(m, est, lo, hi, cmp, outcome, ref, Object.assign({ v: 'conflict', conflict }, extra));
const NUL = (ref, note, outcome) => ({ m: null, est: null, lo: null, hi: null, cmp: null, outcome, ref, note, v: 'one' });

/* ============================== HARM TO SELF ============================== */
DOMAINS.self = {
  short: 'Self', tileLabel: 'Harm to self (suicide)', chartTitle: 'Harm to self: per-factor association vs general population',
  baseline: 'US suicide deaths: 13.7 per 100,000 per year (2024, age-adjusted; men 22.3, women 5.6; men ≥75: 40.1). Past-year attempts: ~0.8% of adults.',
  groups: [
  { key: 'chronic', title: 'Chronic / static', desc: 'enduring vulnerability', items: [
    { id: 'sex', short: 'Sex/age', label: 'Sex and age (demographic baseline)', demo: true,
      hint: 'Rate ratio relative to the overall US suicide rate. Applied as a baseline, not damped. Shared with the harm-to-others tab.',
      options: [
        { id: 'none', label: 'Not specified', none: true },
        { id: 'male', sex: 'male', label: 'Male', short: 'male', stat: B('Rate ratio', 1.63, null, null, 'gp', 'suicide death', 'cdc2026', { cmpText: '22.3 vs 13.7 per 100k overall (2024, age-adjusted)' }) },
        { id: 'male75', sex: 'male', label: 'Male, age 75 or older', short: 'male ≥75', stat: S('Rate ratio', 2.78, null, null, 'gp', 'suicide death', 'cdc2026', { cmpText: '40.1 vs 14.4 per 100k overall (2024, crude)', note: 'Highest-rate US group; firearms predominate.' }) },
        { id: 'female', sex: 'female', label: 'Female', short: 'female', stat: B('Rate ratio', 0.41, null, null, 'gp', 'suicide death', 'cdc2026', { cmpText: '5.6 vs 13.7 per 100k overall (2024)', note: 'Women attempt more often; men die more often.' }) },
      ] },
    { id: 'prior_attempt', label: 'Prior suicide attempt or self-harm', stat: B('OR', 16.3, 7.5, 35.5, 'gp', 'suicide death', 'favril2023', { note: 'Strongest chronic predictor. Within clinical cohorts the incremental OR is much smaller (≈2.2; Franklin 2017).' }) },
    { id: 'nssi', label: 'History of non-suicidal self-injury', stat: S('OR', 4.15, 2.89, 6.92, 'clin', 'suicide attempt', 'franklin2017', { cmpText: 'longitudinal cohorts without NSSI (mixed clinical/community)' }) },
    { id: 'prior_hosp', label: 'Prior psychiatric hospitalization', stat: S('OR', 3.57, 2.81, 4.53, 'clin', 'suicide death', 'franklin2017', { cmpText: 'longitudinal cohorts without prior hospitalization', note: 'Any psychiatric treatment history vs community controls: OR 10.5 (Favril 2022).' }) },
    { id: 'depression', label: 'Depressive disorder', stat: B('OR', 11.0, 7.3, 16.5, 'gp', 'suicide death', 'favril2022', { cmpText: 'psychological-autopsy community controls', note: 'All mood disorders vs general population: RR 12.3 (Favril 2023).' }) },
    { id: 'bipolar', label: 'Bipolar disorder', stat: C('RR', 18.8, 16.0, 22.2, 'gp', 'suicide death', 'webb2014',
        'Sources differ: Swedish registry RR 18.8 (Webb 2014; consistent with SMR 17 in Chesney 2014) vs psychological-autopsy OR 4.6 (2.1–10.1; Favril 2022). Registry figure shown.', { cmpText: 'matched population controls, Sweden' }) },
    { id: 'schizophrenia', label: 'Schizophrenia-spectrum disorder', stat: B('OR', 7.8, 4.5, 13.5, 'gp', 'suicide death', 'favril2022', { cmpText: 'psychological-autopsy community controls', note: 'Umbrella-review RR 13.2 (8.6–20.3; Favril 2023). Highest early in illness.' }) },
    { id: 'bpd', label: 'Borderline personality disorder', stat: B('OR', 9.0, 5.6, 14.4, 'gp', 'suicide death', 'favril2022') },
    { id: 'aspd', label: 'Antisocial personality disorder', stat: B('OR', 3.4, 2.0, 6.1, 'gp', 'suicide death', 'favril2022') },
    { id: 'anxiety', label: 'Anxiety disorder', stat: S('RR', 4.1, 2.4, 6.9, 'gp', 'suicide death', 'favril2023') },
    { id: 'ptsd', label: 'PTSD', stat: C('OR', 5.3, 3.4, 8.1, 'gp', 'suicide death', 'gradus2010',
        'Sources differ: Danish population case-control OR 5.3, adjusted for other psychiatric diagnoses (Gradus 2010) vs mixed-sample meta-analysis RR 2.09 (1.11–3.94; Akbar 2023). Population figure shown.', { cmpText: 'Danish population controls' }) },
    { id: 'adhd', label: 'ADHD', stat: S('OR', 6.7, 3.2, 13.8, 'gp', 'suicide death', 'favril2023', { note: 'Wide prediction interval; largely mediated by impulsivity and comorbidity.' }) },
    { id: 'sud', label: 'Substance use disorder (any)', stat: B('RR', 4.4, 2.9, 6.8, 'gp', 'suicide death', 'favril2023') },
    { id: 'aud', label: 'Alcohol use disorder', stat: S('OR', 3.2, 2.3, 4.4, 'gp', 'suicide death', 'favril2022', { note: 'Overlaps with "any SUD": tick one.' }) },
    { id: 'oud', label: 'Opioid use disorder', stat: S('SMR', 13.5, null, null, 'gp', 'suicide death', 'chesney2014', { note: 'No pooled CI; intentional vs accidental overdose often misclassified.' }) },
    { id: 'anorexia', label: 'Anorexia nervosa', stat: B('RR', 6.9, 4.1, 11.5, 'gp', 'suicide death', 'favril2023') },
    { id: 'parental_suicide', label: 'Parent or first-degree relative died by suicide', stat: B('RR', 3.0, 2.5, 3.5, 'gp', 'suicide death', 'favril2023', { note: 'Any family history of suicide: OR 3.7 (Favril 2022).' }) },
    { id: 'aces4', label: '4 or more adverse childhood experiences', stat: S('OR', 30.14, 14.73, 61.67, 'gp', 'suicide attempt', 'hughes2017', { cmpText: 'adults with 0 ACEs', note: 'Cumulative-exposure contrast; overlaps with the abuse items below, so tick one or the other.' }) },
    { id: 'csa', label: 'Childhood sexual abuse', stat: S('OR', 3.17, 2.76, 3.64, 'gp', 'suicide attempt', 'angelakis2019', { note: 'Mostly retrospective.' }) },
    { id: 'cpa', label: 'Childhood physical abuse', stat: S('OR', 2.52, 2.09, 3.04, 'gp', 'suicide attempt', 'angelakis2019') },
    { id: 'cea', label: 'Childhood emotional abuse', stat: S('OR', 2.49, 1.64, 3.77, 'gp', 'suicide attempt', 'angelakis2019') },
    { id: 'state_care', label: 'Foster or state care in childhood', stat: S('RR', 3.4, 2.4, 4.7, 'gp', 'suicide death', 'favril2023') },
    { id: 'tbi', label: 'Concussion / traumatic brain injury', stat: B('RR', 2.0, 1.5, 2.8, 'gp', 'suicide death', 'favril2023') },
    { id: 'epilepsy', label: 'Epilepsy', stat: B('RR', 2.9, 2.2, 3.8, 'gp', 'suicide death', 'favril2023') },
    { id: 'cancer', label: 'Cancer', stat: B('SMR', 1.9, 1.6, 2.2, 'gp', 'suicide death', 'favril2023', { note: 'Highest in the first 6–12 months after diagnosis.' }) },
    { id: 'copd', label: 'COPD', stat: B('OR', 1.9, 1.3, 2.9, 'gp', 'suicide death', 'favril2023') },
    { id: 'diabetes', label: 'Diabetes', stat: B('RR', 1.6, 1.3, 1.9, 'gp', 'suicide death', 'favril2023') },
    { id: 'chronic_pain', label: 'Chronic non-cancer pain', stat: S('HR', 1.33, 1.22, 1.45, 'sub', 'suicide death', 'ilgen2013', { cmpText: 'VHA patients without the pain condition', note: 'Back pain shown (99% CI); psychogenic pain HR 2.61.' }) },
    { id: 'offending', label: 'Criminal offending history', stat: B('OR', 4.5, 2.1, 9.7, 'gp', 'suicide death', 'favril2023') },
    { id: 'unemployment', label: 'Unemployment', stat: S('OR', 1.9, 1.4, 2.5, 'gp', 'suicide death', 'favril2023', { note: 'Psychological-autopsy OR 3.8 (Favril 2022).' }) },
    { id: 'living_alone', label: 'Living alone / socially isolated', stat: S('OR', 2.3, 1.5, 3.4, 'gp', 'suicide death', 'favril2022', { note: 'Subjective social isolation OR 4.0.' }) },
    { id: 'veteran', label: 'US military veteran', stat: C('Rate ratio', 1.72, null, null, 'gp', 'suicide death', 'va2024',
        'Sources differ: VA age- and sex-adjusted rate 71.8% higher than non-veteran adults (Gemini) vs indirectly standardized SMR 1.18 for 2023 (VA 2025 report; GPT). Older figure shown.', { cmpText: 'non-veteran US adults, age/sex adjusted' }) },
    { id: 'transgender', label: 'Transgender identity', stat: S('IRR', 3.5, 2.0, 6.3, 'gp', 'suicide death', 'erlangsen2023', { cmpText: 'non-transgender Danish population', note: 'Suicide attempts IRR 7.7.' }) },
    { id: 'lgb', label: 'Lesbian, gay or bisexual identity', stat: S('OR', 2.26, 1.60, 3.20, 'gp', 'suicide attempt', 'miranda2017', { cmpText: 'heterosexual peers (youth/young adult cohorts)', note: 'No death-rate figure: orientation not recorded on death certificates.' }) },
  ] },
  { key: 'acute', title: 'Acute / dynamic', desc: 'recent change & warning signs', items: [
    { id: 'ideation', short: 'Suicidal ideation', label: 'Suicidal ideation (C-SSRS severity, past month)',
      hint: 'Figure is for any ideation vs none. Within suicidal patients, intent/plan adds further risk: OR 3.26 (1.02–10.45) for attempts (Posner 2011).',
      options: [
        { id: 'none', label: 'None', none: true },
        { id: 'passive', label: 'Wish to be dead (passive)', short: 'passive wish to be dead', stat: B('RR', 5.6, 3.1, 10.1, 'gp', 'suicide death', 'favril2023') },
        { id: 'active', label: 'Active thoughts, no method', short: 'active, no method', stat: B('RR', 5.6, 3.1, 10.1, 'gp', 'suicide death', 'favril2023') },
        { id: 'method', label: 'Active with method, no intent', short: 'active with method', stat: B('RR', 5.6, 3.1, 10.1, 'gp', 'suicide death', 'favril2023') },
        { id: 'intent', label: 'Active with some intent, no plan (C-SSRS 4)', short: 'intent without plan', flag: 'Suicidal intent (C-SSRS level 4)', stat: B('RR', 5.6, 3.1, 10.1, 'gp', 'suicide death', 'favril2023', { note: 'This RR understates intent.' }) },
        { id: 'plan', label: 'Active with specific plan and intent (C-SSRS 5)', short: 'plan with intent', flag: 'Specific plan with intent (C-SSRS level 5)', stat: B('RR', 5.6, 3.1, 10.1, 'gp', 'suicide death', 'favril2023', { note: 'This RR understates plan with intent.' }) },
      ] },
    { id: 'recent_attempt', label: 'Attempt, interrupted or aborted attempt in past 3 months', flag: 'Recent suicidal behavior', stat: NUL('posner2011', 'Recency sharply amplifies the lifetime-attempt association; no single general-population figure.', 'suicide death') },
    { id: 'preparations', label: 'Preparatory behavior (note, giving away possessions, rehearsal)', flag: 'Preparatory behavior', stat: S('HR', 2.15, 1.27, 3.62, 'clin', 'suicide death', 'saulnier2025', { cmpText: 'veterans assessed for suicide risk without this item', note: '30-day outcome, adjusted.' }) },
    { id: 'discharge', label: 'Discharged from psychiatric inpatient care in past 3 months', flag: 'Recent psychiatric discharge (highest risk in first week)',
      stat: Object.assign(NUL('chung2019', 'Suicide rate ≈2,950/100k person-years in week 1, ≈2,060 in month 1 (Chung 2019) and ≈1,132 over 3 months (Chung 2017), vs 13.7 in the US population: roughly 80–200×. Pooled international rates, so not entered as an RR.', 'suicide death'), { v: 'both' }) },
    { id: 'prison_release', label: 'Released from prison in past year', short: 'Recent prison release', stat: S('SMR', 8.3, 7.5, 9.3, 'gp', 'suicide death', 'pratt2006', { cmpText: 'age-matched male population, England & Wales', note: 'Women: SMR 35.8. 21% of post-release suicides occur in the first 28 days.' }) },
    { id: 'life_event', label: 'Major adverse life event, loss or humiliation in past month', stat: S('OR', 10.4, 7.1, 15.3, 'gp', 'suicide death', 'favril2022', { note: 'Steep decay: OR 2.9 at 3 months.' }) },
    { id: 'relationship', label: 'Recent relationship conflict or breakup', stat: B('OR', 5.0, 3.3, 7.6, 'gp', 'suicide death', 'favril2022') },
    { id: 'legal', label: 'Legal problems / pending charges', stat: B('OR', 4.8, 2.4, 9.4, 'gp', 'suicide death', 'favril2022') },
    { id: 'financial', label: 'Acute financial problems', stat: S('OR', 2.8, 2.0, 4.0, 'gp', 'suicide death', 'favril2022') },
    { id: 'bereavement', label: 'Recent bereavement', stat: B('OR', 1.2, 0.5, 3.1, 'gp', 'suicide death', 'favril2022', { note: 'Imprecise; CI includes 1. Spousal loss in older men may matter more.' }) },
    { id: 'hopelessness', label: 'Hopelessness', stat: S('OR', 1.98, 1.46, 2.69, 'clin', 'suicide death', 'ribeiro2018', { cmpText: 'longitudinal cohorts without elevated hopelessness', note: 'Within schizophrenia: OR 4.64 (Cassidy 2018).' }) },
    { id: 'agitation', label: 'Agitation, severe anxiety or panic', stat: S('HR', 1.80, 1.16, 2.81, 'clin', 'suicide death', 'saulnier2025', { cmpText: 'veterans assessed for suicide risk without this item', note: 'Schizophrenia: agitation OR 2.61 (Hawton 2005). Consider akathisia.' }) },
    { id: 'insomnia', label: 'Insomnia / sleep disturbance', stat: B('RR', 1.8, 1.3, 2.4, 'gp', 'suicide death', 'favril2023') },
    { id: 'alcohol', short: 'Acute alcohol', label: 'Acute alcohol use (now or in past 24 h)',
      options: [
        { id: 'none', label: 'None', none: true },
        { id: 'any', label: 'Any acute alcohol use', short: 'any acute use', stat: B('OR', 6.97, 4.77, 10.17, 'gp', 'suicide attempt', 'borges2017', { cmpText: 'no acute use; case-control & case-crossover', transient: true, note: 'Risk window is hours, so excluded from the combined (annual-scale) estimate. Low-dose OR 2.71.' }) },
        { id: 'heavy', label: 'Heavy acute use / intoxication', short: 'heavy acute use', flag: 'Acute heavy intoxication', stat: B('OR', 37.18, 17.38, 79.53, 'gp', 'suicide attempt', 'borges2017', { cmpText: 'no acute use', transient: true, note: 'Risk window is hours, so excluded from the combined estimate. Four studies.' }) },
      ] },
    { id: 'nonadherence', label: 'Stopped or nonadherent with treatment', stat: S('OR', 3.75, 2.20, 6.37, 'clin', 'suicide death', 'hawton2005', { cmpText: 'adherent patients with schizophrenia', note: 'Abrupt lithium or clozapine discontinuation is especially risky.' }) },
    { id: 'command_halluc', label: 'Command hallucinations to self-harm', stat: NUL('hawton2005', 'No usable estimate: hallucinations in general showed an inverse association in schizophrenia (OR 0.50), likely confounded. Assess content, intent and compliance.', 'suicide death') },
  ] },
  { key: 'means', title: 'Firearms & lethal means', desc: 'access to method', items: [
    { id: 'firearm', short: 'Firearm access', label: 'Firearm access',
      options: [
        { id: 'none', label: 'No firearm access', none: true },
        { id: 'household', label: 'Firearm in the household', short: 'household firearm', stat: B('OR', 3.24, 2.41, 4.40, 'gp', 'suicide death', 'anglemyer2014', { cmpText: 'household members without firearm access' }) },
        { id: 'owner', label: 'Patient owns a handgun', short: 'owns handgun',
          hint: 'Uses the sex-specific estimate when sex is selected.',
          stat: { bySex: {
            male: B('HR', 3.34, 3.13, 3.56, 'gp', 'suicide death', 'studdert2020', { cmpText: 'male non-owners, California cohort', note: 'Firearm-suicide HR 7.82; no rise in non-firearm suicide.' }),
            female: B('HR', 7.16, 6.22, 8.24, 'gp', 'suicide death', 'studdert2020', { cmpText: 'female non-owners, California cohort', note: 'Firearm-suicide HR 35.15.' }),
            default: B('HR', 3.67, 3.46, 3.89, 'gp', 'suicide death', 'studdert2020', { cmpText: 'adult non-owners, California (men 3.34, women 7.16)', note: 'Select sex for the sex-specific figure.' }),
          } } },
      ] },
    { id: 'seeking_means', label: 'Seeking access to lethal means', flag: 'Seeking access to lethal means', stat: S('HR', 2.04, 1.11, 3.75, 'clin', 'suicide death', 'saulnier2025', { cmpText: 'veterans assessed for suicide risk without this item' }) },
    { id: 'recent_purchase', label: 'Acquired a firearm in the past month', flag: 'Recent firearm acquisition', stat: C(null, null, null, null, null, 'suicide death', 'wintemute1999',
        'Sources differ on the figure: Wintemute 1999 found a first-week firearm-suicide rate ~57× the general population; Gemini reported a Studdert 2020 first-month HR ≈100 that GPT could not verify. Not entered as a number.') },
  ] },
  { key: 'protective', title: 'Protective factors', desc: 'applied at half weight; do not negate acute risk', items: [
    { id: 'lithium', label: 'Taking lithium (mood disorder)', stat: B('OR', 0.30, 0.09, 1.02, 'clin', 'suicide death', 'riblet2022', { cmpText: 'placebo/usual care in RCTs', note: 'Older meta-analysis OR 0.13 (0.03–0.66; Cipriani 2013). Newer synthesis shown.' }) },
    { id: 'clozapine', label: 'Taking clozapine (schizophrenia)', stat: B('HR', 0.76, 0.58, 0.97, 'clin', 'suicide attempt', 'meltzer2003', { cmpText: 'olanzapine, high-risk RCT patients', note: 'Finnish cohort: suicide death HR 0.34 vs perphenazine (Tiihonen 2009).' }) },
    { id: 'moud', label: 'On methadone/buprenorphine for opioid use disorder', stat: S('HR', 0.60, 0.40, 0.88, 'clin', 'suicide attempt', 'molero2018', { cmpText: 'same people off medication (within-person)', note: 'Methadone shown.' }) },
    { id: 'safety_plan', label: 'Completed safety plan with follow-up contact', stat: B('OR', 0.56, 0.33, 0.95, 'clin', 'suicide attempt', 'stanley2018', { cmpText: 'usual care, ED patients' }) },
    { id: 'locked', label: 'Firearms stored locked and unloaded', stat: B('OR', 0.39, 0.24, 0.66, 'sub', 'suicide death', 'shenassa2004', { cmpText: 'unlocked storage; decedent controls', note: 'Firearm suicide; a 2025 reanalysis (Miller) found weaker adult evidence. Off-site storage is preferred in crisis.' }) },
    { id: 'religious', label: 'Weekly religious service attendance', stat: B('HR', 0.16, 0.06, 0.46, 'sub', 'suicide death', 'vanderweele2016', { cmpText: 'never-attending US women nurses', note: 'Observational, low event count.' }) },
    { id: 'children', label: 'Parent of children (responsibility for children)', stat: S('HR', 0.42, 0.36, 0.48, 'gp', 'suicide death', 'dehara2021', { cmpText: 'childless Swedish adults 25–44', note: 'Psychological-autopsy data are weaker (childlessness OR 1.3, NS).' }) },
    { id: 'married', label: 'Married / stable partnership', stat: S('OR', 0.52, 0.47, 0.57, 'gp', 'suicide death', 'kyung2018', { cmpText: 'non-married adults (inverted from OR 1.92)' }) },
    { id: 'reasons', label: 'Strong reasons for living', stat: S('HR', 0.32, 0.17, 0.60, 'sub', 'suicide attempt', 'lizardi2007', { cmpText: 'depressed female inpatients with lower scores', note: 'Not significant in men (HR 0.83).' }) },
    { id: 'support', label: 'Supportive relationships', stat: NUL('safet', 'No pooled general-population figure both sources agreed on.', 'suicide death') },
    { id: 'engaged', label: 'Engaged in ongoing treatment', stat: NUL('safet', null, 'suicide death') },
  ] },
  ],
};

/* ============================== HARM TO OTHERS ============================== */
DOMAINS.others = {
  short: 'Others', tileLabel: 'Harm to others (violence)', chartTitle: 'Harm to others: per-factor association vs general population',
  baseline: 'US homicide: 5.9 deaths per 100,000 per year (2024; 6.2 age-adjusted). Past-year violent behavior: ~3.7% of adults (2.1% without mental disorder; ECA 1990).',
  groups: [
  { key: 'chronic', title: 'Chronic / static', desc: 'enduring vulnerability', items: [
    { id: 'sex', short: 'Sex', label: 'Sex (demographic baseline)', demo: true,
      hint: 'Approximate rate ratio vs overall population, derived from offender sex in US homicide data (~88% of known offenders are male). No CI. Shared with the harm-to-self tab.',
      options: [
        { id: 'none', label: 'Not specified', none: true },
        { id: 'male', sex: 'male', label: 'Male', short: 'male', stat: S('Rate ratio', 1.8, null, null, 'gp', 'homicide perpetration', 'bjsHomicide', { cmpText: 'derived: 88% of offenders vs ~49% of population', note: 'Male:female offending ≈7:1. Within psychiatric inpatients the sex gap narrows.' }) },
        { id: 'female', sex: 'female', label: 'Female', short: 'female', stat: S('Rate ratio', 0.24, null, null, 'gp', 'homicide perpetration', 'bjsHomicide', { cmpText: 'derived: 12% of offenders vs ~51% of population' }) },
      ] },
    { id: 'young', label: 'Age under 25', stat: S('OR', 1.9, 1.6, 2.3, 'sub', 'violence', 'yukhnenko2019', { cmpText: 'older offenders (recidivism studies)', note: 'Violence peaks in late teens and early 20s.' }) },
    { id: 'psychosis', short: 'Psychosis', label: 'Psychotic disorder (schizophrenia spectrum)',
      hint: 'Homicide specifically: OR 19.5 (Fazel 2009) / 17.7 (Whiting 2022) vs general population, but absolute risk is ~1 in 10,000 per year.',
      options: [
        { id: 'none', label: 'No psychotic disorder', none: true },
        { id: 'nosud', label: 'Psychosis without substance use disorder', short: 'without SUD', stat: B('OR', 2.1, 1.7, 2.7, 'gp', 'violence', 'fazel2009') },
        { id: 'sud', label: 'Psychosis with comorbid substance use disorder', short: 'with SUD', stat: B('OR', 8.9, 5.4, 14.7, 'gp', 'violence', 'fazel2009', { note: 'Joint exposure: similar to SUD alone. Do not also tick SUD.' }) },
      ] },
    { id: 'sud', label: 'Substance use disorder (alcohol or drugs)', stat: S('OR', 7.4, 4.3, 12.7, 'gp', 'violence', 'fazel2018', { note: 'Largest population-attributable fraction for violence (~15%). In psychosis samples: OR 2.41 (Lagerberg 2025).' }) },
    { id: 'bipolar', label: 'Bipolar disorder', stat: B('OR', 2.3, 2.0, 2.6, 'gp', 'violence', 'fazel2010', { cmpText: 'matched population controls, Sweden', note: 'Driven by comorbid SUD (6.4 with vs 1.3 without).' }) },
    { id: 'depression', label: 'Depressive disorder', stat: B('OR', 3.0, 2.8, 3.3, 'gp', 'violence', 'fazel2015', { cmpText: 'matched population controls, Sweden', note: 'Sibling comparison OR 1.5.' }) },
    { id: 'aspd', label: 'Antisocial personality disorder', stat: B('OR', 7.6, 5.1, 11.5, 'gp', 'violence', 'chow2025') },
    { id: 'bpd', label: 'Borderline personality disorder', stat: B('OR', 2.6, 1.8, 3.9, 'gp', 'violence', 'chow2025') },
    { id: 'ptsd', label: 'PTSD', stat: C('HR', 6.4, 5.7, 7.2, 'gp', 'violence', 'paulino2023',
        'Sources differ: Swedish population cohort HR 6.4 (sibling HR 3.2; Paulino 2023) vs veteran-only meta-analysis OR 1.59 (Taylor 2020). Population figure shown.') },
    { id: 'adhd', label: 'ADHD', stat: S('OR', 1.8, 1.6, 1.9, 'gp', 'violence', 'fazel2018', { note: 'Largely mediated by conduct disorder and SUD.' }) },
    { id: 'tbi', label: 'Traumatic brain injury', stat: B('OR', 3.3, 3.1, 3.5, 'gp', 'violence', 'fazel2011', { note: 'Sibling comparison OR 2.0; earlier meta-analysis OR 1.66.' }) },
    { id: 'prior_violence', label: 'History of violence', stat: C('OR', 2.91, 2.06, 4.10, 'clin', 'violence', 'lagerberg2025',
        'Sources differ: longitudinal psychosis studies OR 2.91 (Lagerberg 2025) vs mixed-design OR 21.4 (5.2–86.6; Witt 2013). Conservative figure shown.', { cmpText: 'other people with psychosis', note: 'Most consistent predictor across settings (HCR-20 H1).' }) },
    { id: 'early_onset', label: 'Early-onset violence / youth antisocial behavior', stat: S('OR', 3.6, 3.4, 3.7, 'gp', 'violence', 'fazel2018') },
    { id: 'prison', label: 'History of incarceration', stat: S('OR', 3.04, 2.08, 4.44, 'clin', 'violence', 'lagerberg2025', { cmpText: 'other people with psychosis' }) },
    { id: 'aces4', label: '4 or more adverse childhood experiences', stat: S('OR', 8.10, 5.87, 11.18, 'gp', 'violence', 'hughes2017', { cmpText: 'adults with 0 ACEs', note: 'Overlaps with the abuse items: tick one or the other.' }) },
    { id: 'cpa', label: 'Childhood physical abuse', stat: B('OR', 2.2, 1.5, 3.1, 'clin', 'violence', 'witt2013', { cmpText: 'other people with psychosis' }) },
    { id: 'csa', label: 'Childhood sexual abuse', stat: S('OR', 1.9, 1.5, 2.4, 'clin', 'violence', 'witt2013', { cmpText: 'other people with psychosis' }) },
    { id: 'parent_crime', label: 'Parental violent crime', stat: S('OR', 1.37, 1.15, 1.63, 'clin', 'violence', 'lagerberg2025', { cmpText: 'other people with psychosis' }) },
    { id: 'victimization', label: 'History of violent victimization', stat: B('OR', 5.81, 3.45, 9.78, 'clin', 'violence', 'lagerberg2025', { cmpText: 'other people with psychosis', note: 'Witt 2013: OR 6.1.' }) },
    { id: 'psychopathy', label: 'Psychopathic traits', stat: NUL('hcr20', 'PCL-R studies report effect sizes (d ≈ 0.6) in forensic samples, not general-population ORs.', 'violence') },
  ] },
  { key: 'acute', title: 'Acute / dynamic', desc: 'recent change & warning signs', items: [
    { id: 'threats', label: 'Threats toward an identifiable person', flag: 'Threat toward an identifiable person (consider duty to warn/protect)', stat: NUL('hcr20', 'Assess target, specificity, intent, means and escalation. Among people convicted of threats to kill, 3.1% later committed homicide within 10 years.', 'violence') },
    { id: 'homicidal_ideation', label: 'Homicidal ideation with plan or intent', flag: 'Homicidal ideation with plan or intent', stat: NUL('hcr20', null, 'violence') },
    { id: 'intoxication', label: 'Acute alcohol intoxication (past 24 h)', flag: 'Current intoxication', stat: S('RR', 13.2, 8.2, 21.2, 'gp', 'violence', 'haggard2006', { cmpText: 'same offenders when not intoxicated (case-crossover)', transient: true, note: 'Risk window is hours, so excluded from the combined estimate.' }) },
    { id: 'recent_violence', label: 'Violence in the past year', stat: B('OR', 3.40, 1.65, 7.00, 'clin', 'violence', 'lagerberg2025', { cmpText: 'other people with psychosis' }) },
    { id: 'drug_misuse', label: 'Recent drug or alcohol misuse', stat: C('OR', 1.80, 1.35, 2.38, 'clin', 'violence', 'lagerberg2025', 'Sources differ: OR 1.80 (Lagerberg 2025) vs 2.9 (1.3–6.3; Witt 2013).', { cmpText: 'other people with psychosis' }) },
    { id: 'tco', label: 'Persecutory delusions with anger', stat: S('OR', 3.68, 2.44, 5.55, 'sub', 'violence', 'keers2014', { cmpText: 'released prisoners without these delusions', note: 'Threat/control-override symptoms without anger: OR 1.2, NS (Witt 2013).' }) },
    { id: 'command', label: 'Command hallucinations to harm others', flag: 'Command hallucinations to harm others', stat: S('OR', 1.0, 0.5, 2.0, 'clin', 'violence', 'witt2013', { cmpText: 'people with psychosis without commands', note: 'Unselected commands show no effect, but harm-specific commands roughly double recent violence (McNiel 2000).' }) },
    { id: 'hostility', label: 'Hostile behavior', stat: S('OR', 2.8, 1.8, 4.2, 'clin', 'violence', 'witt2013', { cmpText: 'non-hostile people with psychosis' }) },
    { id: 'agitation', label: 'Agitation / excitement', stat: B('OR', 1.6, 1.0, 2.6, 'clin', 'violence', 'witt2013', { cmpText: 'lower scores within psychosis samples' }) },
    { id: 'impulsivity', label: 'Poor impulse control', stat: B('OR', 3.3, 1.5, 7.2, 'clin', 'violence', 'witt2013', { cmpText: 'lower scores within psychosis samples' }) },
    { id: 'insight', label: 'Lack of insight into illness', stat: B('OR', 2.7, 1.4, 5.2, 'clin', 'violence', 'witt2013', { cmpText: 'other people with psychosis' }) },
    { id: 'nonadherence', label: 'Medication nonadherence', stat: B('OR', 2.0, 1.0, 3.7, 'clin', 'violence', 'witt2013', { cmpText: 'adherent people with psychosis' }) },
    { id: 'sleep', label: 'Poor sleep / sleep loss', stat: S('OR', 1.83, 1.47, 2.28, 'sub', 'violence', 'vanveen2022', { cmpText: 'adequate sleep, observational studies' }) },
    { id: 'discharge', label: 'Discharged from psychiatric inpatient care in past 10 weeks', stat: S('RR', 2.5, null, null, 'gp', 'violence', 'steadman1998', { cmpText: 'neighborhood controls (11.5% vs 4.6%)', note: 'No difference from neighbors when substance abuse was absent (4.7% vs 3.3%).' }) },
  ] },
  { key: 'ipv', title: 'Intimate partner violence', desc: 'risk of partner homicide, compared with other abusive relationships', items: [
    { id: 'strangulation', label: 'Has strangled/choked partner before', flag: 'Prior non-fatal strangulation of partner', stat: B('OR', 7.48, 4.53, 12.35, 'sub', 'partner homicide', 'glass2008', { cmpText: 'other abused women' }) },
    { id: 'abuser_gun', label: 'Abusive partner has firearm access', flag: 'Firearm access in an abusive relationship', stat: B('OR', 7.59, 3.85, 14.99, 'sub', 'partner homicide', 'campbell2003', { cmpText: 'other abused women', note: 'Fully adjusted model: OR 5.38.' }) },
    { id: 'separation', label: 'Recent separation after living together', stat: B('OR', 3.64, 1.71, 7.78, 'sub', 'partner homicide', 'campbell2003', { cmpText: 'abused women still cohabiting', note: 'Separation from a highly controlling partner: OR 8.98.' }) },
    { id: 'threat_weapon', label: 'Has threatened partner with a weapon', stat: S('OR', 4.08, 1.91, 8.72, 'sub', 'partner homicide', 'campbell2003', { cmpText: 'other abused women' }) },
    { id: 'threat_kill', label: 'Has threatened to kill partner', stat: S('OR', 2.60, 1.24, 5.42, 'sub', 'partner homicide', 'campbell2003', { cmpText: 'other abused women' }) },
    { id: 'abuser_unemployed', label: 'Abusive partner unemployed', stat: S('OR', 5.09, 2.74, 9.45, 'sub', 'partner homicide', 'campbell2003', { cmpText: 'partners employed full-time' }) },
    { id: 'abuser_drugs', label: 'Abusive partner uses illicit drugs', stat: S('OR', 4.76, 2.19, 10.34, 'sub', 'partner homicide', 'campbell2003', { cmpText: 'other abused women' }) },
  ] },
  { key: 'means', title: 'Firearms & lethal means', desc: 'access to method', items: [
    { id: 'handgun_home', label: 'Patient owns a handgun and lives with others', stat: S('HR', 2.33, 1.78, 3.05, 'gp', 'homicide of household member', 'studdert2022', { cmpText: 'cohabitants of non-owners, California', note: 'At-home firearm homicide by an intimate partner: HR 7.16.' }) },
    { id: 'household_gun', label: 'Firearm in the household', stat: B('OR', 2.00, 1.56, 3.02, 'gp', 'homicide (household member victimization)', 'anglemyer2014', { note: 'Measures household members being killed, not the patient as perpetrator.' }) },
    { id: 'weapon_acq', label: 'Recently acquired or sought a weapon', flag: 'Recent weapon acquisition', stat: NUL('hcr20', 'Context, target and motive matter.', 'violence') },
  ] },
  { key: 'protective', title: 'Protective factors', desc: 'applied at half weight', items: [
    { id: 'antipsychotic', label: 'Taking antipsychotic medication', stat: B('HR', 0.55, 0.47, 0.64, 'clin', 'violence', 'fazel2014', { cmpText: 'same patients off medication (within-person)', note: 'Long-acting injectables: HR 0.60.' }) },
    { id: 'clozapine', label: 'Taking clozapine', stat: C('HR', 0.53, 0.16, 1.74, 'clin', 'violence', 'fazel2014',
        'Sources differ: within-person HR 0.53, imprecise (Fazel 2014) vs mirror-image RR 0.13 (0.05–0.34; Bhavsar 2020). Conservative figure shown.', { cmpText: 'same patients off clozapine' }) },
    { id: 'mood_stab', label: 'Taking a mood stabilizer', stat: B('HR', 0.76, 0.62, 0.93, 'clin', 'violence', 'fazel2014', { cmpText: 'same patients off medication', note: 'Effect seen mainly in bipolar disorder.' }) },
    { id: 'moud', label: 'On buprenorphine/methadone for opioid use disorder', stat: S('HR', 0.65, 0.50, 0.84, 'clin', 'violence', 'molero2018', { cmpText: 'same people off medication (within-person)', note: 'Buprenorphine shown; methadone HR 0.84.' }) },
    { id: 'adherence', label: 'Adherent to treatment', stat: S('OR', 0.59, 0.33, 1.06, 'clin', 'violence', 'lagerberg2025', { cmpText: 'nonadherent people with psychosis', note: 'CI crosses 1.' }) },
    { id: 'support', label: 'Active prosocial family/friend support', stat: S('OR', 0.37, 0.20, 0.66, 'sub', 'violence', 'ullrich2011', { cmpText: 'released male prisoners without this support' }) },
    { id: 'safe_storage', label: 'Firearms removed or secured off-site', stat: NUL('hcr20', null, 'violence') },
  ] },
  ],
};

/* ------------------------------ frameworks ------------------------------ */
window.FRAMEWORKS = [
  { name: 'SAFE-T', text: 'Identify risk factors → identify protective factors → suicide inquiry → determine risk level/intervention → document. Protective factors do not override acute risk.', ref: 'safet' },
  { name: 'C-SSRS', text: 'Standardizes ideation severity (wish → active → method → intent → plan) and behavior (actual, interrupted, aborted, preparatory).', ref: 'posner2011' },
  { name: 'HCR-20 V3', text: 'Structured professional judgment for violence: 10 historical, 5 clinical and 5 risk-management items, scenarios and a management plan. Items are not summed. Requires the manual and training.', ref: 'hcr20' },
  { name: 'Stanley-Brown Safety Plan', text: 'Warning signs, internal coping, social distraction, supports, professional/crisis contacts (988), making the environment safe.', ref: 'stanleybrown' },
  { name: 'CALM', text: 'Counseling on Access to Lethal Means: crises are often brief and firearms are ~85–90% fatal, so collaboratively move firearms off-site and limit medication supplies during risk periods.', ref: 'calm' },
  { name: 'Joint Commission NPSG 15.01.01', text: 'Validated screening, evidence-based assessment, documented risk and mitigation, discharge safety planning, lethal-means counseling and follow-up.', ref: 'jcNPSG' },
  { name: 'Why not a score', text: 'Risk factors predict only slightly better than chance (Franklin 2017). "High-risk" classification has ~5.5% PPV and misses ~44% of suicides (Large 2016). Validated tools (OxMIS, OxMIV) apply only to narrow populations.', ref: 'franklin2017' },
];
window.FOOTER = 'Data compiled November 2026 from peer-reviewed meta-analyses, cohort studies and national statistics. Researched independently by Gemini 4 Argon and GPT-6.1 Sol and reconciled: ✓✓ = same figure from both, ≠ = sources differed (explanation shown). For clinical teaching only. If someone is in immediate danger call 911; for a suicidal crisis call or text 988 (US).';

/* Teaching example: 34-year-old man brought to CPEP after a breakup. */
window.EXAMPLE = {
  sex: 'male',
  choices: { self__sex: 'male', others__sex: 'male', self__ideation: 'plan', self__alcohol: 'heavy', self__firearm: 'owner', others__psychosis: 'nosud' },
  checks: ['self__prior_attempt', 'self__depression', 'self__relationship', 'self__insomnia', 'self__hopelessness', 'self__married',
           'others__threats', 'others__recent_violence', 'others__handgun_home', 'others__separation', 'others__antipsychotic'],
};
})();
