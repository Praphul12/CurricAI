import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectionString = process.env.MONGODB_URI

const connectionParams = {  
    useNewUrlParser : true,
    useUnifiedTopology : true

}

export const connectToDb = async()=>{
    try {
        await mongoose.connect(connectionString,connectionParams);
        console.log("Connected to Db");
    } catch (error) {
        console.error("Failed to connect to DB");
    }
}

