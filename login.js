function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    // Simpan status login dan email di localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('voterEmail', profile.getEmail());

    // Redirect ke halaman utama
    window.location.href = 'index.html';
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi login dengan email dan password
    if (validateUser(email, password)) {
        // Simpan status login dan email di localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('voterEmail', email);

        // Redirect ke halaman utama
        window.location.href = 'index.html';
    } else {
        alert('Email atau password salah!');
    }
});

function validateUser(email, password) {
    // Validasi user dari users.js
    return users.some(user => user.email === email && user.password === password);
}