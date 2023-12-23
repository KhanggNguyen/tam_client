import React from "react";

export const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
            <div className="loading-message">
                Le premier chargement peut prendre du temps, veuillez patienter,
                s'il vous plaît...
            </div>
        </div>
    );
};
