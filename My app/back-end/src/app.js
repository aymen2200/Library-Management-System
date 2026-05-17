
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();



app.use(express.json());
const auth = require('./Routes/authRoutes');
const user = require('./Routes/userRoutes');
const books = require('./Routes/routes');
const {logErr, handleErrCli} = require('./middlewares')



app.use('/auth', auth);
app.use('/user', user);
app.use('/books', books);
app.use(logErr);
app.use(handleErrCli);

app.listen(3000, ()=>{
    console.log('Our Server is listening !!')
})