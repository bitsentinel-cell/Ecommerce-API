import express from 'express';
import dbconnection from "./src/db/dbconnection.js";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT | 8000;




const serverStart = async () =>{
    try {
        await dbconnection(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`express server is up and running on port : ${port}`);
        })
    }catch (err){
        console.log(err)
    }
}
serverStart().then();
