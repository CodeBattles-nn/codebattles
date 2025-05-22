import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {CompetitionCard} from "../../components/CompetitionCard.jsx";

const ChampsPage = () => {

    const [data, update] = useCachedGetAPI("/api/competitions/me",() => {}, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired />

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования"/>
            </BreadcrumbsRoot>

            {
                data?.map(elem => {
                    return <CompetitionCard
                        key={elem.id}
                        name={elem.name}
                        description={elem.description}>
                        <Link to={`/champs/${elem.id}/problems`} className="btn btn-success">Войти</Link>
                    </CompetitionCard>
                })
            }
        </>
    );
};

export default ChampsPage;
