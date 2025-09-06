import Card from "../../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useTranslation} from 'react-i18next';

export const AdminPostPage = () => {

    const [data, update] = useCachedGetAPI("/api/posts", () => {
    }, []);

    const { t } = useTranslation();

    useEffect(() => {
        update()
    }, []);

    console.debug(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('posts.posts')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">{t('posts.param_title')}</th>
                        <th scope="col">{t('posts.param_content')}</th>
                        <th scope="col">{t('posts.param_mainpage')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.map(elem => {
                            return (
                                <tr key={elem.id}>
                                    <th scope="row">{elem.id}</th>
                                    <td>
                                        <Link to={`/admin/posts/${elem.id}/edit`}>
                                            {elem.title}
                                        </Link>
                                    </td>
                                  <th scope="row">
                                    <input type="checkbox" disabled={true} defaultChecked={elem.showAtMain}/>
                                  </th>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>

                <div className='d-flex gap-2'>
                    <Link to="/admin/posts/create" className="btn btn-success">{t('posts.create')}</Link>
                </div>
            </Card>

        </>
    );
};
