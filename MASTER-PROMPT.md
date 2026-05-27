# MASTER-PROMPT — Gartner D&A Compass

Bouw een statische web app voor een Nederlandse hogeschool op basis
van inzichten van de Gartner Data & Analytics Summit 2026.
Deployment via GitHub Pages. Zie CLAUDE.md voor stack en design tokens.

---

## FASE 1 — Data & structuur

Maak aan:
- .nojekyll (leeg)
- data/roles.json (zie inhoud hieronder)
- data/insights.json (zie inhoud hieronder)
- README.md met: titel + "lokaal: python3 -m http.server 8000"

### data/roles.json
```json
[
  {
    "id": "informatiemanager",
    "title": "Informatiemanager / Directeur IV",
    "emoji": "🏗️",
    "description": "Datastrategie, informatiebeleid en systeemkeuzes. Brug tussen CvB en uitvoering.",
    "tags": ["Datastrategie & Waardecreatie", "Dataplatform & Architectuur"],
    "perspective_prompt": "Je adviseert het CvB over datastrategie en bepaalt welke platformen de hogeschool inzet."
  },
  {
    "id": "beleidsadviseur",
    "title": "Beleidsadviseur Onderwijs & Kwaliteit",
    "emoji": "📊",
    "description": "Vertaalt data naar stuurinformatie, kwaliteitszorg en onderwijsbeleid.",
    "tags": ["Self-Service Analytics & BI", "Data Literacy & Cultuur"],
    "perspective_prompt": "Je gebruikt data om onderbouwde beleidsadviezen te geven aan het management."
  },
  {
    "id": "data-bi-specialist",
    "title": "Data- / BI-specialist",
    "emoji": "⚙️",
    "description": "Bouwt dataplatform, bronsysteemkoppelingen, dashboards en rapportages.",
    "tags": ["Dataplatform & Architectuur", "Self-Service Analytics & BI"],
    "perspective_prompt": "Je bouwt de technische basis onder datagedreven werken bij de hogeschool."
  },
  {
    "id": "onderzoeker-lectoraat",
    "title": "Onderzoeker / Lectoraat-data",
    "emoji": "🔬",
    "description": "Toegepast onderzoek met data: learning analytics, open science, externe bronnen.",
    "tags": ["AI / ML in Productie", "Data Governance & Kwaliteit"],
    "perspective_prompt": "Je doet praktijkgericht onderzoek waarbij data en AI centraal staan."
  },
  {
    "id": "governance-privacy",
    "title": "Data Governance & Privacy Officer",
    "emoji": "🛡️",
    "description": "Datakwaliteit, eigenaarschap, AVG/AI Act en ethiek van studentdata.",
    "tags": ["Data Governance & Kwaliteit", "Privacy, Ethiek & Regulering (AVG / AI Act)"],
    "perspective_prompt": "Je borgt dat de hogeschool verantwoord en compliant met data omgaat."
  },
  {
    "id": "opleidingsmanager",
    "title": "Opleidingsmanager",
    "emoji": "🎓",
    "description": "Curriculum, onderwijskwaliteit en data over studiesucces en uitval.",
    "tags": ["Data Literacy & Cultuur", "Organisatieverandering & Leiderschap"],
    "perspective_prompt": "Je stuurt een opleiding aan en gebruikt data over studiesucces en rendement."
  }
]
```

