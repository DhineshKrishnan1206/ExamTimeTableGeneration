const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db=require('./dbConfig');
const bodyParser = require('body-parser');

//imports
const authRoutes = require('./routes/auth');
const app = express();
app.use(bodyParser.urlencoded({extended:true,httpOnly:false}))
app.use(bodyParser.json())
app.use(cors());


db();
//Routes
app.use('/api',authRoutes);



app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something went wrong");
});
app.listen(process.env.PORT,()=>{
    console.log(`Listening on Port ${process.env.PORT}`);
})