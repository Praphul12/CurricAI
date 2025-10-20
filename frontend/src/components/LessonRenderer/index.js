import React from 'react'
import HeadingBlock from '../Blocks/Heading';
import ParagraphBlock from '../Blocks/Paragraph';
import CodeBlock from '../Blocks/Code';
import VideoBlock from '../Blocks/Video';
import MCQBlock from '../Blocks/MCQ';




const Lesson = () => {
    const lessonData = [
  { type: "heading", text: "Introduction to AI" },
  { type: "paragraph", text: "Artificial intelligence (AI) is a rapidly evolving field that focuses on creating machines capable of intelligent behavior." },
  { type: "code", language: "python", text: "print('Hello, AI!')" },
  { type: "video", url: "https://youtu.be/dQw4w9WgXcQ" },
  { 
    type: "mcq", 
    question: "What is AI?", 
    options: ["A type of robot", "A field of computer science", "A programming language"], 
    answer: 1 
  }
];
  return (
    <div>
        {
            lessonData.map((block,index)=>{
                switch(block.type){
                    case "heading":
                        return <HeadingBlock key={index} text={block.text}/>;
                    case "paragraph":
                        return <ParagraphBlock key={index} text= {block.text}/>;
                    case "code":
                        return <CodeBlock key={index} language={block.language} code = {block.text}/>
                    case "video":
                        return  <VideoBlock key={index} url={block.url}/>
                    case "mcq":
                        return (
                            <MCQBlock key={index} 
                            question={block.question}
                            options={block.options}
                            answer={block.answer}
                         />)
                    default:
                        return null;   
                }
            })
        }

    </div>
  )
}

export default Lesson