import React from "react";  // Import react into the bundle
import ReactDOM from "react-dom";
import "../styles/index.css";  // Include your index.scss file into the bundle
import Layout from "./Layout.jsx";  // Import your own components
import { DarkModeProvider } from "./store/DarkModeContext.js";

// Render your react application
ReactDOM.render(<DarkModeProvider>
    <Layout />
    </DarkModeProvider>,
    document.querySelector("#app")
);