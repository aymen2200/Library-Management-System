// User Authentication:

const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');



// User regestering:
//1. getting the user information:

const register = async (req, res)=>{
const {Name, Email, password, phone, cardNumber}= req.body;

if (!Name || !Email || !password || !cardNumber){
    return res.status(400).json({error: 'User name and password are required!'})
}

//2- verifying if it is already registered:

const Users = await db.query('SELECT * FROM users WHERE Email = ?', [Email]);
const actualUser = Users[0]; 
if (actualUser.length > 0) return res.status(400).json({error : 'You are already registered!'})
    /* You can just do : const [Users] = db.query('SELECT * FROM users WHERE Email = ?', [Email]); it returns the first array
db.query() returns:
[
    [                          // ← first element: rows (array of objects)
        { UserID: 1, ... },    // row 1
        { UserID: 2, ... },    // row 2
    ],
    [...]                      // ← second element: fields/metadata (you ignore this)
]
*/

//3- Hashing the password:

const hashedPassword = await bcrypt.hash(password, 10); //password + salt, 10 is how match the password is treated 2^10..

await db.query(
    'INSERT INTO users (Name, Email, PasswordHash, Phone, LibraryCardNumber) VALUES (?,?,?,?,?)',
    [Name, Email, hashedPassword, phone || null, cardNumber]
)

res.status(201).json({message:'the Registration operation is successful!'})

}

// user login

const login = async (req, res)=>{
    const {Email, password}= req.body;
    if (!password || !Email){
        return res.status(400).json({error:"the Email and the password are required!"});
    }
    
    // Finding the user (the email owner)
    const [user] = await db.query('SELECT * FROM users WHERE Email = ?', [Email]);

    if (user.length === 0){
    return res.status(401).json({error: "User not found"});
}

    // Comparing and checking the password: 
    const isTruePassword = await bcrypt.compare(password, user[0].PasswordHash);
    if (!isTruePassword){
        return res.status(401).json({error: "Invalid password"});
    }
    
    const token = jwt.sign(
        {name: user[0].Name, id: user[0].UserID, role: 1},
        process.env.JWT_SECRET || 'tempsecret',
        {expiresIn: '8h'},
    );
    res.json({message: "Login successful", id: user[0].UserID, token});
}

// Getting all users:
const getAllUsers = async (req, res)=>{
    const [users] = await db.query('SELECT * FROM Users WHERE Role = 1') 
    const getUsers = users.map(({PasswordHash, Role, ...rest})=> rest)        //destructering the objects and extracting password and returning just rest (all except password)
    res.json(getUsers);
};

const getMe = async (req,res)=>{ // the user sees its information its self,
    const id = req.user.id; //Coming from the middleware authenticate from Token Decoding. and req.user.id id because you store it in id variable when you created the token.

    const [me] = await db.query('SELECT * FROM users WHERE UserID = ?', [id]);
    const {PasswordHash, ...rest} = me[0];
    res.json(rest); 
};


const userHistory = async (req, res)=>{
    const id = req.user.id;
    const [history] = await db.query(
        `SELECT books.Title, books.Genre, borrowingrecords.BorrowingDate, borrowingrecords.DueDate, borrowingrecords.ActualReturnDate
        FROM borrowingrecords
        JOIN bookcopies ON borrowingrecords.CopyID = bookcopies.CopyID
        JOIN books ON bookcopies.BookID = books.BookID
        WHERE borrowingrecords.UserID = ?
        `, [id]
    )
    if (history.length === 0){
        return res.status(404).json({error: "No borrowing history found"});
    }
    return res.json(history); 
};



module.exports = {register, login, getAllUsers, getMe, userHistory};
