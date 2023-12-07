'use strict'
import express from 'express';
import dbconnection from "./src/db/dbconnection.js";
import dotenv from 'dotenv';
dotenv.config();


// error handling modules
import notFoundMiddleware from './src/middlewares/not-found.js';
import errorHandlerMiddleware from "./src/middlewares/error-handler.js";

// import middlewares
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import cors from 'cors'
import rateLimiter from "express-rate-limiter";
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// routes
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import orderRouter from "./src/routes/reviewRoutes.js";


const app = express();
const port = process.env.PORT | 8000;


// security packages
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);
app.use(helmet());
app.use(cors());
// app.use(xss());
// app.use(mongoSanitize());

// middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./src/public'));
app.use(fileUpload())
app.get('/api/v1' , (req , res)=>{
    console.log(req.signedCookies)
    return res.send('hello from express server...');
})

// routes
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
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
