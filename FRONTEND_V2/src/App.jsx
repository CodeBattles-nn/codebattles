import Card from "./components/bootstrap/Card.jsx";
import Header from "./components/Header.jsx";
import ProblemsListPage from "./pages/ProblemsListPage.jsx";

function App() {

    return (
        <>
            <Header />
            <div className="container">
                <div className="row my-4"></div>
                <div className="row">
                  <ProblemsListPage />
                </div>
            </div>
            </>
            )
            }

export default App
