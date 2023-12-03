import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { BrowserRouter } from "react-router-dom";

function App({ darkModeDefault = false }) {
    const [darkMode, setDarkMode] = useState(darkModeDefault);
    return (
        <BrowserRouter>
            <main className={darkMode ? "darkmode" : undefined}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <Content />
            </main>
        </BrowserRouter>
    );
}

export default App;
