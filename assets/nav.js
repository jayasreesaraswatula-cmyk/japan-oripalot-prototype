/* ============================================
   Oripalot Prototype — Shared Nav (Figma style)
   ============================================ */

const USER = {
  oripaCoins: 10000,
  freeCoins:  10000,
  name: 'Jayasree',
  rank: 'Bronze'
};

function injectNav(activePage = '', loggedIn = true) {
  if (loggedIn) {
    document.body.insertAdjacentHTML('afterbegin', `
      <header class="top-header">
        <a href="../index.html" class="logo">
          <div class="logo-icon">🎴</div>
          <span class="logo-text">オリパロット</span>
        </a>
        <div class="header-right">
          <div class="coin-display">
            <span class="diamond">💎 ${USER.freeCoins.toLocaleString()}</span>
            <span class="gold">🟡 ${USER.oripaCoins.toLocaleString()}</span>
            <a href="coin-purchase.html" class="coin-add-btn">+</a>
          </div>
          <div class="notif-btn">🔔<div class="notif-dot"></div></div>
        </div>
      </header>`);
  } else {
    document.body.insertAdjacentHTML('afterbegin', `
      <header class="auth-header">
        <a href="../index.html" class="logo">
          <div class="logo-icon">🎴</div>
          <span class="logo-text">オリパロット</span>
        </a>
        <div class="auth-header-btns">
          <a href="registration.html" class="btn-signup-sm">登録</a>
          <a href="registration.html" class="btn-login-sm">ログイン</a>
        </div>
      </header>`);
  }

  const navItems = [
    { id: 'oripa',   icon: '🎴', label: 'オリパ',   href: '../index.html' },
    { id: 'loot',    icon: '📦', label: 'MY LOOT',  href: 'prize-history.html' },
    { id: 'quest',   icon: '🎯', label: 'クエスト', href: '#' },
    { id: 'mypage',  icon: '👤', label: 'マイページ', href: 'mypage.html' },
  ];

  const navHTML = navItems.map(item => `
    <a href="${item.href}" class="${activePage === item.id ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
    </a>`).join('');

  document.body.insertAdjacentHTML('beforeend',
    `<nav class="bottom-nav">${navHTML}</nav>`);
}

function showToast(message, type = 'default') {
  const colors = { success: '#27AE60', danger: '#E8002D', warning: '#F59E0B', default: '#333', info: '#4A90D9' };
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.style.background = colors[type] || colors.default;
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

function setupOTPInputs(containerSelector) {
  const inputs = document.querySelectorAll(`${containerSelector} input`);
  inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
      if (input.value.length >= 1 && i < inputs.length - 1) inputs[i+1].focus();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && i > 0) inputs[i-1].focus();
    });
  });
}
