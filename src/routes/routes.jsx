import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

// Define sections with their respective components
export const sections = [
    { id: "home", path: "/", label: "START GAME", component: Hero },
    { id: "about", path: "/about", label: "CHARACTER", component: About },
    { id: "skills", path: "/skills", label: "INVENTORY", component: Skills },
    { id: "projects", path: "/projects", label: "QUESTS", component: Projects },
    { id: "contact", path: "/contact", label: "OPTIONS", component: Contact },
];

// Create the router
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: sections.map(section => ({
            path: section.path === "/" ? "" : section.path,
            element: <section.component />,
        })),
    },
]);

export default router;
