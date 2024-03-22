import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GrantFormProps } from "./GrantFormProps";
import { GrantQuestion } from "../../interfaces/Grant";
import { SERVER_PORT } from "../../constants/ServerConstants";
import { ApplicationStatus } from '../../interfaces/Application';

const GrantForm = ({ user, grant }: GrantFormProps) => {
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState<GrantQuestion[]>(grant.questions);

    const setAnswer = (index: number, answer: string) => {
        const newQuestionList = [...questionList];
        newQuestionList[index].answer = answer;
        
        setQuestionList(newQuestionList);
    }

    const getAnswers = () => {
        return questionList.map(function (question){
            return question.answer;
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const name = (document.activeElement as HTMLButtonElement).getAttribute("name");
        console.log(name)

        if (name === "submit")
        {
            try {
                await fetch(`http://localhost:${SERVER_PORT}/application`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        
                        body: JSON.stringify({
                            userID: user.accountID,
                            grantID: grant.id,
                            grantTitle: grant.title,
                            grantCategory: grant.category,
                            submitted: true,
                            submissionDate: new Date(),
                            status: ApplicationStatus.submitted,
                            awarded: 0,
                            responses: getAnswers(),
                        })
                    })
                .then(async (response) => {
                    if (!response.ok) {
                        console.log("Server failed:", response.status)
                    }
                    navigate("/grants");
                })
            } catch (error) {
                console.log("Fetch function failed:", error)
            } 
        }
        else if (name === "back")
        {
            navigate("/grants");
        }
        else if (name === "save")
        {

        }

        if (!questionList) {
            return 
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit} id="grantform" className='m-5 ml-10 mr-10'>
                {questionList.map((questionElement, index) => (
                    <li key={index} className='list-none'>
                         <div className="flex flex-col gap-1 p-5 px-3">
                            <label className='text-base'>{questionElement.question}</label>
                            <textarea
                                className='outline outline-2 p-1 pb-10 mt-3 ml-5 mr-5'
                                value={questionList[index].answer || ''}
                                placeholder="Type your answer here."
                                key={index}
                                onChange={(e) => setAnswer(index, e.target.value)}
                            />
                        </div>
                    </li>
                ))}
                <div className="flex flex-row items-center justify-end">
                    <button 
                        className='p-2 px-5 m-7 mr-1 bg-red-500 hover:bg-red-600 active:bg-red-700
                        text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
                        text-lg' 
                        type='button' 
                        name="back">
                        Back
                    </button>
                    
                    <button 
                        className='p-2 px-5 m-7 mr-1 bg-green-500 hover:bg-green-600 active:bg-green-700
                        text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
                        text-lg' 
                        type='button' 
                        name="save">
                        Save
                    </button>
                    
                    <button 
                        className='p-2 px-5 m-7 mr-14 bg-green-500 hover:bg-green-600 active:bg-green-700
                        text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
                        text-lg' 
                        type="submit" 
                        name="submit">
                        Submit Form
                    </button>
                    
                </div>
            </form>
        </div>
    );

};

export default GrantForm;