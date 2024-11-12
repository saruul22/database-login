// Handle registration from submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    try{
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type: 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, mail, password });
        })
    }
})