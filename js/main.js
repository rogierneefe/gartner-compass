/* ── Knelpunten definitie (mapped naar beste rol) ── */
const KNELPUNTEN = [
  { label: "We bouwen losse dashboards zonder aantoonbare impact", role: "informatiemanager",    icon: "📉" },
  { label: "AI-initiatieven starten maar schalen niet",            role: "informatiemanager",    icon: "🚀" },
  { label: "Ons datafundament is niet op orde voor AI",            role: "data-bi-specialist",   icon: "🏗️" },
  { label: "Faculteiten bouwen elk hun eigen data-eiland",         role: "data-bi-specialist",   icon: "🏝️" },
  { label: "Governance is papier, geen uitvoerbare praktijk",      role: "governance-privacy",   icon: "📋" },
  { label: "AVG en AI Act: we weten niet waar we staan",           role: "governance-privacy",   icon: "🛡️" },
  { label: "Medewerkers werken niet datagedreven",                  role: "opleidingsmanager",    icon: "📚" },
  { label: "We missen bewijs dat data-investeringen renderen",     role: "beleidsadviseur",      icon: "💰" },
  { label: "Onderzoeksdata is ongestructureerd en onbruikbaar",    role: "onderzoeker-lectoraat",icon: "🔬" },
  { label: "CvB vraagt een datastrategie — waar begin ik?",        role: "informatiemanager",    icon: "🗺️" },
];

/* ── Tab-switcher ── */
function switchTab(tab) {
  const isRol = tab === 'rol';
  document.getElementById('panelRol').style.display      = isRol ? '' : 'none';
  document.getElementById('panelKnelpunt').style.display = isRol ? 'none' : '';
  document.getElementById('tabRol').classList.toggle('active', isRol);
  document.getElementById('tabKnelpunt').classList.toggle('active', !isRol);
}

/* ── Init ── */
async function init() {
  const [rolesRes, insightsRes] = await Promise.all([
    fetch('data/roles.json'),
    fetch('data/insights.json')
  ]);
  const roles    = await rolesRes.json();
  const insights = await insightsRes.json();

  buildRoleGrid(roles, insights);
  buildKnelpuntList(roles);
}

/* ── Rolkaarten met compass-preview (#2) ── */
function buildRoleGrid(roles, allInsights) {
  const grid = document.getElementById('roleGrid');

  roles.forEach(role => {
    const topInsights = selectInsightsForRole(role, allInsights);
    const topTitles   = topInsights.slice(0, 3).map(i =>
      `<li><span class="badge badge-${i.type}" style="font-size:0.65rem;padding:0.1rem 0.4rem">${i.type}</span> ${i.title}</li>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'role-card';
    card.innerHTML = `
      <span class="emoji">${role.emoji}</span>
      <h2>${role.title}</h2>
      <p>${role.description}</p>
      <div class="chips">
        ${role.tags.map(t => `<span class="chip">${t}</span>`).join('')}
      </div>
      <button class="preview-toggle" aria-expanded="false">▸ Bekijk perspectief</button>
      <div class="card-preview" hidden>
        <p class="preview-prompt">${role.perspective_prompt}</p>
        <p class="preview-label">Top inzichten voor jou:</p>
        <ul class="preview-insights">${topTitles}</ul>
      </div>
      <button class="card-cta">Bekijk jouw briefing →</button>
    `;

    // Preview toggle — stop propagation
    const toggle  = card.querySelector('.preview-toggle');
    const preview = card.querySelector('.card-preview');
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = preview.hidden === false;
      preview.hidden = open;
      toggle.textContent = open ? '▸ Bekijk perspectief' : '▾ Verberg perspectief';
      toggle.setAttribute('aria-expanded', String(!open));
    });

    // CTA → briefing
    card.querySelector('.card-cta').addEventListener('click', e => {
      e.stopPropagation();
      goToBriefing(role.id);
    });

    // Klik op kaart zelf (niet op toggle/cta)
    card.addEventListener('click', () => goToBriefing(role.id));

    grid.appendChild(card);
  });

  // Fade-in via Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.role-card').forEach(c => observer.observe(c));
}

/* ── Knelpunten-lijst (#1) ── */
function buildKnelpuntList(roles) {
  const list = document.getElementById('knelpuntList');

  KNELPUNTEN.forEach(k => {
    const role = roles.find(r => r.id === k.role);
    if (!role) return;

    const item = document.createElement('button');
    item.className = 'knelpunt-item';
    item.innerHTML = `
      <span class="knelpunt-icon">${k.icon}</span>
      <span class="knelpunt-text">${k.label}</span>
      <span class="knelpunt-role">${role.emoji} ${role.title}</span>
    `;
    item.addEventListener('click', () => {
      sessionStorage.setItem('selectedRole', k.role);
      sessionStorage.setItem('selectedKnelpunt', k.label);
      window.location.href = 'briefing.html';
    });
    list.appendChild(item);
  });
}

function goToBriefing(roleId) {
  sessionStorage.setItem('selectedRole', roleId);
  sessionStorage.removeItem('selectedKnelpunt');
  window.location.href = 'briefing.html';
}

init();
