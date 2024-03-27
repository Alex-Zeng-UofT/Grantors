import React, { useEffect, useState } from 'react';
import { GrantFormProps } from "./GrantFormProps";
import { GrantQuestion, GrantQuestionType } from "../../interfaces/Grant";
import { Application, ApplicationStatus } from '../../interfaces/Application';
import ApplicationsController from '../../controllers/ApplicationsController';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import DropDown from '../displays/DropDown/DropDown';

// TODO: This file and component should be renamed to ApplicationForm since this
// is the form applicants fill out to submit and application, plus we already
// have GrantForm for when the admin is creating the grant
const GrantForm = ({ user, grant }: GrantFormProps) => {
    const [questionList, setQuestionList] = useState<GrantQuestion[]>(grant.questions);
    const navigate = useNavigate();
    const location = useLocation();

    const applicationIDParam = new URLSearchParams(location.search).get('applicationID');

    const setAnswer = (index: number, answer: string) => {
        const newQuestionList = [...questionList];
        newQuestionList[index].answer = answer;
        
        setQuestionList(newQuestionList);
    };

    useEffect(() => {
        if (applicationIDParam) {
            ApplicationsController.fetchApplication(applicationIDParam).then((application: Application | undefined) => {
                if (application) {
                    const newQuestionList = questionList.map((question: GrantQuestion) => {
                        if (application.responses) {
                            const response = application.responses.find((response) => response.question === question.question);
                            if (response) {
                                question.answer = response.answer;
                            }
                        }
                        return question;
                    });
                    setQuestionList(newQuestionList);
                }
            });
        }

    }, [applicationIDParam]);

    const handleSave = async () => {
        if (!questionList) {
            return 
        }

        ApplicationsController.submitApplication(user, {
            id: '', // id does not exist yet as we have not submitted
            applicantID: user.accountID,
            grantID: grant.id,
            grantTitle: grant.title,
            grantCategory: grant.category,
            submitted: true,
            submissionDate: new Date(),
            status: ApplicationStatus.inProgress,
            awarded: 0,
            responses: questionList,
        }).then(() => {
            navigate('/');
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!questionList) {
            return 
        }

        ApplicationsController.submitApplication(user, {
            id: '', // id does not exist yet as we have not submitted
            applicantID: user.accountID,
            grantID: grant.id,
            grantTitle: grant.title,
            grantCategory: grant.category,
            submitted: true,
            submissionDate: new Date(),
            status: ApplicationStatus.submitted,
            awarded: 0,
            responses: questionList,
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <div className='pt-28 pb-20 flex justify-center'>
            <form onSubmit={handleSubmit} id="grantform" className=' border-4 bg-white lg:w-[70vw] w-[90vw]
            rounded-2xl border-primary shadow-2xl shadow-black p-6'>

                <div className='text-center font-bold text-2xl'>
                    Application Form
                </div>

                {questionList.map((questionElement, index) => (
                    <li key={index} className='list-none'>
                         <div className="flex flex-col gap-1 p-5 px-3">
                            <label className='text-base'>{questionElement.question}</label>
                            {
                                questionElement.type == GrantQuestionType.MULTIPLE_CHOICE ? (
                                    <DropDown options={questionElement.options} 
                                              identity="Select Option" 
                                              selectCallback={(value: string) => setAnswer(index, value)}/>
                                ) :
                                questionElement.type == GrantQuestionType.CHECKBOX ? (
                                    <div className="flex flex-row gap-2">
                                        {questionElement.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex flex-row items-center gap-2">
                                                <input type="checkbox" 
                                                    value={option} 
                                                    checked={questionList[index].answer?.split(',').includes(option) || false}
                                                    onChange={(e) => {
                                                        const newAnswer = e.target.checked ? 
                                                            (questionList[index].answer ? questionList[index].answer + ',' + option : option) :
                                                            questionList[index].answer?.split(',').filter((item) => item !== option).join(',');
                                                        setAnswer(index, newAnswer);
                                                    }}/>
                                                <label>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                ) :
                                <textarea
                                className='outline outline-2 p-3 pb-10 mt-3 ml-5 mr-5 rounded-md'
                                value={questionList[index].answer || ''}
                                placeholder="Type your answer here."
                                key={index}
                                onChange={(e) => setAnswer(index, e.target.value)}
                                />
                            }
                        </div>
                    </li>
                ))}
                <div className="flex flex-row items-center justify-between">
                    
                    <Link to='/applications'>
                        <button 
                            className='p-2 px-5 m-7 mr-1 bg-red-500 hover:bg-red-600 active:bg-red-700
                            text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
                            text-lg' 
                            type='button' 
                            name="back">
                            Back
                        </button>
                    </Link>
                    
                    
                    <div>
                        <button 
                            className='p-2 px-5 m-7 mr-1 bg-secondary hover:bg-[#0bb4d6]
                            text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
                            text-lg' 
                            type='button' 
                            name="save"
                            onClick={handleSave}>
                            Save
                        </button>
                        
                        <button 
                            className='p-2 px-5 m-7 mr-14 bg-primary hover:bg-[#0bb4d6]
                            text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
                            text-lg' 
                            type="submit" 
                            name="submit">
                            Submit Form
                        </button>
                    </div>
                    
                    
                </div>
            </form>
        </div>
    );

};

export default GrantForm;