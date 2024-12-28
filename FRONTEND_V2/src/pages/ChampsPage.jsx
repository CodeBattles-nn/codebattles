import Card from "../components/bootstrap/Card.jsx";
import ResponsiveTable from "../components/bootstrap/ResponsiveTable.jsx";
import useCachedGetAPI from "../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const ChampsPage = () => {

    const [data, update] = useCachedGetAPI("/api/competitions",() => {}, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            {
                data?.map(elem => {
                    return <Card key={elem.id}>
                        <h5><span className="badge text-bg-primary">Идет</span></h5>
                        <h2>{elem.name}</h2>
                        <h3>{elem.description}</h3>
                        <Link to={`/champs/${elem.id}/problems`} className="btn btn-success">Войти</Link>
                    </Card>
                })
            }
        </>
    );
};

export default ChampsPage;
