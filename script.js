document.getElementById('voteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = localStorage.getItem('voterEmail');
    if (!email) {
        alert('Anda harus login terlebih dahulu.');
        return;
    }

    // Cek apakah email sudah pernah memvote
    if (voters.some(voter => voter.email === email)) {
        alert('Email ini sudah memberikan suara. Anda tidak dapat memberikan suara lagi.');
        return;
    }

    const candidate = document.getElementById('candidate').value;
    const resultsList = document.getElementById('resultsList');
    
    const listItem = document.createElement('li');
    listItem.textContent = `Anda memilih Calon ${candidate}`;
    resultsList.appendChild(listItem);

    // Simpan data pemilih
    const voter = {
        email: email,
        candidate: candidate
    };
    voters.push(voter);
    console.log(voters); // Untuk debugging, bisa dihapus nanti

    // Perbarui tampilan hasil vote
    updateResults();

    // Logout pengguna setelah vote
    logoutUser();
});

document.getElementById('logoutButton').addEventListener('click', function() {
    logoutUser();
});

function updateResults() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    const voteCounts = voters.reduce((counts, voter) => {
        counts[voter.candidate] = (counts[voter.candidate] || 0) + 1;
        return counts;
    }, {});

    for (const candidate in voteCounts) {
        const listItem = document.createElement('li');
        listItem.textContent = `Calon ${candidate}: ${voteCounts[candidate]} suara`;
        resultsList.appendChild(listItem);
    }
}

// Fungsi untuk menampilkan detail kandidat
function showDetails(candidateId) {
    const details = document.getElementById(candidateId);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

// Fungsi untuk scroll ke bagian tertentu
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk logout pengguna
function logoutUser() {
    // Hapus status login dari localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('voterEmail');
    // Redirect ke halaman login
    window.location.href = 'login.html';
}

// Perbarui tampilan hasil vote saat halaman dimuat
updateResults();