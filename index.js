const db=require('./dbConfig');
const express=require('express')
const cors=require('cors')
require("dotenv").config();

const app=express();

app.use(express.json());
app.use(cors())

const PORT=process.env.DB_PORT

app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})


app.get("/",(req,res)=>{
    return res.json("hi")
})



app.get("/weather",(req,res)=>{
    db.query("select * from weather_details order by created_at desc",(err,results)=>{
        if(err){
            return res.json({message:"db error"})
        }
        const data=results.map(result=>({
            location:result.location,
            temperature:result.temperature,
            humidity:result.humidity,
            wind:result.wind

        }))
        return res.json(data)
    })
})


app.post("/post",(req,res)=>{
    const{location,temperature,humidity,wind}=req.body;
    if (!location || temperature == null || humidity == null || wind == null) {
        return res.status(400).json({ message: "Invalid input" });
      }
    
    
    
    db.query("insert into weather_details(location,temperature,humidity,wind)values(?,?,?,?)",[location,temperature,humidity,wind],(err,result)=>{
        if(err){
            return res.json({message:"error in inserting db"})
        }
        else{
            return res.json({message:"successfully added to db",id:result.insertId})
        }
    })
})