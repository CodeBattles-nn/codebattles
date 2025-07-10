import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import {ViewSendComponent} from "../../components/ViewSendComponent.jsx";
import {useTranslation} from 'react-i18next';

const SeeSendPage = () => {
    const {t} = useTranslation();
    const {id, compId} = useParams();
    const [data, update, loading] = useCachedGetAPI(`/api/answers/${id}`);

    useEffect(() => {
        update();
    }, []);

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('send.competitions')} url="/champs"/>
                <BreadcrumbsElement name={t('send.submissions')} url={`/champs/${compId}/sends`}/>
                <BreadcrumbsElement
                    name={data.id ? `${t('send.submissionDetails')} #${data.id}` : t('send.submissionDetails')}
                    active={true}
                />
            </BreadcrumbsRoot>

            <ViewSendComponent data={data} loading={loading}/>
        </>
    );
};

export default SeeSendPage;