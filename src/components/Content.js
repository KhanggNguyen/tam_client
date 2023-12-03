import React from "react";
import { Sidebar } from "./Sidebar";
import { Body } from "./Body";

export const Content = () => (
    <section className="content">
        <Sidebar />
        <Body />
    </section>
);