### data/insights.json
```json
[
  {
    "id": "gth1-bie27i-reference-architecture-for-federated-analytics-1622944",
    "title": "Federated analytics vraagt een marktplaats, geen BI-eiland",
    "summary": "Gartner beschrijft analytics als een serviceframework met zes bouwblokken: databronnen, connectie & preparatie, modellering, delivery, accessibility en governance/monitoring. Daarboven plaatst Gartner een data marketplace, catalogus en analytics hub, zodat decentrale domeinen zelfstandig kunnen werken zonder definities, beveiliging en lifecycle-beheer te laten ontsporen.",
    "type": "tool",
    "horizon": "now",
    "source": { "session_title": "Reference Architecture for Federated Analytics", "speaker": "Christopher Long", "track": "Reference Architecture", "date": "2026-05" },
    "themes": ["Dataplatform & Architectuur", "Self-Service Analytics & BI"],
    "relevance_for_hogeschool": "Helpt om autonomie van opleidingen te combineren met centrale definities en governance. Voorkomt dat faculteiten en diensten elk hun eigen Power BI-eiland bouwen zonder gedeelde definities voor studentdata, kwaliteit en financien."
  },
  {
    "id": "gth2-bie27i-reference-architecture-brief-da-governance-1622937",
    "title": "Beleid zonder workflow is geen governance",
    "summary": "Governance werkt alleen als beleid via een vaste workflow loopt en gekoppeld is aan datasets en processen. Metadata wordt daarbij de uitvoerende motor, niet alleen documentatie.",
    "type": "practice",
    "horizon": "now",
    "source": { "session_title": "Reference Architecture Brief: Data and Analytics Governance", "speaker": "Lydia Ferguson", "track": "Reference Architecture Brief", "date": "2026-05" },
    "themes": ["Data Governance & Kwaliteit", "Privacy, Ethiek & Regulering (AVG / AI Act)"],
    "relevance_for_hogeschool": "Voor hogescholen is governance vaak versnipperd over onderwijslogistiek, HR, onderzoek en leeromgevingen. Deze aanpak maakt AVG-, kwaliteits- en ethische eisen uitvoerbaar als een aaneengesloten keten per dataset, in plaats van losse controlelijstjes per afdeling."
  },
  {
    "id": "gth3-bie27i-hype-cycle-for-generative-ai-2025-1611926",
    "title": "De AI-race verschuift van chatbot naar bouwlaag",
    "summary": "De echte waarde verschuift naar AI-engineeringcomponenten zoals vector databases en RAG. Schalen vraagt om infrastructuur, niet alleen toepassingen.",
    "type": "trend",
    "horizon": "near",
    "source": { "session_title": "Hype Cycle for Generative AI, 2025", "speaker": "Afraz Jaffri", "track": "Hype Cycle", "date": "2026-05" },
    "themes": ["AI / ML in Productie", "Dataplatform & Architectuur"],
    "relevance_for_hogeschool": "De neiging bij hogescholen is groot om direct te investeren in zichtbare AI-toepassingen, terwijl de echte houdbaarheid afhangt van de onderliggende retrieval-, orchestration- en governancebouwlaag. Helpt om AI-initiatieven te prioriteren op technische haalbaarheid in plaats van demo-waarde."
  },
  {
    "id": "32b-bie27i-maverick-insight-treat-ai-as-a-prescriptiononly-co-1639161",
    "title": "Behandel AI als een gereguleerd medicijn",
    "summary": "AI moet gecontroleerd beschikbaar zijn via risicoklassen en toegangsbeheer. Ongecontroleerd gebruik leidt tot risico's en verspilling.",
    "type": "provocation",
    "horizon": "long",
    "source": { "session_title": "Treat AI as a Prescription-Only Controlled Substance", "speaker": "Daryl Plummer", "track": "Maverick Insight", "date": "2026-05" },
    "themes": ["Privacy, Ethiek & Regulering (AVG / AI Act)", "Organisatieverandering & Leiderschap"],
    "relevance_for_hogeschool": "Hogescholen werken met gevoelige studentdata, toetsing en onderzoek, waar ongecontroleerd AI-gebruik direct reputatie- en compliance-risico's oplevert. Helpt om toepassingen zoals studieadvies, generatieve tools en proctoring expliciet te classificeren."
  },
  {
    "id": "33b-bie27i-beyond-the-hype-ais-impact-on-headcount-and-busine-1613564",
    "title": "AI rendeert pas na radicale procesherontwerp",
    "summary": "Echte AI-waarde komt niet uit tooling maar uit het herontwerpen van processen. Kleine optimalisaties leveren nauwelijks ROI.",
    "type": "practice",
    "horizon": "near",
    "source": { "session_title": "Beyond the Hype: AI's Impact on Headcount and Business Value", "speaker": "Frances Karamouzis", "track": "Business Value", "date": "2026-05" },
    "themes": ["AI / ML in Productie", "Organisatieverandering & Leiderschap"],
    "relevance_for_hogeschool": "Voor hogescholen betekent dit dat AI alleen waarde oplevert als processen daadwerkelijk veranderen, zoals intake, toetsing en begeleiding. Voorkomt de valkuil van losse pilots zonder impact."
  },
  {
    "id": "w5-bie27i-workshop-how-to-link-data-and-analytics-to-busines-1630596",
    "title": "Begin niet met data maar met meetbare uitkomsten",
    "summary": "Dataprojecten moeten starten bij een concreet, meetbaar business outcome en pas daarna terugredeneren naar gedrag, processen, KPI's, applicaties en data. Deze 'value pyramid' voorkomt losse dashboards zonder aantoonbare impact.",
    "type": "tool",
    "horizon": "now",
    "source": { "session_title": "Workshop: Link Data and Analytics to Business Outcomes", "speaker": "Jorg Heizenberg", "track": "Workshop", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Data Literacy & Cultuur"],
    "relevance_for_hogeschool": "Direct toepasbaar voor hogescholen die worstelen met de vraag wat data oplevert. Helpt om onderwijskwaliteit, studentretentie of onderzoeksprestaties expliciet te koppelen aan KPI's en onderliggende data."
  },
  {
    "id": "summary-gartner-da-summit-2026",
    "title": "AI-waarde ontstaat uit vertrouwen en context",
    "summary": "AI-succes draait niet om snelheid maar om samenhang: sterke datafundamenten, governance en workforce-alignment. Context en vertrouwen zijn essentieel om data naar beslissingen te brengen.",
    "type": "trend",
    "horizon": "near",
    "source": { "session_title": "Gartner Data & Analytics Summit 2026 Executive Summary", "speaker": "Jason Medd + Gartner Analysts", "track": "Executive Summary", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Data Governance & Kwaliteit"],
    "relevance_for_hogeschool": "Losse AI-initiatieven leveren weinig waarde zonder betrouwbare data en governance. Instellingen moeten investeren in datakwaliteit en context om AI bruikbaar te maken in besluitvorming."
  },
  {
    "id": "34c-bie27i-data-storytelling-in-the-realm-of-generative-ai-1612080",
    "title": "Mooie dashboards versnellen slechte besluiten",
    "summary": "GenAI storytelling verhoogt het risico op verkeerde interpretaties. Zonder datageletterdheid bij de ontvanger versterkt storytelling cognitieve bias in plaats van betere besluitvorming.",
    "type": "risk",
    "horizon": "now",
    "source": { "session_title": "Data Storytelling in the Realm of Generative AI", "speaker": "Jeroen Cornelissen", "track": "Analytics", "date": "2026-05" },
    "themes": ["Data Governance & Kwaliteit", "Data Literacy & Cultuur"],
    "relevance_for_hogeschool": "Beleidsrapportages en accreditatiedocumenten leunen steeds meer op datavisualisaties. Helpt kritisch te blijven op datakwaliteit en om te investeren in datageletterdheid bij beleidsmakers."
  },
  {
    "id": "w3-bie27i-workshop-avoiding-the-top-mistakes-in-your-dashboard-1612780",
    "title": "Dashboards falen door ontwerp, niet data",
    "summary": "De meest voorkomende dashboardfouten zitten in het ontwerp: verkeerde grafiektypen, te veel informatie, ontbrekende context. Usability en visuele hierarchie bepalen of een dashboard tot betere beslissingen leidt.",
    "type": "practice",
    "horizon": "now",
    "source": { "session_title": "Avoiding Dashboard Mistakes", "speaker": "Jeroen Cornelissen", "track": "Workshop", "date": "2026-05" },
    "themes": ["Self-Service Analytics & BI", "Data Literacy & Cultuur"],
    "relevance_for_hogeschool": "Hogescholen investeren in BI-dashboards voor studentsucces en kwaliteitszorg, maar de bruikbaarheid schiet vaak tekort. Levert concrete ontwerpprincipes voor dashboards die echt worden gebruikt."
  },
  {
    "id": "w12-bie27i-workshop-communicating-da-impact-with-business-val-1637454",
    "title": "Stop met KPIs, start met value metrics",
    "summary": "Datateams meten succes in technische KPI's, terwijl bestuurders willen weten wat data oplevert in termen van kosten, risico of kwaliteit. Value metrics vertalen data-inspanning direct naar businessimpact.",
    "type": "tool",
    "horizon": "now",
    "source": { "session_title": "Communicating D&A Impact with Business Value", "speaker": "Brian Foster", "track": "Workshop", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Data Governance & Kwaliteit"],
    "relevance_for_hogeschool": "Helpt om de investering in data-infrastructuur en governance te verantwoorden richting CvB. Niet 'we verwerken 10.000 studentrecords', maar 'onze data reduceert uitval met X%'."
  },
  {
    "id": "31f-bie27i-better-benchmarking-with-gartners-da-budget-effic-1630674",
    "title": "Er is geen standaard data-budget",
    "summary": "Benchmarking werkt alleen met context. Er bestaat geen zinvolle standaard voor een data-budget als percentage van de omzet omdat sector, volwassenheidsniveau en prioriteiten alles bepalen.",
    "type": "provocation",
    "horizon": "now",
    "source": { "session_title": "Better Benchmarking with Gartner's DA Budget Efficiency", "speaker": "Brian Foster", "track": "Value", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Organisatieverandering & Leiderschap"],
    "relevance_for_hogeschool": "Hogescholen worstelen met de vraag hoeveel te investeren in data ten opzichte van vergelijkbare instellingen. Helpt budgetdiscussies te objectiveren."
  },
  {
    "id": "32f-bie27i-how-to-build-and-manage-data-products-efficiently-1611062",
    "title": "Werk in dataproducten, niet projecten",
    "summary": "Data als product behandelen betekent: eigenaar aanwijzen, levenscyclus definieren, kwaliteitsafspraken vastleggen en hergebruik als doel stellen. Verschuift focus van eenmalige projecten naar structurele datadiensten.",
    "type": "trend",
    "horizon": "near",
    "source": { "session_title": "How to Build and Manage Data Products Efficiently", "speaker": "Lydia Ferguson", "track": "Architecture", "date": "2026-05" },
    "themes": ["Dataplatform & Architectuur", "Datastrategie & Waardecreatie"],
    "relevance_for_hogeschool": "Maakt datasets over studentroutes, toetsresultaten en arbeidsmarktuitkomsten herbruikbaar voor opleidingen, beleidsadviseurs en lectoraten — in plaats van steeds opnieuw bouwen per rapportage."
  },
  {
    "id": "w2-bie27i-workshop-assessing-agentic-analytics-readiness-acr-1630618",
    "title": "Niet klaar? Begin niet met AI-agents",
    "summary": "Agentic AI vereist hogere datafundamentvolwassenheid: robuuste pipelines, betrouwbare governance en gedefinieerde werkprocessen. Zonder die basis vergroot autonome AI de fouten in plaats van die te verminderen.",
    "type": "risk",
    "horizon": "now",
    "source": { "session_title": "Assessing Agentic Analytics Readiness", "speaker": "Jeroen Cornelissen", "track": "Workshop", "date": "2026-05" },
    "themes": ["AI / ML in Productie", "Dataplatform & Architectuur"],
    "relevance_for_hogeschool": "Hogescholen staan onder druk om snel met AI-agents aan de slag te gaan. Dit readiness-framework helpt eerst eerlijk te beoordelen of het datafundament klaar is voordat er geinvesteerd wordt."
  },
  {
    "id": "33a-bie27i-journey-for-realizing-value-from-data-analytics-an-1611090",
    "title": "Waarde bewijzen is overtuigen",
    "summary": "Waarderealisatie uit data is geen technisch traject maar een overtuigingsreis. Stakeholders moeten geloven in de data en aanpak voordat ze ernaar handelen.",
    "type": "provocation",
    "horizon": "now",
    "source": { "session_title": "Journey for Realizing Value from Data Analytics", "speaker": "Sarah James", "track": "Business Value", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Organisatieverandering & Leiderschap"],
    "relevance_for_hogeschool": "Bij hogescholen is draagvlak voor datagedreven werken vaak het grootste obstakel, niet de technologie. Helpt informatiemanagers te investeren in storytelling en stakeholdermanagement."
  },
  {
    "id": "33d-bie27i-unstructured-data-management-is-the-missing-ingred-1613017",
    "title": "AI faalt zonder ongestructureerde data",
    "summary": "70-90% van alle organisatiedata is ongestructureerd: e-mails, documenten, verslagen. De meeste AI-toepassingen negeren deze data en werken daardoor op een fractie van de beschikbare informatie.",
    "type": "risk",
    "horizon": "near",
    "source": { "session_title": "Unstructured Data Management Is the Missing Ingredient", "speaker": "Jason Medd", "track": "Data Management", "date": "2026-05" },
    "themes": ["Dataplatform & Architectuur", "AI / ML in Productie"],
    "relevance_for_hogeschool": "Hogescholen produceren enorme hoeveelheden ongestructureerde data: verslagen van examencommissies, feedbackformulieren, onderzoeksrapporten. Zonder strategie missen AI-toepassingen cruciale context."
  },
  {
    "id": "34a-bie27i-designing-the-future-ready-data-analytics-organiz-1611962",
    "title": "D&A wordt een netwerkorganisatie",
    "summary": "De toekomstige D&A-organisatie werkt als hub-and-spoke netwerk: centrale kern borgt standaarden, decentrale data-experts in de business voeren dagelijkse analytics uit.",
    "type": "trend",
    "horizon": "long",
    "source": { "session_title": "Designing the Future-Ready Data Analytics Organization", "speaker": "Jorg Heizenberg", "track": "Leadership", "date": "2026-05" },
    "themes": ["Organisatieverandering & Leiderschap", "Data Literacy & Cultuur"],
    "relevance_for_hogeschool": "Biedt blauwdruk om spanning op te lossen tussen centrale informatiemanagement en decentrale behoefte van faculteiten. Maakt duidelijk welke capaciteiten centraal moeten blijven."
  },
  {
    "id": "32c-bie27i-how-to-build-the-context-layer-for-reliable-ai-age-1611250",
    "title": "AI zonder context is onbetrouwbaar",
    "summary": "AI-agents maken fouten wanneer ze ontbrekende context aanvullen met aannames. Een semantische laag met ontologieen en kennisgrafen zorgt dat agents de juiste betekenis geven aan data.",
    "type": "risk",
    "horizon": "near",
    "source": { "session_title": "How to Build the Context Layer for Reliable AI Agents", "speaker": "Andres Garcia-Rodeja", "track": "AI Architecture", "date": "2026-05" },
    "themes": ["Dataplatform & Architectuur", "AI / ML in Productie"],
    "relevance_for_hogeschool": "Bij hogescholen is context essentieel: een student is ook deelnemer, alumni en arbeidsmarktpersoon. Zonder semantische laag produceren AI-agents voor studieadvies systematisch foute uitkomsten."
  },
  {
    "id": "33c-bie27i-the-forgotten-art-of-data-science-in-ai-1612066",
    "title": "AI zonder data science is stuurloos",
    "summary": "Klassieke data science-vaardigheden zoals statistiek en modelvalidatie worden vergeten in de rush naar GenAI. Zonder deze fundamenten worden AI-uitkomsten niet kritisch genoeg getoetst.",
    "type": "trend",
    "horizon": "now",
    "source": { "session_title": "The Forgotten Art of Data Science in AI", "speaker": "Afraz Jaffri", "track": "Data Science", "date": "2026-05" },
    "themes": ["AI / ML in Productie", "Data Literacy & Cultuur"],
    "relevance_for_hogeschool": "Voor lectoraten die AI inzetten: zonder data science-fundament worden onderzoeksresultaten onbetrouwbaar. Argument om klassieke statistiek niet te laten verdringen door promptengineering."
  },
  {
    "id": "34b-bie27i-fueling-smarter-ai-unlocking-the-power-of-external-1612857",
    "title": "AI-voorsprong komt van externe data",
    "summary": "Interne data alleen is onvoldoende voor AI die context over de buitenwereld nodig heeft. Externe databronnen zoals sectordata en arbeidsmarktinformatie verhogen nauwkeurigheid en relevantie aanzienlijk.",
    "type": "trend",
    "horizon": "near",
    "source": { "session_title": "Fueling Smarter AI: Unlocking the Power of External Data", "speaker": "Kevin Quinn", "track": "Data Strategy", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Dataplatform & Architectuur"],
    "relevance_for_hogeschool": "Hogescholen kunnen AI voor studiesucces en loopbaanadvies verrijken met CBS-arbeidsmarktcijfers en sectorprognoses. Maakt studieadvies en beleidskeuzes veel sterker onderbouwd."
  },
  {
    "id": "34e-bie27i-powering-ai-value-without-powering-down-sustainabi-1611479",
    "title": "Meer AI betekent niet altijd meer waarde",
    "summary": "Het schalen van AI leidt tot exponentieel hogere kosten terwijl de marginale waarde per extra toepassing daalt. Ongecontroleerd schalen ondermijnt ook duurzaamheidsdoelstellingen.",
    "type": "provocation",
    "horizon": "near",
    "source": { "session_title": "Powering AI Value Without Powering Down Sustainability", "speaker": "Pieter den Hamer", "track": "AI Strategy", "date": "2026-05" },
    "themes": ["Datastrategie & Waardecreatie", "Organisatieverandering & Leiderschap"],
    "relevance_for_hogeschool": "Hogescholen met duurzaamheidsambities staan voor een spanning als ze AI grootschalig willen uitrollen. Helpt AI-investeringen te prioriteren op waarde per euro en per kg CO2."
  }
]
```

