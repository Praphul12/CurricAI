import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import {auth} from 'express-oauth2-jwt-bearer'
import { authorize } from './Middlewares/authentication.js';
import { connectToDb } from './db.js';
import {courseGenerator,lessonGenerator} from './services/generator.js';
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

app.get("/api/generateCourse", async (req, res) => {
  try {
    const topic = req.query.topic || "Introduction to APIS"; // optional query param
    const course = await courseGenerator(topic);
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate course" });
  }
});

app.get("/api/generateLesson", async (req, res) => {
  try {
    // const topic = req.query.topic || "Introduction to APIS"; // optional query param
    const lesson = await lessonGenerator("AI Basics","Intro","What is AI?");
    res.status(200).json(lesson);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate course" });
  }
});


app.listen(port,()=>console.log(`server running on port ${port}`))
