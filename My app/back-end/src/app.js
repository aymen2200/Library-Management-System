
require('dotenv').config();
const express = require("express");
const app = express();
const booksRoutes = require('./Routes/routes')
app.use(express.json());
const auth = require('./Routes/authRoutes');
const user = require('./Routes/userRoutes');
const {logErr, handleErrCli} = require('./middlewares')

app.use('/',booksRoutes);
app.use('/auth', auth);
app.use('/user', user);
app.use(logErr);
app.use(handleErrCli);


app.listen(3000, ()=>{
    console.log('Our Server is listening !!')
})