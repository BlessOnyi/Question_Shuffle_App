import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { QuestionState, Difficulty } from './API';
import { MyGlobalStyle, Wrapper } from './App.style';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0);
  const [endQuestion, setEndQuestion] = useState(true)

  console.log(questions);



  const startTrivia = async () => {
    setLoading(true);
    setEndQuestion(false);
  
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
  
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!endQuestion){
      // setting user answer
      const answer = e.currentTarget.value;
      // checking answer 
      const correct = questions[number].correct_answer === answer;
      if(correct)setScore(prev => prev + 1);

      // save answer in array

      const answerObject ={
        question: questions[number].question,
        answer,
        correct,
        correctAnswer : questions[number].correct_answer 
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // move onto the next question, if not the last

    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setEndQuestion(true);
    }else{
      setNumber(nextQuestion)
    }
  }
  return (
    <>
    <MyGlobalStyle/>
    <Wrapper>
        <h1>WHO WANTS TO BE A BILLIONARE </h1>
        {endQuestion || userAnswers.length === TOTAL_QUESTIONS ? (

          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!endQuestion ? <p className='score'>Score: {score}</p> : null}
        {loading && <p>loading Questions...</p>}
        {!loading && !endQuestion && (

        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          questions={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
    )}
      {!endQuestion && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ): null}
    </Wrapper>
  </>
);
};


export default App;
