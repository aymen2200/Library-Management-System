// User Authentication:

const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');



// User regestering:
//1. getting the user information:

const register = async (req, res) => {
    const { name, email, password, } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'User name and password are required!' });
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0)
            return res.status(400).json({ error: 'You are already registered!' });
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (Name, Email, PasswordHash) VALUES (?,?,?)',
            [name, email, hashedPassword]
        );
        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// user login

const login = async (req, res)=>{
    const {email, password}= req.body;
    if (!password || !email){
        return res.status(400).json({error:"the email and the password are required!"});
    }
    try{
    // Finding the user (the email owner)
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0){
    return res.status(401).json({error: "User not found"});
}

    // Comparing and checking the password: 
    const isTruePassword = await bcrypt.compare(password, user[0].PasswordHash);
    if (!isTruePassword){
        return res.status(401).json({error: "Invalid password"});
    }
    
    const token = jwt.sign(
    { name: user[0].Name, id: user[0].UserID, role: user[0].Role }, 
    process.env.JWT_SECRET || 'tempsecret',
    { expiresIn: '72h' }
);
res.json({ message: "Login successful", id: user[0].UserID, name: user[0].Name, token })}
 catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
}
}

// Getting all users:
const getAllUsers = async (req, res)=>{
    const [users] = await db.query('SELECT * FROM Users WHERE Role = 1 and IsDeleted = 0') 
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

const deleteUser = async (req, res) =>{
    const userID  = req.params.id;
    try{
        const [rows] = await db.query(
            'Update users set IsDeleted = 1 Where UserID = ? and IsDeleted = 0',
            [userID]
        );
        if (rows.affectedRows == 0) return res.status(404).json({message : "user not found!"});
        res.status(201).json({message : `the user ${userID} is Deleted!`})
    } catch(err){
        console.error(err);
        res.status(500).json({message : "Server error!"})
    }
}

const changePassword = async (req, res) => {
  const userID = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res.status(400).json({ error: "Old and new password are required!" });

  try {
    const [user] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userID]);
    if (user.length === 0)
      return res.status(404).json({ error: "User not found" });

    const isCorrect = await bcrypt.compare(oldPassword, user[0].PasswordHash);
    if (!isCorrect)
      return res.status(401).json({ error: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      'UPDATE Users SET PasswordHash = ? WHERE UserID = ?',
      [hashedPassword, userID]
    );

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const changeName = async (req, res) => {
  const userID = req.user.id;
  const { newName } = req.body;

  if (!newName)
    return res.status(400).json({ error: "New name is required!" });

  try {
    const [rows] = await db.query(
      'UPDATE Users SET Name = ? WHERE UserID = ?',
      [newName, userID]
    );
    if (rows.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Name changed successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


const getUserFines = async (req, res) => {
  const { status } = req.query;
  const userID = req.user.id;

  if (!userID) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    let query = `SELECT * FROM fines WHERE UserID = ?`;
    const params = [userID];

    if (status) {
      query += ` AND PaymentStatus = ?`;
      params.push(status);
    }
   

    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No result" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

const updatePfp = async (req, res, next) => {
  const userID = req.user.id;
  const { profilePicture } = req.body;

  if (!profilePicture)
    return res.status(400).json({ error: "Profile picture URL is required!" });

  try {
    const [rows] = await db.query(
      'UPDATE Users SET ProfilePicture = ? WHERE UserID = ?',
      [profilePicture, userID]
    );
    if (rows.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Profile picture updated successfully!" });
  } catch (err) {
    next(err);
  }
};


module.exports = {register, login, getAllUsers, getMe, userHistory, deleteUser, changePassword, changeName, getUserFines, updatePfp};