---

## FASE 2 — Landingspagina

Bouw index.html + css/style.css volledig af.

- Laad data/roles.json via fetch()
- Toon 6 rolkaarten in 2x3 grid (mobiel: 1 kolom)
- Elke kaart: emoji + titel + beschrijving + 2 thema-chips
- Hover: 2px omhoog + lichte schaduw
- Klik: sla roleId op in sessionStorage('selectedRole'),
  navigeer naar briefing.html
- Header: "Gartner D&A Compass" + "Gartner Data & Analytics Summit · Mei 2026 · London"
- H1: "Wat betekende Gartner D&A voor jouw werk?"
- Subtekst: "20 inzichten, gepersonaliseerd op jouw rol binnen de hogeschool."
- Footer: "20 inzichten · 6 rollen · Gartner D&A Summit 2026 · London"
- Fade-in animatie per kaart via Intersection Observer

---

## FASE 3 — Personalisatie-logica

Bouw js/personalization.js:

```javascript
// Selecteer top-8 inzichten voor een rol
function selectInsightsForRole(role, insights) {
  // 1. Bereken scores
  const scored = insights.map(insight => {
    const overlap = insight.themes.filter(t => role.tags.includes(t)).length;
    const relevance = overlap >= 2 ? 9 : overlap === 1 ? 6 : 0;
    const horizonBase = { now: 9, near: 6, long: 3 }[insight.horizon] || 5;
    const typeBonus = ['tool','practice'].includes(insight.type) ? 1 :
                      insight.type === 'provocation' ? -1 : 0;
    const action = horizonBase + typeBonus;
    return { ...insight, relevance_score: relevance, action_score: action };
  });

  // 2. Splits: met en zonder overlap
  const withOverlap = scored.filter(i => i.relevance_score > 0)
    .sort((a,b) => ((b.relevance_score+b.action_score)/2) - ((a.relevance_score+a.action_score)/2));

  // 3. Zorg voor minimaal 1 risk, 1 provocation, 1 trend
  const selected = [...withOverlap];
  ['risk','provocation','trend'].forEach(type => {
    if (!selected.find(i => i.type === type)) {
      const best = scored.filter(i => i.type === type)
        .sort((a,b) => b.action_score - a.action_score)[0];
      if (best) { best.relevance_score = 4; selected.push(best); }
    }
  });

  // 4. Dedupleer en return top 8
  const seen = new Set();
  return selected.filter(i => !seen.has(i.id) && seen.add(i.id)).slice(0, 8);
}

function buildThemeMatrix(insights) {
  const themes = [
    "Datastrategie & Waardecreatie","Data Governance & Kwaliteit",
    "AI / ML in Productie","Self-Service Analytics & BI",
    "Dataplatform & Architectuur","Privacy, Ethiek & Regulering (AVG / AI Act)",
    "Data Literacy & Cultuur","Organisatieverandering & Leiderschap"
  ];
  return themes.map(theme => ({
    theme,
    now:  insights.filter(i => i.themes.includes(theme) && i.horizon==='now').length,
    near: insights.filter(i => i.themes.includes(theme) && i.horizon==='near').length,
    long: insights.filter(i => i.themes.includes(theme) && i.horizon==='long').length,
  }));
}

function generateTeamQuestion(insight) {
  const templates = {
    risk:        `Hoe kwetsbaar zijn wij voor "${insight.title}"? Wat is ons huidige antwoord hierop?`,
    provocation: `Als dit klopt — "${insight.title}" — wat betekent dat dan voor onze aanpak?`,
    trend:       `Hoe ver staan wij met "${insight.title}"? Welke stap willen we zetten komend jaar?`,
    tool:        `Kunnen we "${insight.title}" toepassen? Wat hebben we daarvoor nodig?`,
    practice:    `Doen wij dit al? Wat kunnen we leren van "${insight.title}"?`,
  };
  return templates[insight.type] || `Wat betekent "${insight.title}" voor ons?`;
}

function generateNextStep(insight, roleTitle) {
  const horizon = insight.horizon === 'now' ? 'deze maand' :
                  insight.horizon === 'near' ? 'dit kwartaal' : 'dit jaar';
  const actions = {
    tool:        `Organiseer ${horizon} een werksessie om "${insight.title}" te testen met je team.`,
    risk:        `Zet ${horizon} een quickscan op de agenda: hoe kwetsbaar zijn wij voor dit risico?`,
    trend:       `Bespreek ${horizon} met je manager hoe deze trend past in de huidige roadmap.`,
    practice:    `Identificeer ${horizon} één proces waar je deze aanpak kunt toepassen.`,
    provocation: `Deel deze stelling ${horizon} in je teamoverleg en vraag om drie reacties.`,
  };
  return actions[insight.type] || `Bespreek dit inzicht ${horizon} in je team.`;
}
```

