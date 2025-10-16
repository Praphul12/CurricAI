import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = 5000 || process.env.PORT;


app.use(cors());
app.use(express.json());

app.get("/api",(req,res) =>{
    res.json({message : "backend is running"})
})

app.listen(port,()=>console.log(`server running on port ${port}`))
