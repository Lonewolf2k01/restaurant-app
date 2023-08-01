import React from "react";
import ReactDOM from "react-dom/client"
import './index.css'

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import { StateProvider } from "./context/StateProvider";
import { initializeApp } from "firebase/app";
import reducer from "./context/reducer";

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <Router>
            <StateProvider initialState={initializeApp} reducer={reducer}>
                <App />
            </StateProvider>
        </Router>
    )
