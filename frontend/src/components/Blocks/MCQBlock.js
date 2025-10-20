import React, { useState } from 'react'

const MCQBlock = (question,options,answer) => {
    const [selected, setSelected] = useState(null);
    const [issubmitted, setSubmitted] = useState(false);
    const [optionColor, setOptionColor] = useState(["#598392","#aec3b0"]);

    const changeColor = ()=>{
        
    }
    const handleSelect = (index)=>{
        if(!issubmitted)setSelected(index);
    }

    const handleSubmit = ()=>{
        if(!issubmitted)setSubmitted(true);
    }
  return (
    <div>
        <h3>{question}</h3>
        <ul>
            {options.map((index,option)=>(
                <li key={index}>
                    <button onClick={()=>handleSelect(index)} style={{backgroundColor: selected === index? optionColor[0]: optionColor[1]}}>
                        {option}
                    </button>
                </li>
            ))}
        </ul>
        {issubmitted? (<button onClick={handleSubmit}>
            Submit
        </button>):
        (<p>{selected === answer}? "✅ Correct!": `❌ Wrong! The correct answer is: ${options[answer]}` </p>)}
    </div>
  )
}

export default MCQBlock