import {Link} from "react-router-dom";
import Card from "./bootstrap/Card.jsx";

export const AdminHeader = () => {
    return (
        <Card>
            <Link to="/admin/champs" className="btn">соревнования</Link>
            <Link to="/admin/problems" className="btn">задачи</Link>
            <Link to="/admin/checkers" className="btn">чекеры</Link>
            <Link to="/champs" className="btn">интерфейс ученика</Link>
        </Card>
    );
};

