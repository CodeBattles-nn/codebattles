import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import {ViewSendComponent} from "../../components/ViewSendComponent.jsx";

const SeeSendPage = () => {

    const {id, compId} = useParams();
    const [data, update] = useCachedGetAPI(`/api/answers/${id}`);

    useEffect(() => {
        update()
    }, []);


    return (<>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования" url="/champs"/>
                <BreadcrumbsElement name="Посылки" url={`/champs/${compId}/sends`}/>
                <BreadcrumbsElement name={data.id} active={true}/>
            </BreadcrumbsRoot>

            <ViewSendComponent data={data}/>
        </>
    );
};

export default SeeSendPage;
