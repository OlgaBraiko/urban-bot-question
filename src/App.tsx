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

export const BotQuestion = () => {
    return (
        <Dialog onFinish={(answers) => console.log(answers)}>
            <DialogStep content={<Text>Привет! </Text>} id="go" onNext={(hello) => console.log(hello)}>
                <DialogStep
                    content={
                        <ButtonGroup title="Какая страна считается родиной волейбола?">
                            <Button> Америка</Button>
                            <Button>Бразилия</Button>
                            <Button>Франция</Button>
                        </ButtonGroup>
                    }
                    id="country"
                >
                    <DialogStep
                        content={
                            <ButtonGroup title="Какой максимальный номер разрешено иметь игроку в волейболе?">
                                <Button>24</Button>
                                <Button>36</Button>
                                <Button>98</Button>
                            </ButtonGroup>
                        }
                        id="num"
                    >
                        <DialogStep
                            content={
                                <ButtonGroup title=" Ещё один вопрос про волейбол">
                                    <Button>вариант 1</Button>
                                    <Button>вариант 2</Button>
                                    <Button>вариант 3</Button>
                                </ButtonGroup>
                            }
                            id="qu"
                        >
                            <DialogStep
                                content={
                                    <ButtonGroup title=" И ещё один  ">
                                        <Button>вариант 1</Button>
                                        <Button>вариант 2</Button>
                                        <Button>вариант 3</Button>
                                    </ButtonGroup>
                                }
                                id="4"
                            ></DialogStep>
                        </DialogStep>
                    </DialogStep>
                </DialogStep>
            </DialogStep>
        </Dialog>
    );
};

export function App() {
    return (
        <>
            <BotQuestion />

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
