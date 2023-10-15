import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AuthedHeader from "./components/AuthedHeader";
import LoginPage from "./pages/LoginPage";
import StatsPage from "./pages/StatsPage";
import SeeProblemPage from "./pages/SeeProblemPage/SeeProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SendsPage from "./pages/SendsPage";
import SeeSendPage from "./pages/SeeSendPage";
import ProgramStatusInfo from "./pages/ProgramStatusInfo";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

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
                <Route path="/statuses" element={<ProgramStatusInfo />} />
                <Route path="*" element={<ProblemsPage />} />
            </Routes>
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    )
}

export default App;
