const githubForm = document.getElementById('githubForm');
const usernameInput = document.getElementById('usernameInput');
const userInfoCard = document.getElementById('userInfoCard');
function moveCard() {
    const card = document.querySelector('.card');
    card.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
    }, 300); // Adjust the duration as needed
}

githubForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();

    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            // Display user info in card
            document.getElementById('avatarImage').src = data.avatar_url;
            document.getElementById('userName').textContent = data.name || data.login;
            document.getElementById('userLogin').textContent = `Username: ${data.login}`;
            document.getElementById('publicRepos').textContent = `No. of Public Repos: ${data.public_repos}`;
            document.getElementById('publicGists').textContent = `No. of Public Gists: ${data.public_gists}`;
            document.getElementById('createdAt').textContent = `Profile Created At: ${new Date(data.created_at).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}`;
            userInfoCard.classList.remove('hidden');
            moveCard();
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userInfoCard.innerHTML = `<p>Error: User not found!</p>`;
            userInfoCard.classList.remove('hidden');
        });
});
