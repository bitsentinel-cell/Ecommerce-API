'use strict'
import express from 'express';
import dbconnection from "./src/db/dbconnection.js";
import dotenv from 'dotenv'
dotenv.config()
import notFoundMiddleware from './src/middlewares/not-found.js'
import errorHandlerMiddleware from "./src/middlewares/error-handler.js";
import morgan from 'morgan'
import authRouter from "./src/routes/authRoutes.js";

const app = express();
const port = process.env.PORT | 8000;


// middlewares
app.use(morgan('tiny'))
app.use(express.json());


app.get('/' , (req , res)=>{
    return res.send('hello from express server...')
})

// routes
app.use('/api/v1/auth' , authRouter)





app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
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
