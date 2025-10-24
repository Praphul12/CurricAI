import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import "./index.css";

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [prompt, setPrompt] = useState("");
  const [course, setCourse] = useState(null);

  const handlePrompt = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:5000/api/generateCourse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
  <Sidebar /> {/* full-height left panel */}

 <div className="main-content-wrapper">
  <div className="main-content">
    <div className="messages-container">
      {/* Your generated course/messages go here */}
    </div>
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        value={prompt}
        onChange={handlePrompt}
        placeholder="Enter your course description"
      />
      <button type="submit" className="chat-button">Submit</button>
    </form>
  </div>
</div>

</div>

  );
};

export default Home;
