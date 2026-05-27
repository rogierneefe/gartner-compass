async function init() {
  const roleId = sessionStorage.getItem('selectedRole');
  if (!roleId) { window.location.href = 'index.html'; return; }

  const [rolesRes, insightsRes] = await Promise.all([
    fetch('data/roles.json'),
    fetch('data/insights.json')
  ]);
  const roles = await rolesRes.json();
  const allInsights = await insightsRes.json();

  const role = roles.find(r => r.id === roleId);
  if (!role) { window.location.href = 'index.html'; return; }

  const insights = selectInsightsForRole(role, allInsights);

  // S0 Header
  document.getElementById('roleEmoji').textContent = role.emoji;
  document.getElementById('roleTitle').textContent = role.title;
  document.getElementById('navBrand').textContent = role.emoji + ' ' + role.title;
  document.title = 'Briefing · ' + role.title;

  document.getElementById('mainContent').style.display = '';

  buildS1(insights, role);
  buildS2(allInsights);
  buildS3(allInsights, role);
  buildS4(insights, role);
  buildS5(allInsights);
  buildS6(insights);
  buildS7(roles, role);
  initStickyNav();
}

/* ── S1 Top inzichten ── */
function buildS1(insights, role) {
  document.getElementById('s1Title').textContent =
    `De ${insights.length} belangrijkste inzichten voor jou`;

  const list = document.getElementById('insightList');
  insights.forEach((insight, i) => {
    const item = document.createElement('div');
    item.className = 'insight-item';
    item.innerHTML = `
      <div class="insight-header">
        <span class="insight-rank">${i + 1}</span>
        <div class="insight-meta">
          <div class="badges">
            <span class="badge badge-${insight.type}">${insight.type}</span>
            <span class="badge-horizon">${horizonLabel(insight.horizon)}</span>
          </div>
          <h3>${insight.title}</h3>
          <p class="summary-short">${insight.summary}</p>
        </div>
        <div class="insight-scores">
          <span class="score-pill">Rel ${insight.relevance_score}</span>
          <span class="score-pill">Act ${insight.action_score}</span>
        </div>
        <span class="insight-chevron">▼</span>
      </div>
      <div class="insight-body">
        <div class="box box-orange">
          <div class="box-label">Waarom relevant</div>
          <div class="box-content">${insight.relevance_for_hogeschool}</div>
        </div>
        <div class="box box-yellow">
          <div class="box-label">Kernidee</div>
          <div class="box-content">${insight.summary}</div>
        </div>
        <div class="box box-yellow">
          <div class="box-label">Gespreksvraag</div>
          <div class="box-content" id="q-${insight.id}">${generateTeamQuestion(insight)}</div>
          <button class="copy-btn" data-target="q-${insight.id}">&#128203; Kopieer vraag</button>
        </div>
        <div class="box box-red">
          <div class="box-label">Volgende stap</div>
          <div class="box-content">${generateNextStep(insight, role.title)}</div>
        </div>
        <div class="insight-source">
          Bron: ${insight.source.session_title} · ${insight.source.speaker} · ${insight.source.date}
        </div>
      </div>
    `;

    item.querySelector('.insight-header').addEventListener('click', () => {
      item.classList.toggle('open');
    });

    list.appendChild(item);
  });

  initCopyButtons(list);
}

/* ── S2 Radar ── */
function buildS2(allInsights) {
  const trends = allInsights.filter(i => i.type === 'trend' && (i.horizon === 'near' || i.horizon === 'long'));
  const risks  = allInsights.filter(i => i.type === 'risk');

  const tCol = document.getElementById('radarTrends');
  trends.forEach(i => tCol.appendChild(radarItem(i)));

  const rCol = document.getElementById('radarRisks');
  risks.forEach(i => rCol.appendChild(radarItem(i)));
}

function radarItem(insight) {
  const div = document.createElement('div');
  div.className = 'radar-item';
  div.innerHTML = `
    <h4>${insight.title}</h4>
    <p>${insight.summary}</p>
  `;
  return div;
}

