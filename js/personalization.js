function selectInsightsForRole(role, insights) {
  const scored = insights.map(insight => {
    const overlap = insight.themes.filter(t => role.tags.includes(t)).length;
    const relevance = overlap >= 2 ? 9 : overlap === 1 ? 6 : 0;
    const horizonBase = { now: 9, near: 6, long: 3 }[insight.horizon] || 5;
    const typeBonus = ['tool','practice'].includes(insight.type) ? 1 :
                      insight.type === 'provocation' ? -1 : 0;
    const action = horizonBase + typeBonus;
    return { ...insight, relevance_score: relevance, action_score: action };
  });

  const withOverlap = scored.filter(i => i.relevance_score > 0)
    .sort((a,b) => ((b.relevance_score+b.action_score)/2) - ((a.relevance_score+a.action_score)/2));

  const selected = [...withOverlap];
  ['risk','provocation','trend'].forEach(type => {
    if (!selected.find(i => i.type === type)) {
      const best = scored.filter(i => i.type === type)
        .sort((a,b) => b.action_score - a.action_score)[0];
      if (best) { best.relevance_score = 4; selected.push(best); }
    }
  });

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
