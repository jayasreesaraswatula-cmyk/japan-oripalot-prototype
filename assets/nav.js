/* ============================================
   Oripalot Prototype — Shared Nav Component
   ============================================ */

// Simulated user state
const USER = {
  oripaCoins: 10000,
  freeCoins: 500,
  rank: 'Silver',
  name: 'Jayasree'
};

// Inject top nav + bottom nav into any page
function injectNav(activePage = '') {
  const topNav = `
    <nav class="top-nav">
      <a href="../index.html" class="logo">🎴 Oripalot</a>
      <div class="coin-balance">
        <span class="coin-badge oripa">🪙 ${USER.oripaCoins.toLocaleString()}</span>
        <span class="coin-badge free">💚 ${USER.freeCoins.toLocaleString()}</span>
      </div>
    </nav>`;

  const bottomNav = `
    <nav class="bottom-nav">
      <a href="../index.html" class="${activePage === 'home' ? 'active' : ''}">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        Oripa
      </a>
      <a href="wallet.html" class="${activePage === 'wallet' ? 'active' : ''}">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
        Wallet
      </a>
      <a href="../index.html" class="${activePage === 'quests' ? 'active' : ''}">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        Quests
      </a>
      <a href="profile.html" class="${activePage === 'account' ? 'active' : ''}">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        Account
      </a>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', topNav);
  document.body.insertAdjacentHTML('beforeend', bottomNav);
}

// Back button helper
function backButton(label = 'Back', href = '../index.html') {
  return `<a href="${href}" style="display:inline-flex;align-items:center;gap:6px;color:var(--text-muted);text-decoration:none;font-size:0.85rem;margin-bottom:20px;">
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    ${label}
  </a>`;
}

// Show a toast notification
function showToast(message, type = 'success') {
  const colors = { success: 'var(--success)', danger: 'var(--danger)', warning: 'var(--warning)', info: 'var(--accent)' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:var(--bg-card); border:1px solid ${colors[type]};
    color:${colors[type]}; padding:12px 20px; border-radius:var(--radius);
    font-size:0.85rem; font-weight:600; z-index:999;
    animation: fadeIn 0.2s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// OTP input auto-advance
function setupOTPInputs(containerSelector) {
  const inputs = document.querySelectorAll(`${containerSelector} input`);
  inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && i < inputs.length - 1) {
        inputs[i + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && i > 0) {
        inputs[i - 1].focus();
      }
    });
  });
}
