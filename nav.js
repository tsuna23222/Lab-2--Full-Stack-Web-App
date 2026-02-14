// ============================================================
//  nav.js — Shared Navigation Helper
//  Reads sessionStorage for the current user and updates
//  the navbar state on every authenticated page.
// ============================================================

function initNav() {
  const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');

  const navGuest  = document.getElementById('nav-guest');
  const navAuth   = document.getElementById('nav-auth');
  const navUsername = document.getElementById('nav-username');

  if (user) {
    document.body.classList.remove('not-authenticated');
    document.body.classList.add('authenticated');
    if (user.role === 'admin') document.body.classList.add('is-admin');
    if (navGuest)    navGuest.classList.add('d-none');
    if (navAuth)     navAuth.classList.remove('d-none');
    if (navUsername) navUsername.textContent = user.name;
  } else {
    // Not logged in — redirect to login
    window.location.href = 'login.html';
  }
}
