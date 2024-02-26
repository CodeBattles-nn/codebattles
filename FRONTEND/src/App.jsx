import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StatsPage from "./pages/user/StatsPage/StatsPage";
import SeeProblemPage from "./pages/user/SeeProblemPage/SeeProblemPage";
import {default as TeacherSeeProblemPage}  from "./pages/teacher/SeeProblemPage/SeeProblemPage";
import ProblemsPage from "./pages/user/ProblemsPage";
import SendsPage from "./pages/user/SendsPage";
import SeeSendPage from "./pages/user/SeeSendPage";
import ProgramStatusInfo from "./pages/user/ProgramStatusInfo";

import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/user/LoginPage";
import {default as AdminLoginPage} from "./pages/admin/LoginPage";
import {default as TeacherLoginPage} from "./pages/teacher/LoginPage";
import {default as TeacherStatsPage} from "./pages/teacher/StatsPage/StatsPage";
import {default as TeacherSendsPage} from "./pages/teacher/SendsPage";
import {default as TeacherSeeSandPage} from "./pages/teacher/SeeSendPage";
import {default as TeacherProblemsPage} from "./pages/teacher/ProblemsPage";
import AxiosConfigurer from "./components/configs/AxiosConfigurer";
import Base from "./components/Base";
import ToastConfig from "./components/configs/ToastConfig";
import ChampsPage from "./pages/teacher/ChampsPage";
import ChampSettings from "./pages/teacher/ChampSettings";
import ChampAccessSettings from "./pages/teacher/ChampAccessSettings";

import "./theme.dark.css"
import "./icons.css"
import {AppContextProvider} from "./components/AppContextProvider";
import HeaderSelector from "./components/HeaderSelector";
import UsersPage from "./pages/teacher/UsersPage";
import AddUsersPage from "./pages/teacher/AddUsersPage";
import AddProblemsPage from "./pages/teacher/AddProblemsPage";
import ProblemSeePageSwitch from "./pages/user/ProblemsSeePageSwitch";
import SeeProblemQuestionPage from "./pages/user/SeeProblemQuestionPage";
import CreateChampPage from "./pages/teacher/CreateChampPage";

function App() {
    return (
        <AppContextProvider authed={true}>
            <BrowserRouter>
                <HeaderSelector />
                <Base>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/stats" element={<StatsPage/>}/>
                        <Route path="/problem/:letter" element={<SeeProblemPage/>}/>
                        <Route path="/problem/:letter/TEST" element={<SeeProblemQuestionPage/>}/>
                        <Route path="/problems" element={<ProblemsPage/>}/>
                        <Route path="/sends" element={<SendsPage/>}/>
                        <Route path="/send/:id" element={<SeeSendPage/>}/>
                        <Route path="/statuses" element={<ProgramStatusInfo/>}/>
                        <Route path="/admin" element={<AdminLoginPage/>}></Route>
                        <Route path="/teacher" element={<TeacherLoginPage/>}></Route>
                        <Route path="/teacher/champs" element={<ChampsPage/>}></Route>
                        <Route path="/teacher/champs/new" element={<CreateChampPage/>}></Route>
                        <Route path="/teacher/champs/:id" element={<ChampSettings/>}></Route>
                        <Route path="/teacher/champs/:id/access" element={<ChampAccessSettings/>}></Route>
                        <Route path="/teacher/champs/:id/stats" element={<TeacherStatsPage/>}></Route>
                        <Route path="/teacher/champs/:id/users" element={<UsersPage/>}></Route>
                        <Route path="/teacher/champs/:id/users/add" element={<AddUsersPage/>}></Route>
                        <Route path="/teacher/champs/:id/users/:user_id" element={<TeacherStatsPage/>}></Route>
                        <Route path="/teacher/champs/:id/users/:user_id/sends" element={<TeacherSendsPage/>}></Route>
                        <Route path="/teacher/champs/:id/users/:user_id/sends/:letter" element={<TeacherSeeSandPage/>}></Route>
                        <Route path="/teacher/problems" element={<TeacherProblemsPage/>}></Route>
                        <Route path="/teacher/problems/:id" element={<TeacherSeeProblemPage/>}></Route>
                        <Route path="/teacher/problems/add" element={<AddProblemsPage/>}></Route>
                        <Route path="/secret" element={<h1>Привет 2</h1>}></Route>
                        <Route path="*" element={<ProblemsPage/>}/>
                    </Routes>
                </Base>
                <AxiosConfigurer/>
                <ToastConfig/>
                {/*<ThemeConfigurer/>*/}
            </BrowserRouter>
        </AppContextProvider>
    )
}

export default App;
