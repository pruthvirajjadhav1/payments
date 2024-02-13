const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const cores = require("cors");


const app =  express();
app.use(cores());
app.use(express.json())
dotenv.config();
const port = process.env.port;
db();


const routes = require("./routes/index");
app.use("/api/v1", routes);


app.get("/",(req,res)=>{
    res.send("hello");
})



app.listen(port,()=> {
    console.log(`listening on ${port}`);
})

// test123