import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLines } from "../hooks";

// const lines = [
// {
//     name: "1",
//     icon: <Fa1 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#0055a0",
// },
// {
//     name: "2",
//     icon: <Fa2 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#ee7f01",
// },
// {
//     name: "3",
//     icon: <Fa3 style={{ color: "#000000" }} />,
//     backgroundColor: "#cdd300",
// },
// {
//     name: "4",
//     icon: <Fa4 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#582d22",
// },
// {
//     name: "5",
//     icon: <Fa5 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#FF69B4",
// },
// {
//     name: "6",
//     icon: <Fa6 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#0055a0",
// },
// {
//     name: "7",
//     icon: <Fa7 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#0055a0",
// },
// {
//     name: "8",
//     icon: <Fa8 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#0055a0",
// },
// {
//     name: "9",
//     icon: <Fa9 style={{ color: "#FFFFFF" }} />,
//     backgroundColor: "#0055a0",
// },
// ];

export const Sidebar = () => {
    const [active, setActive] = useState("1");
    const { lines } = useLines();
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="sidebar__logo">Mon Tam</div>
            <div className="sidebar__menu">
                {lines.map((line, index) => (
                    <Link to={`?route_short_name=${line.name}`} onClick={() => setActive(line.name)} key={index}>
                        <div
                            style={{backgroundColor: active === line.name ? line.backgroundColor : ""}}
                            className={`sidebar__menu__item ${
                                active === line.name ? "active" : ""
                            }`}
                        >
                            <div className="sidebar__menu__item__text">
                                {line.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                {lines.map((line, index) => (
                    <li
                        key={index}
                        data-testid="line-name"
                        className={active === line.name ? "active" : undefined}
                        style={{ backgroundColor: line.backgroundColor }}
                        onClick={() =>
                            navigate(`?route_short_name=${line.name}`)
                        }
                    >
                        <div
                            aria-label={`Show line ${line.name}`}
                            tabIndex={0}
                            role="button"
                            onClick={() => {
                                setActive(line.name);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setActive(line.name);
                                }
                            }}
                        >
                            <span>{line.icon}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
