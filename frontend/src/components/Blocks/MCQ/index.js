import React, { useState } from 'react';
import './index.css';

const MCQBlock = ({ question, options, answer }) => {
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSelect = (index) => {
    if (!isSubmitted) setSelected(index);
  };

  const handleSubmit = () => {
    if (selected !== null) setSubmitted(true);
  };

  // Determine class based on selection/submission
  const getOptionClass = (index) => {
    if (!isSubmitted) {
      return selected === index ? 'option selected' : 'option';
    } else {
      if (index === answer) return 'option correct';
      if (index === selected && selected !== answer) return 'option wrong';
      return 'option';
    }
  };

  return (
    <div className="mcq-container">
      <h3 className="mcq-question">{question}</h3>
      <ul className="mcq-options">
        {options.map((option, index) => (
          <li key={index}>
            <button
              className={getOptionClass(index)}
              onClick={() => handleSelect(index)}
              disabled={isSubmitted}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {!isSubmitted ? (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      ) : (
        <p className="feedback">
          {selected === answer
            ? '✅ Correct!'
            : `❌ Wrong! The correct answer was: ${options[answer]}`}
        </p>
      )}
    </div>
  );
};

export default MCQBlock;
