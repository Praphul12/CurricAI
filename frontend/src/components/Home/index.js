import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
// import {Navigate} from 'react-router-dom'
import Topbar from "../Topbar";
import Lesson from "../LessonRenderer";


const Home = () => {
    const {isAuthenticated,getAccessTokenSilently} = useAuth0();
    useEffect(()=>{
        
        const sendToken = async()=>{
            try{
                const token = await getAccessTokenSilently();
                console.log(token);

                const options = {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // body: JSON.stringify({message: "From frontend"})
                }
                const res = await fetch("http://localhost:5000/api",options);
                if(res.ok){
                    const data = await res.json();
                    console.log(data);
                
                }
                else {
                console.error("Unauthorized ",res.status);
                return;
                }

                
            }catch(err){
                console.log(err);
            }
          }
          sendToken();
          
    },[getAccessTokenSilently])
  return (
    
    <div> 
        {isAuthenticated && <Topbar/>}
        <Lesson/>
    </div>
  )
}

export default Home