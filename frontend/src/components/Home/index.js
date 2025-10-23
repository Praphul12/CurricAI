import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Topbar from "../Topbar";
import Course from "../Course";
import "./index.css";

const Home = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [prompt, setPrompt] = useState("");
  const [course, setCourse] = useState(null);

  const handlePrompt = (event) => setPrompt(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      };

      const res = await fetch("http://localhost:5000/api/generateCourse", options);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      {isAuthenticated && <Topbar className="topbar" />}
      <div className="course-wrapper">
        <Course data={course} />
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          value={prompt}
          onChange={handlePrompt}
          placeholder="Enter your course description"
        />
        <button type="submit" className="chat-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
