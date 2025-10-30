import React, { useEffect, useState } from 'react'
import HeadingBlock from '../Blocks/Heading';
import ParagraphBlock from '../Blocks/Paragraph';
import CodeBlock from '../Blocks/Code';
import VideoBlock from '../Blocks/Video';
import MCQBlock from '../Blocks/MCQ';
import './index.css'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LessonPdf from '../LessonPdf';

const Lesson = () => {
    const [lessonData,setLessonData] = useState(null);
    const {state} = useLocation();
    // setLessonData(state?.lesson);
    const navigate = useNavigate();
    // console.log(lessonData);
    useEffect(() => {
    if (state?.lesson) {
      setLessonData(state.lesson);
      console.log(state?.lesson);
    }
  }, [state]);

    if(!lessonData) return <p className="lesson-loading">Loading lesson...</p>

    return (
    <div>
        <button className= {"btn-back"} onClick={()=>navigate(-1)}>Go back</button>
        
        <div  id="lesson-content" className="lesson-container">
            {/* <pre className="lesson-json">{JSON.stringify(lessonData, null, 2)}</pre> */}
            {lessonData?.map((block,index)=>{
                switch(block.type){
                    case "heading":
                        return <HeadingBlock key={index} text={block.text} className="heading-block"/>;
                    case "paragraph":
                        return <ParagraphBlock key={index} text={block.text} className="paragraph-block"/>;
                    case "code":
                        return <CodeBlock key={index} language={block.language} code={block.text} className="code-block"/>
                    case "video":
                        return <VideoBlock key={index} url={block.url} className="video-block"/>
                    case "mcq":
                        return (
                            <MCQBlock key={index} 
                                question={block.question}
                                options={block.options}
                                answer={block.answer}
                                className="mcq-block"
                            />
                        )
                    default:
                        return null;   
                }
            })}
         
        </div>
        {lessonData && <LessonPdf lesson={lessonData}/>}
    </div>
    )
}

export default Lesson
