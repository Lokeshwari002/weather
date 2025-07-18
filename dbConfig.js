const mysql=require('mysql2');
require("dotenv").config();


const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:"railway"
})

db.connect((err)=>{
    if(err){
        console.log("error in connecting db")
    }
    else{
        console.log("successfully connected to db")
    }
})
module.exports=db;
