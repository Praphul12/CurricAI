import React from 'react'
import {Prism} from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';


const CodeBlock = (language,code) => {
  return (
    <div>
        <Prism language= {language} style={tomorrow}>
            {code}
        </Prism>
    </div>
  );
};

export default CodeBlock