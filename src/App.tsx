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

export function App() {
    return (
        <>
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
