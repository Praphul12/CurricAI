import React from "react";
import ReactMarkdown from "react-markdown";
import "./index.css";

const ParagraphBlock = ({ text }) => {

  return (
    <div className="para">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default ParagraphBlock;
