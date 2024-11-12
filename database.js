const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

// Open the database connection
const db = new Database('user-db.db', {verbose: console.log});

// Create the `users` table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        mail TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL
    )
`);

async function addUser(firstName, lastName, mail, password) {
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (firstName, lastName, mail, passwordHash) VALUES (?, ?, ?, ?)');
        const result = stmt.run(firstName, lastName, mail, passwordHash);
        console.log(`User added with ID ${result.lastInsertRowid}`);
    }
    catch(err){
        console.error('Error inserting user:', err.message);
    }
}

async function loginUser(mail, password) {
    try{
        const stmt = db.prepare(`SELECT * FROM users WHERE mail = ?`);
        const user = stmt.get(mail);

        if(user){
            const passwordMatch = await bcrypt.compare(password, user.passwordHash);
            if(passwordMatch){
                console.log('Login successful');
            }
            else{
                console.log('Invalid password');
            }
        }
        else{
            console.log('User not found');
        }
    }
    catch(err){
        console.error('Error fetching user:', err.message);
    }   
}

// Close the database connection
// function closeDatabase(){
//     try{
//         db.close();
//         console.log('Closed SQLite database connection');
//     }
//     catch(err){
//         console.error('Error closing database connection:', err.message);
//     }
// }

// Export functions
module.exports = {
    addUser,
    loginUser,
};