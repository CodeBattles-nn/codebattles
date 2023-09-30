import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SeeProblemPage from "./pages/SeeProblemPage/SeeProblemPage";
import UnAuthedHeader from "./components/UnAuthedHeader";
import AuthedHeader from "./components/AuthedHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProblemsPage from "./pages/ProblemsPage";
import StatsPage from "./pages/StatsPage";
import SeeSendPage from "./pages/SeeSendPage";
import SendsPage from "./pages/SendsPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthedHeader/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/stats" element={<StatsPage/>}/>
                <Route path="/problem/:letter" element={<SeeProblemPage/>}/>
                <Route path="/problems" element={<ProblemsPage/>}/>
                <Route path="/sends" element={<SendsPage/>}/>
                <Route path="/send/:id" element={<SeeSendPage/>}/>
                <Route path="*" element={<div>Иди отсюда</div>}/>
            </Routes>
        </BrowserRouter>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
