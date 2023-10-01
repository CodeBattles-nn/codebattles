import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AuthedHeader from "./components/AuthedHeader";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import SeeProblemPage from "./pages/SeeProblemPage/SeeProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SendsPage from "./pages/SendsPage";
import SeeSendPage from "./pages/SeeSendPage";


function App() {
    return (
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
    )
}

export default App;
