const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { addUser, loginUser } = require('../database');

const app = express();
const port = 3000;

//  Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS and JavaScript from "scripts" and "styles"
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'styles')));

// Serve "index.html" for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Login route
app.post('/login', async (req, res) => {
    const { mail, password } = req.body;

    const result = await loginUser(mail, password);

    try{
        if(result.success){
            res.json({ success: true, message: 'Login successful' });
        }
        else{
            res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Login failes' });
    }
});

// Add user (for testing or registration purposes)
app.post('/register', async (req, res) => {
    const { firstName, lastName, mail, password } = req.body;

    try{
        await addUser(firstName, lastName, mail, password);
        res.json({ success: true, message: 'User registered successfully' });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

//  Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})