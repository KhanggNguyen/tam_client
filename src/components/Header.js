import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { PiTram } from "react-icons/pi";

export const Header = ({ darkMode, setDarkMode }) => {
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <PiTram />
                </div>
                <div className="settings">
                    <button
                        data-testid="dark-mode-action"
                        aria-label="Darkmode on/off"
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </nav>
        </header>
    );
};
