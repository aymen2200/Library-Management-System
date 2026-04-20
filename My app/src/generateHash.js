require('dotenv').config();
const db = require('./config/db');
const bcrypt = require('bcrypt');


const generateAdmin = async ()=>{
  const pass = process.env.ADMIN_PASSWORD;
  const hash = await bcrypt.hash(pass, 10);

  await db.query("UPDATE users SET PasswordHash = ? WHERE Role = 0",[hash] ); // db.query(sql, arr); you must store it in an array else it won't work!
  console.log('Admin password updated successfully!');
}

const generateFourEssentialUsers = async ()=>{
  const passJohn = process.env.JOHN_PASSWORD;
  const passJane = process.env.JANE_PASSWORD;
  const passMichael = process.env.MICHAEL_PASSWORD;
  const passEmily = process.env.EMILY_PASSWORD;

  const pass1 = await bcrypt.hash(passJohn, 10);
  await db.query('UPDATE users SET PasswordHash = ? WHERE UserID = 2', [pass1]);
  const pass2 = await bcrypt.hash(passJane, 10);
  await db.query('UPDATE users SET PasswordHash = ? WHERE UserID = 3', [pass2]);
  const pass3 = await bcrypt.hash(passMichael, 10);
  await db.query('UPDATE users SET PasswordHash = ? WHERE UserID = 4', [pass3]);
  const pass4 = await bcrypt.hash(passEmily, 10);
  await db.query('UPDATE users SET PasswordHash = ? WHERE UserID = 5', [pass4]);
}

generateAdmin();
generateFourEssentialUsers();