import SeeQuizzProblemPage from "./pages/user/SeeQuizzProblemPage.jsx";

import("../node_modules/bootstrap/dist/js/bootstrap.min.js")


import Header from "./components/Header.jsx";
import ProblemsListPage from "./pages/user/ProblemsListPage.jsx";
import SendsListPage from "./pages/user/SendsListPage.jsx";
import StatsPage from "./pages/user/StatsPage.jsx";
import SeeProblemPage from "./pages/user/SeeProblemPage.jsx";

import SeeSendPage from "./pages/user/SeeSendPage.jsx";
import StatusesPage from "./pages/user/StatusesPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/user/LoginPage.jsx";
import ChampsPage from "./pages/user/ChampsPage.jsx";
import {AdminChampsPage} from "./pages/admin/AdminChampsPage.jsx";
import {AdminChampsDetailPage} from "./pages/admin/AdminChampsDetailPage.jsx";
import {AdminChampsDetailCheckerPage} from "./pages/admin/AdminChampsDetailCheckersPage.jsx";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <div className="container">
                <div className="row my-4"></div>
                <div className="row">
                    <Routes>
                        <Route path="/problems" element={<ProblemsListPage/>}/>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/champs/:compId/problems" element={<ProblemsListPage/>}/>
                        <Route path="/champs/:compId/problems/:id" element={<SeeProblemPage/>}/>
                        <Route path="/problems/:letter/quizz" element={<SeeQuizzProblemPage/>}/>
                        <Route path="/champs/:compId/stats" element={<StatsPage/>}/>
                        <Route path="/champs/:compId/sends" element={<SendsListPage/>}/>
                        <Route path="/champs/:compId/sends/:id" element={<SeeSendPage/>}/>
                        <Route path="/statuses" element={<StatusesPage/>}/>
                        <Route path="/champs" element={<ChampsPage/>}/>

                        <Route path="/admin/champs" element={<AdminChampsPage/>}/>
                        <Route path="/admin/champs/:compId/edit" element={<AdminChampsDetailPage/>}/>
                        <Route path="/admin/champs/:compId/edit/checkers" element={<AdminChampsDetailCheckerPage/>}/>
                    </Routes>


                    {/*<StatusesPage/>*/}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
