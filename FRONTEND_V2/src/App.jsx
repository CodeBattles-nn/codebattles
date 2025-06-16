import SeeQuizzProblemPage from "./pages/user/SeeQuizzProblemPage.jsx";
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
import {AdminChampsPage} from "./pages/champs/AdminChampsPage.jsx";
import {AdminChampsDetailPage} from "./pages/champs/AdminChampsDetailPage.jsx";
import {AdminProblemsPage} from "./pages/admin/problems/AdminProblemsPage.jsx";
import {AdminCheckersPage} from "./pages/admin/checkers/AdminCheckersPage.jsx";
import {AdminChampsDetailRatingPage} from "./pages/champs/AdminChampsDetailRatingPage.jsx";
import {AdminSeeSendPage} from "./pages/admin/AdminSeeSendPage.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import {AdminUsersDetailPage} from "./pages/admin/AdminUsersDetailPage.jsx";
import {AdminChampsCreate} from "./pages/champs/AdminChampsCreate.jsx";
import {AdminChampsDetailProblemsPage} from "./pages/champs/competitionProblems/AdminChampsDetailProblemsPage.jsx";
import {AdminChampsDetailProblemsLinkPage} from "./pages/champs/competitionProblems/AdminChampsDetailProblemsLinkPage.jsx";
import {AdminChampsDetailProblemsEditPage} from "./pages/champs/competitionProblems/AdminChampsDetailProblemsEditPage.jsx";
import {AdminUsersDetailCheckersPage} from "./pages/admin/AdminUsersDetailCheckersPage.jsx";
import {AdminCheckersEditPage} from "./pages/admin/checkers/AdminCheckersEditPage.jsx";
import {AdminProblemsPageCreate} from "./pages/admin/problems/AdminProblemsPageCreate.jsx";
import {AdminProblemsPageEdit} from "./pages/admin/problems/AdminProblemsPageEdit.jsx";
import {AdminCheckersCreatePage} from "./pages/admin/checkers/AdminCheckersCreatePage.jsx";
import {Profile} from "./pages/user/Profile.jsx";
import {AdminUserCreatePage} from "./pages/admin/users/AdminUserCreatePage.jsx";
import {AdminUsersPage} from "./pages/admin/users/AdminUsersPage.jsx";
import {ChangePassword} from "./pages/user/ChangePassword.jsx";

import("../node_modules/bootstrap/dist/js/bootstrap.min.js")


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
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/change-password" element={<ChangePassword/>}/>

                        <Route path="/admin/problems" element={<AdminProblemsPage/>}/>
                        <Route path="/admin/problems/create" element={<AdminProblemsPageCreate/>}/>
                        <Route path="/admin/problems/:probId/edit" element={<AdminProblemsPageEdit/>}/>
                        <Route path="/admin/champs" element={<AdminChampsPage/>}/>
                        <Route path="/admin/checkers" element={<AdminCheckersPage/>}/>
                        <Route path="/admin/checkers/:checkId/edit" element={<AdminCheckersEditPage/>}/>
                        <Route path="/admin/checkers/create" element={<AdminCheckersCreatePage/>}/>
                        <Route path="/admin/champs/:compId/edit" element={<AdminChampsDetailPage/>}/>
                        <Route path="/admin/champs/create" element={<AdminChampsCreate/>}/>
                        <Route path="/admin/champs/:compId/edit/users" element={<AdminUsersDetailPage/>}/>
                        <Route path="/admin/champs/:compId/edit/problems" element={<AdminChampsDetailProblemsPage/>}/>
                        <Route
                            path="/admin/champs/:compId/edit/problems/:probcompId/edit"
                            element={<AdminChampsDetailProblemsEditPage/>}
                        />
                        <Route
                            path="/admin/champs/:compId/edit/problems/link"
                            element={<AdminChampsDetailProblemsLinkPage/>}
                        />
                        <Route path="/admin/champs/:compId/edit/checkers" element={<AdminUsersDetailCheckersPage/>}/>
                        <Route path="/admin/champs/:compId/edit/rating" element={<AdminChampsDetailRatingPage/>}/>
                        <Route path="/admin/champs/:compId/edit/rating/answer" element={<AdminSeeSendPage/>}/>

                        <Route path="/admin/users/create" element={<AdminUserCreatePage/>}/>
                        <Route path="/admin/users" element={<AdminUsersPage/>}/>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>


                    {/*<StatusesPage/>*/}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
