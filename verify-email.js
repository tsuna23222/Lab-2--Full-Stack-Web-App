// ============================================================
//  verify-email.js — Verify Email Page Logic
//  Full-Stack App (Student Build)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Read the pending user saved by register.js
  const pendingUser = JSON.parse(sessionStorage.getItem('pendingUser') || 'null');

  // If no pending user, send back to register
  if (!pendingUser) {
    window.location.href = 'register.html';
    return;
  }

  // Show the email address in the alert
  document.getElementById('verify-email-display').textContent = pendingUser.email;

  // Simulate Email Verification button
  document.getElementById('btn-simulate-verify').addEventListener('click', () => {
    // Mark the pending user as verified
    pendingUser.verified = true;
    sessionStorage.setItem('pendingUser', JSON.stringify(pendingUser));

    // Show success message
    document.getElementById('verify-success-msg').classList.remove('d-none');

    // Auto-navigate to login after short delay
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });

  // Go to Login button
  document.getElementById('btn-go-login').addEventListener('click', () => {
    window.location.href = 'login.html';
  });

});
