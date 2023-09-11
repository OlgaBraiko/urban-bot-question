import { useState } from 'react';
import { Route, Router, Text, ButtonGroup, Button, useText, Image, Dialog, DialogStep } from '@urban-bot/core';
import fs from 'fs';
import logo from './assets/logo.png';

const file = fs.readFileSync(logo);

function Echo() {
    const [text, setText] = useState(' Готов пройти опрос?');

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
}

function Logo() {
    const [title, setTitle] = useState('Urban Bot');

    const addRobot = () => {
        setTitle(title + '🤖');
    };

    return (
        <Image
            title={title}
            file={file}
            buttons={
                <ButtonGroup>
                    <Button onClick={addRobot}>Add robot</Button>
                </ButtonGroup>
            }
        />
    );
}

const questions = [
    {
        question: 'Какая страна считается родиной волейбола?',
        answers: [
            { answer: 'Америка', correct: true },
            { answer: 'Бразилия', correct: false },
            { answer: 'Франция', correct: false },
        ],
    },

    {
        question: 'Какой максимальный номер разрешено иметь игроку в волейболе?',
        answers: [
            { answer: 24, correct: true },
            { answer: 36, correct: false },
            { answer: 98, correct: false },
        ],
    },
    {
        question: 'В каком году волейбол появился в России?',
        answers: [
            { answer: 1875, correct: false },
            { answer: 1920, correct: true },
            { answer: 1980, correct: false },
        ],
    },

    {
        question: 'Число игроков в команде?',
        answers: [
            { answer: 6, correct: true },
            { answer: 8, correct: false },
            { answer: 9, correct: false },
        ],
    },

    {
        question: 'Назовите вес волейбольного мяча?',
        answers: [
            { answer: 300, correct: false },
            { answer: 285, correct: true },
            { answer: 265, correct: false },
        ],
    },
];

export const BotQuestion = ({ correctCount, handleAnswerCount }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log('Вы ответили на все вопросы!');
        }
    };

    const handleAnswer = (selectedAnswer) => {
        console.log('Выбран ответ:', selectedAnswer);

        nextQuestion();
    };

    const renderDialogStep = (questionIndex) => {
        const question = questions[questionIndex];
        if (!question) {
            return <DialogStep content={<Text>Вопросы закончились.</Text>} />;
        }

        return (
            <DialogStep
                content={
                    <ButtonGroup title={question.question}>
                        {question.answers.map((answer, index) => (
                            <Button key={index} onClick={() => handleAnswer(answer)}>
                                {answer.answer}
                            </Button>
                        ))}
                    </ButtonGroup>
                }
            >
                {renderDialogStep(questionIndex + 1)} {/* Рекурсивный вызов для следующего вопроса */}
            </DialogStep>
        );
    };

    return (
        <Dialog onFinish={(answers) => console.log(answers)}>
            <DialogStep content={<Text>Привет! </Text>} id="go">
                {renderDialogStep(currentQuestionIndex)}
            </DialogStep>
        </Dialog>
    );
};

export function App() {
    const [correctCount, setCorrectCount] = useState(0);

    const handleAnswerCount = () => {
        if (correctCount) {
            setCorrectCount + 1;
        }
        return (
            <Dialog>
                <DialogStep
                    content={
                        <ButtonGroup>
                            <Text>
                                Вы отгадали {correctCount} ответа из {questions.length}
                            </Text>
                            <Button>Попробовать снова</Button>
                        </ButtonGroup>
                    }
                ></DialogStep>
            </Dialog>
        );
    };

    return (
        <>
            <BotQuestion correctCount={correctCount} handleAnswerCount={handleAnswerCount} />

            <Router>
                <Route path="/echo">
                    <Echo />
                </Route>
                <Route path="/logo">
                    <Logo />
                </Route>
            </Router>
        </>
    );
}
