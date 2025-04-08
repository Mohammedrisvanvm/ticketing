import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use('/api/users/currentuser',(req,res)=>{
    res.send("hi there");
    
})
app.use('/api/users',(req,res)=>{
    res.send("hi there");
    
})

app.listen(3000, () => console.log("listen on 3000!!!!"));
