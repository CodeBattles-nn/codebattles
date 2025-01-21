import Card from "../components/bootstrap/Card.jsx";
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <Card>
            <h1>Упс....</h1>
            <h3 className="my-5">Такой страницы <x className="text-danger">не найдено(</x></h3>
            <Link to="/" className="btn btn-outline-primary">На главную</Link>
        </Card>
    );
};

