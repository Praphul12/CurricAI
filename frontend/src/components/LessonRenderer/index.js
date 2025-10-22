import React, { useEffect, useState } from 'react'
import HeadingBlock from '../Blocks/Heading';
import ParagraphBlock from '../Blocks/Paragraph';
import CodeBlock from '../Blocks/Code';
import VideoBlock from '../Blocks/Video';
import MCQBlock from '../Blocks/MCQ';
import './index.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Lesson = () => {
    const { courseTitle, moduleTitle, lessonTitle } = useParams();
    const [lessonData,setLessonData] = useState(null);
    const {getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    useEffect(()=>{
        const getLesson = async()=>{
            try {
                const token = await getAccessTokenSilently();
                const options = {
                    method: "POST",
                    headers:{
                        'Content-type': 'application/json',
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        course: courseTitle,
                        module: moduleTitle,
                        lesson: lessonTitle
                    })
                };
                
                const res = await fetch("http://localhost:5000/api/generateLesson",options);
                if(res.ok){
                    const data = await res.json();
                    const rawData = data.choices[0].message.content;
                    const lesson  = JSON.parse(rawData)
                    setLessonData(lesson);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getLesson();
    },[courseTitle,moduleTitle,lessonTitle,getAccessTokenSilently]);

    if(!lessonData) return <p className="lesson-loading">Loading lesson...</p>

    return (
        <div className="lesson-container">
            {/* <pre className="lesson-json">{JSON.stringify(lessonData, null, 2)}</pre> */}
            {lessonData.content.map((block,index)=>{
                switch(block.type){
                    case "heading":
                        return <HeadingBlock key={index} text={block.text} className="heading-block"/>;
                    case "paragraph":
                        return <ParagraphBlock key={index} text={block.text} className="paragraph-block"/>;
                    case "code":
                        return <CodeBlock key={index} language={block.language} code={block.text} className="code-block"/>
                    {/* case "video":
                        return <VideoBlock key={index} url={block.url} className="video-block"/> */}
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
            <button onClick={()=>navigate(-1)}>Go back</button>
        </div>
    )
}

export default Lesson
