'use strict'
import mongoose from "mongoose";
const dbconnection =  function (uri){
    return mongoose.connect(uri)
}
export default dbconnection;