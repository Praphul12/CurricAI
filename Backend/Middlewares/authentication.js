import { auth } from "express-oauth2-jwt-bearer"
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config();
//Auth is a middleware
const checkJWT = auth({
            audience:process.env.AUTH0_AUDIENCE,
            issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
        });


export const authorize = [
    checkJWT,
    async(req,res,next)=>{
    
    //First we need to get the token inorder to hit the Auth0/userinfo
    try {

        const token = req.headers.authorization?.split(" ")[1]; //Remove the bearear
        if(!token )return res.status(401).json({error : "missing token"});

        const options = {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                Authorization: `Bearer ${token}`,
                audience:process.env.AUTH0_AUDIENCE,

            },
            
        };
    
        const userRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`,options);

        if(userRes.ok){

            const profile = await userRes.json();
            // console.log(profile);
            req.user = profile;
            next();
        }
        else{
            console.error("User profile not found");
        }

    } catch (err) {
        console.error({err});
        res.status(500).json({error:"Authenticaion failed"});
    }
}

]
