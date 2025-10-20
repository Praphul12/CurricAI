import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {auth} from 'express-oauth2-jwt-bearer'
import { authorize } from './Middlewares/authentication.js';
import { connectToDb } from './db.js';
dotenv.config();
const app = express();
const port = 5000 || process.env.PORT;

//JWT validation middleware

// const checkJWT = auth({
//     audience:process.env.AUTH0_AUDIENCE,
//     issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
// })
app.use(cors());
app.use(express.json());

connectToDb();
app.get("/api",authorize,(req,res) =>{
    console.log(req.auth);
    res.json({message : "backend is running and authenticated"})
})

app.listen(port,()=>console.log(`server running on port ${port}`))
