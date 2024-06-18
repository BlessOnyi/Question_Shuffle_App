import React from 'react';

import { Wrapper, ButtonWrapper } from './QuestionCard.style';
import { AnswerObject } from '../App';
// import {wrapper, ButtonWrapper} from './QuestionCard.styles'

type Props = {
    questions :string;
    answers :string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props>= ({questions, answers,callback,userAnswer,questionNr,totalQuestions }) =>(
    <Wrapper>
        <p className='number'>
            Questions: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: questions}}></p>
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                    key= {answer} 
                    correct = {userAnswer?.correctAnswer === answer}
                    userClicked = {userAnswer?.answer===answer}
                    >
                    <button disabled= {userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} /> 
                    </button>
                </ButtonWrapper>
            ))}
        </div>

    </Wrapper>
);

export default QuestionCard;