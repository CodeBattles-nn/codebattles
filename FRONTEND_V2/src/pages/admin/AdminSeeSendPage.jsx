import {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {ViewSendComponent} from "../../components/ViewSendComponent.jsx";

export const AdminSeeSendPage = () => {

    const [searchParams] = useSearchParams();

    const [data, update] = useCachedGetAPI(`/api/answers/last?compProblemId=${searchParams.get("compprobId")}&userId=${searchParams.get("userId")}`);

    useEffect(() => {
        update()
    }, []);


    return (<>
            <UserLoginRequired/>

            {/*<BreadcrumbsRoot>*/}
            {/*    <BreadcrumbsElement name="Соревнования" url="/champs"/>*/}
            {/*    <BreadcrumbsElement name="Посылки" url={`/champs/${compId}/sends`}/>*/}
            {/*    <BreadcrumbsElement name={data.id} active={true}/>*/}
            {/*</BreadcrumbsRoot>*/}

            <ViewSendComponent data={data}/>
        </>
    );
};

