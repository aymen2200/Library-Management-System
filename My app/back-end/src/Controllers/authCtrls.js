// this section is for the admin, there no hashing for the password, the password is
//manually hashed when the DB is ready, you don't need to hash it is the main program.
// the token is created once the user logins, it is composed from: header(describes the used algorithm).payload(the user information).the signature(it is special just for the server it is the only one can read it)
// the hashed password is created one the user register, it is an output of hash(salt + password) and it is stored in the database not in the token because it is a sensitive information.
 
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');
 
 
const login = async (req, res) => {
    //1- Getting the user information:
    const { Email, password } = req.body;
 
    //2- The email and the password must exist:
    if (!Email || !password) {
        return res.status(400).json({ error: 'The Email and the password are required!' }); // Bad request
    }
 
    try {
        //3- Finding the admin through the Email:
        const [rows] = await db.query('SELECT * FROM users WHERE Email = ?', [Email]);
 
        // FIX 1: Check rows.length (not admin.length) — admin wasn't declared yet
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Admin not found!' });
        }
 
        // FIX 2: Declare admin BEFORE using it
        const admin = rows[0];
 
        //4- Comparing the password:
        const match = await bcrypt.compare(password, admin.PasswordHash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid password!' });
        }
 
        //5- If found: Creating the token:
        const token = jwt.sign(
            { id: admin.UserID, userName: admin.Name, role: 0 },
            process.env.JWT_SECRET || 'tempsecret',
            { expiresIn: '8h' }
        );
 
        // FIX 3: admin is a plain object (rows[0]), not an array — use admin.UserID not admin[0].UserID
        res.status(200).json({ message: 'The login is successful', id: admin.UserID, token });
 
    } catch (err) {
        // FIX 4: Added try/catch — without this, any DB error would crash the server
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
 
module.exports = { login };