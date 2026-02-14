// ============================================================
//  profile.js — Profile Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // nav.js runs first and redirects to login if not authenticated
  initNav();

  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  // Populate profile fields
  document.getElementById('profile-name').textContent  = user.name;
  document.getElementById('profile-email').textContent = user.email;
  document.getElementById('profile-role').textContent  =
    user.role.charAt(0).toUpperCase() + user.role.slice(1);

  // Logout
  document.getElementById('btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });

  // Edit Profile (placeholder for future phase)
  document.getElementById('btn-edit-profile').addEventListener('click', () => {
    alert('Edit Profile coming in a later phase.');
  });

});
