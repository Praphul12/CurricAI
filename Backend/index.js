import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import {auth} from 'express-oauth2-jwt-bearer'
import { authorize } from './Middlewares/authentication.js';
import { connectToDb } from './db.js';
import {courseGenerator,lessonGenerator} from './services/generator.js';
const app = express();
import courseRoutes from './Routes/courseRoutes.js'
import moduleRoutes from './Routes/moduleRoutes.js'
import lessonRoutes from './Routes/lessonRoutes.js';
const port = 5000 || process.env.PORT;

//JWT validation middleware

const checkJWT = auth({
            audience:process.env.AUTH0_AUDIENCE,
            issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
        });
app.use(cors());

app.use(express.json());

connectToDb();

app.use("/api/course",courseRoutes);
app.use("/api/modules",moduleRoutes);

app.use("/api/lesson",lessonRoutes);

// app.use("/api/lesson",lessonRoutes);





app.listen(port,()=>console.log(`server running on port ${port}`))
