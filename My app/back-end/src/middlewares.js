// Seeking for authentication, who are you? (putting the user info in req.user by decoding the header)
// then the authorization of the user through req.user.role! (what you're allowed to do?)

const jwt = require('jsonwebtoken');

const authenticate = async (req,res,next)=>{
    //1- bringing the token:
    const authHeader = req.headers['authorization']; // headers contains many properties one of them is authentication and its format like: authentication: Bearer e!jrn?,#u ... the second element is the token
    // to extract the token from the headers.authentication we need to convert it into an array by split
    const token = authHeader && authHeader.split(' ')[1]; //The && operator protects you from the crash
    if (!token)
        return res.status(401).json({error: 'Access Denied, no Token provided!'})
    //2- Verifying the token:
    try{
        //1- decoding the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tempsecret');
        //2- putting it into req.user to verify the authorization after that and we can too use it in the controllers like extracting the id.
        req.user = decoded; // Now req.user = { id, username/studentId, role }
        next();
    }
    catch (err){
        res.status(403).json({error: 'Invalid or expired token'})
    }
}

const authorize = (req,res,next)=>{
    if (req.user.role !== 0)
        return res.status(403).json({ error: 'Admin access only.' });
    
    next();
}

// Error middlewares !
const logErr = (err, req, res, next)=>{
    console.error(err.stack); // You need to know all the details
    next(err);
}

const handleErrCli = (err, req, res, next)=>{
    return res.status(500).json({error: err.message || "Something went wrong!"})
} // no need for next(err) because it's the final middleware!

module.exports = {authenticate, authorize, logErr, handleErrCli};

//middlware using:
/*1- no middlware: pubic:
login for admin and users, register for users.
2- admin only:
get users, put books
3- anyone logged in:
get books

The Execution Order:
Request comes in
      ↓
authenticate runs first
  → no token?        → 401 stop 
  → bad token?       → 403 stop
  → valid token?     → attach req.user → next() 
      ↓
authorize runs second (only on admin routes)
  → role !== admin?  → 403 stop 
  → role === admin?  → next()
      ↓
Controller runs
*/