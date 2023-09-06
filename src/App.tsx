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
                        />
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
