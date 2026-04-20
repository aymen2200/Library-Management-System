// this section is for the admin, there no hashing for the password, the password is
//manually hashed when the DB is ready, you don't need to hash it is the main program.
// the token is created once the user logins, it is composed from: header(describes the used algorithm).payload(the user information).the signature(it is special just for the server it is the only one can read it)
// the hashed password is created one the user register, it is an output of hash(salt + password) and it is stored in the database not in the token because it is a sensitive information.

const jwt = require('jsonwebtoken')
const db = require('../config/db');
const bcrypt = require('bcrypt');


const login = async (req, res)=>{ 
    //1- Getting the user information:
    const {Email, password} = req.body;
    //2- the name and the password must exist
    if (!Email || !password){
        return res.status(400).json({error: 'the Email and the password are required!'}); //Bad request
        } // if are valid then: Find the admin (comparison); admin password is hardcoded: no hashing yet!
    //3- finding the user through the Email:
    const [admin] = await db.query('SELECT * FROM users WHERE Email = ?',
    [Email]); // the admin array that contains the actual admin object!
        if(admin.length === 0){
        return res.status(401).json({error: 'Admin not found!'})
    }


        const match = await bcrypt.compare(password, admin[0].PasswordHash);
        if(!match){
            return res.status(401).json({error: 'Invalid password!'})
        }
        //4- If found: Creating the token:
        const token = jwt.sign( // Three parameters: {userId,userName,userRole .. (information about the user),process.env.JWT_SECRET, {expiresIn: the time you want to end the validity of the login}}
            {id: admin[0].UserID, userName:admin[0].Name, role: 0},
            process.env.JWT_SECRET || 'tempsecret', //if not found
            {expiresIn:'8h'}
        )
        res.status(200).json({message: 'The login is successful', id:admin.UserID, token})
    };

    module.exports= {login};

    // with dummy data:
    //const admin = admins.find(element => element.userName===userName && element.password === password)
    //if (!admin) return res.status(401).json({error: 'Invalid credentials'}) //Unauthorized
