async function init() {
  const res = await fetch('data/roles.json');
  const roles = await res.json();
  const grid = document.getElementById('roleGrid');

  roles.forEach(role => {
    const card = document.createElement('div');
    card.className = 'role-card';
    card.innerHTML = `
      <span class="emoji">${role.emoji}</span>
      <h2>${role.title}</h2>
      <p>${role.description}</p>
      <div class="chips">
        ${role.tags.map(t => `<span class="chip">${t}</span>`).join('')}
      </div>
    `;
    card.addEventListener('click', () => {
      sessionStorage.setItem('selectedRole', role.id);
      window.location.href = 'briefing.html';
    });
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

  document.querySelectorAll('.role-card').forEach(card => observer.observe(card));
}

init();
