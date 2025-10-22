import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.css';

const CodeBlock = ({ language, code }) => {
  // Convert escaped newline and tab characters into actual line breaks and tabs
  const formattedCode = code.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

  return (
    <div className='code-container'>
      <Prism language={language} style={tomorrow} showLineNumbers>
        {formattedCode}
      </Prism>
    </div>
  );
};

export default CodeBlock;
