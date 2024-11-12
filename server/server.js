const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { addUser, loginUser } = require('database');

const app = express();
const port = 3000;

//  Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like your HTML page
app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.post('/login', async (req, res) => {
    const { mail, password } = req.body;

    const result = await loginUser(mail, password);

    if(result.success){
        return res.json({ success: true, message: result.message });
    }
    else{
        return res.status(400).json({ success: false, message: result.message });
    }
});

// Add user (for testing or registration purposes)
app.post('/register', async (req, res) => {
    const { firstName, lastName, mail, password } = req.body;

    await addUser(firstName, lastName, mail, password);
    res.json({ success: true, message: 'User registered successfully' });
});

//  Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})