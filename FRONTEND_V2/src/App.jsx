import Card from "./components/bootstrap/Card.jsx";
import Header from "./components/Header.jsx";
import ProblemsListPage from "./pages/ProblemsListPage.jsx";
import SendsListPage from "./pages/SendsListPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import SeeProblemPage from "./pages/SeeProblemPage.jsx";

import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import SeeSendPage from "./pages/SeeSendPage.jsx";
import StatusesPage from "./pages/StatusesPage.jsx";

function App() {

    return (
        <>
            <Header />
            <div className="container">
                <div className="row my-4"></div>
                <div className="row">
                  <StatusesPage/>
                </div>
            </div>
            </>
            )
            }

export default App
