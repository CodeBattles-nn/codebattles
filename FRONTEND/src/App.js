import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AuthedHeader from "./components/AuthedHeader";
import StatsPage from "./pages/user/StatsPage/StatsPage";
import SeeProblemPage from "./pages/user/SeeProblemPage/SeeProblemPage";
import ProblemsPage from "./pages/user/ProblemsPage";
import SendsPage from "./pages/user/SendsPage";
import SeeSendPage from "./pages/user/SeeSendPage";
import ProgramStatusInfo from "./pages/user/ProgramStatusInfo";

import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/user/LoginPage";
import AxiosConfigurer from "./components/configs/AxiosConfigurer";
import Base from "./components/Base";
import ToastConfig from "./components/configs/ToastConfig";

function App() {
    return (
        <BrowserRouter>
            <AuthedHeader/>
            <Base>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/stats" element={<StatsPage/>}/>
                    <Route path="/problem/:letter" element={<SeeProblemPage/>}/>
                    <Route path="/problems" element={<ProblemsPage/>}/>
                    <Route path="/sends" element={<SendsPage/>}/>
                    <Route path="/send/:id" element={<SeeSendPage/>}/>
                    <Route path="/statuses" element={<ProgramStatusInfo/>}/>
                    <Route path="*" element={<ProblemsPage/>}/>
                </Routes>
            </Base>
            <AxiosConfigurer/>
            <ToastConfig/>
        </BrowserRouter>
    )
}

export default App;
