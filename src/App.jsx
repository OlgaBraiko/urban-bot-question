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

export const BotQuestion = ({ correctCount, setCorrectCount }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];

    // Добавьте обработчик для перехода к следующему вопросу
    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Вы можете обработать завершение вопросов здесь
            console.log('Вы ответили на все вопросы!');
        }
    };

    // Обработчик выбора ответа
    // const handleAnswer = (selectedAnswer) => {
    //     // TODO: Обработка выбранного ответа, например, сохранение результатов
    //     console.log('Выбран ответ:', selectedAnswer);

    //     // Переход к следующему вопросу
    //     nextQuestion();
    // };

    const handleAnswer = (selectedAnswer) => {
        if (correctCount) {
            setCorrectCount + 1;
        }
        console.log('Выбран ответ:', selectedAnswer);
        nextQuestion();
    };

    // Рекурсивная функция для генерации компонентов на основе массива questions
    const renderDialogStep = (questionIndex) => {
        const question = questions[questionIndex];
        if (!question) {
            // Если вопросы закончились, отобразить сообщение о завершении
            return (
                <DialogStep
                    content={
                        <>
                            <Text>Вопросы закончились.</Text>

                            <Text>
                                Вы ответили на {correctCount} из {questions.length}
                            </Text>
                        </>
                    }
                />
            );
        }

        return (
            <DialogStep
                content={
                    <ButtonGroup title={question.question}>
                        {question.answers.map((answer, index) => (
                            <Button key={index} onClick={() => handleAnswer(answer.correct)}>
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

    return (
        <>
            <BotQuestion correctCount={correctCount} setCorrectCount={setCorrectCount} />

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
