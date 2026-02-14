// ============================================================
//  index.js — Home Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');

  // If a user is already logged in, update navbar to show their name
  // and apply the correct body classes
  if (user) {
    document.body.classList.remove('not-authenticated');
    document.body.classList.add('authenticated');
    if (user.role === 'admin') document.body.classList.add('is-admin');
    document.getElementById('nav-username').textContent = user.name;
  }

  // Logout button in the navbar dropdown
  document.getElementById('btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });

});