---

## FASE 4 — Briefingpagina

Bouw briefing.html + js/briefing.js volledig af.

Lees roleId uit sessionStorage('selectedRole').
Als leeg of ongeldig: redirect naar index.html.
Laad data/insights.json en data/roles.json via Promise.all fetch.
Pas selectInsightsForRole() toe uit personalization.js.

### Zeven secties op de pagina (in volgorde):

**S0 Header**
Emoji + roltitel (Playfair Display groot) + "Jouw Gartner D&A briefing"
"20 inzichten · Mei 2026 · London"
Knop "← Kies een andere rol" → index.html

**S1 Top inzichten**
Titel: "De [N] belangrijkste inzichten voor jou"
Uitklapbare lijst (standaard ingeklapt, klik = uitklappen):
  Ingeklapt: rangnr + type-badge + horizon-badge + titel + summary (1 regel) + scores
  Uitgeklapt:
    - Oranje box: "Waarom relevant" → relevance_for_hogeschool
    - "Kernidee:" → summary
    - Gele box: "Gespreksvraag" + kopieerknop → generateTeamQuestion(insight)
    - Rode box: "Volgende stap" → generateNextStep(insight, role.title)
    - Klein: "Bron: [session_title] · [speaker] · [date]"

**S2 Radar** (twee kolommen)
  Links "Signalen": type=trend, horizon=near of long
  Rechts "Risico's": type=risk (lichte rode achtergrondtint)