/* ── S3 Provocaties ── */
function buildS3(allInsights, role) {
  const provocations = allInsights.filter(i => i.type === 'provocation');
  const container = document.getElementById('provocations');
  provocations.forEach(insight => {
    const div = document.createElement('div');
    div.className = 'provocation-item';
    div.innerHTML = `
      <div class="badges" style="margin-bottom:0.5rem">
        <span class="badge badge-provocation">provocatie</span>
        <span class="badge-horizon">${horizonLabel(insight.horizon)}</span>
      </div>
      <h3>${insight.title}</h3>
      <p>${insight.summary}</p>
      <div class="provocation-question">${generateTeamQuestion(insight)}</div>
    `;
    container.appendChild(div);
  });
}

/* ── S4 Aan de slag ── */
function buildS4(insights, role) {
  const tools = insights.filter(i => i.type === 'tool' || i.type === 'practice');
  const grid = document.getElementById('toolsGrid');
  tools.forEach(insight => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML = `
      <div class="badges" style="margin-bottom:0.5rem">
        <span class="badge badge-${insight.type}">${insight.type}</span>
      </div>
      <h3>${insight.title}</h3>
      <p>${insight.summary}</p>
      <div class="cta-box">${generateNextStep(insight, role.title)}</div>
    `;
    grid.appendChild(card);
  });
}

/* ── S5 Themalandschap ── */
function buildS5(allInsights) {
  const matrix = buildThemeMatrix(allInsights);
  const tbody = document.getElementById('themeBody');
  matrix.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.theme}</td>
      <td>${dot(row.now)}</td>
      <td>${dot(row.near)}</td>
      <td>${dot(row.long)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function dot(n) {
  const cls = n === 0 ? 'dot-0' : n === 1 ? 'dot-1' : 'dot-2plus';
  return `<span class="theme-dot ${cls}">${n > 0 ? n : ''}</span>`;
}

/* ── S6 Team-vragen ── */
function buildS6(insights) {
  const top3 = insights.slice(0, 3);
  const container = document.getElementById('teamQuestions');
  top3.forEach((insight, i) => {
    const question = generateTeamQuestion(insight);
    const div = document.createElement('div');
    div.className = 'team-q';
    div.innerHTML = `
      <span class="team-q-num">${i + 1}</span>
      <div>
        <div class="team-q-text" id="tq-${insight.id}">${question}</div>
        <button class="copy-btn" data-target="tq-${insight.id}" style="margin-top:0.5rem">&#128203; Kopieer vraag</button>
      </div>
    `;
    container.appendChild(div);
  });
  initCopyButtons(container);
}

/* ── S7 Andere lens ── */
function buildS7(roles, currentRole) {
  const container = document.getElementById('lensChips');
  roles.forEach(role => {
    const chip = document.createElement('button');
    chip.className = 'lens-chip' + (role.id === currentRole.id ? ' current' : '');
    chip.textContent = role.emoji + ' ' + role.title;
    if (role.id !== currentRole.id) {
      chip.addEventListener('click', () => {
        sessionStorage.setItem('selectedRole', role.id);
        window.location.reload();
      });
    }
    container.appendChild(chip);
  });
}

/* ── Sticky nav ── */
function initStickyNav() {
  const nav = document.getElementById('stickyNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) nav.classList.add('visible');
    else nav.classList.remove('visible');
  }, { passive: true });
}

/* ── Copy buttons ── */
function initCopyButtons(container) {
  container.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.dataset.target);
      const text = target?.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '✓ Gekopieerd';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '&#128203; Kopieer vraag';
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Selecteer en kopieer handmatig';
      }
    });
  });
}

/* ── Helpers ── */
function horizonLabel(h) {
  return { now: 'Nu', near: 'Nabij', long: 'Lang' }[h] || h;
}

init();
