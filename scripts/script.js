// Handle registration from submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const mail = document.getElementById('regMail').value;
    const password = document.getElementById('regPassword').value;

    try{
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, mail, password }),
        });

        const result = await response.json();
        alert(result.message);
    }
    catch(error){
        console.error('Error:', error);
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const mail = document.getElementById('loginMail').value;
    const password = document.getElementById('loginPassword').value;

    try{
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail, password }),
        });

        const result = await response.json();
        const loginMessage = document.getElementById('loginMessage');

        loginMessage.textContent = result.message;
        loginMessage.style.color = response.ok ? 'green' : 'red';
    }
    catch(error){
        console.error('Error:', error);
    }
});