**S3 Provocaties**
  type=provocation, oranje linkerborder
  Titel + summary + generateTeamQuestion(insight)

**S4 Direct aan de slag**
  type=tool of practice, 2-koloms grid
  Titel + summary + generateNextStep(insight, role.title) als CTA-box

**S5 Themalandschap**
  buildThemeMatrix() → tabel 8 rijen × 3 kolommen (Nu/Nabij/Lang)
  0=grijs, 1=licht accent, 2+=donker accent

**S6 Team-vragen**
  Top 3 gespreksvragen uit top-3 inzichten
  Genummerd, elk met kopieerknop (navigator.clipboard)
  Feedback "✓ Gekopieerd" 2 seconden

**S7 Andere lens**
  "Dezelfde data, een ander perspectief"
  Chips voor alle andere 5 rollen (emoji + naam)
  Klik: sessionStorage('selectedRole') = andereRolId, reload briefing.html
  Huidige rol: grayed out

**Sticky nav** (na 80px scroll):
  Links: "← Terug" | Midden: emoji + roltitel | Rechts: anchor-links S1-S7

---

## FASE 5 — Testen & deployen

1. Test lokaal: python3 -m http.server 8000
2. Controleer alle 6 rollen: kloppen de inzichten per rol?
3. Test kopieerknop, uitklap, andere-lens navigatie
4. Test mobiel via DevTools (375px)
5. Controleer .nojekyll aanwezig

### Git-commando's voor GitHub Pages:
```bash
git init
git add .
git commit -m "Gartner D&A Compass v1"
git branch -M main
git remote add origin https://github.com/[USERNAME]/gartner-compass.git
git push -u origin main
```
Daarna: GitHub repo → Settings → Pages → Branch: main → / (root) → Save
Live op: https://[username].github.io/gartner-compass
