import Card from "../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";

export const AdminChampsDetailCheckerPage = () => {

    const {compId} = useParams()

    const [checkers, checkerUpdate] = useCachedGetAPI(`/api/checkers`, () => {}, []);
    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}`, () => {}, []);

    const enabledCheckerIds = data?.checkers?.map(elem => elem.id)

    useEffect(() => {
        update()
        checkerUpdate()
    }, []);

    console.log(data)

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования"/>
            </BreadcrumbsRoot>
            <Card>
                <button className="btn">соревнования</button>
                <button className="btn">задачи</button>
                <button className="btn">чекеры</button>
                <button className="btn">интерфейс ученика</button>
            </Card>

            <Card key={data.id}>
                <h2>Управление | Чекеры</h2>



                <form>
                    {

                        checkers?.map( checker => {
                            console.log("x", enabledCheckerIds?.includes(checker.id))
                            return   <div className="mb-3 form-check">
                                <input defaultChecked={enabledCheckerIds?.includes(checker.id)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">{checker.displayName} | <small>{checker.languageHighlightName} </small></label>
                            </div>
                        })
                    }

                    {/*<div className="mb-3 form-check">*/}
                    {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1" />*/}
                    {/*        <label className="form-check-label" htmlFor="exampleCheck1">Python 3.8</label>*/}
                    {/*</div>*/}
                    {/*<div className="mb-3 form-check">*/}
                    {/*    <input type="checkbox" className="form-check-input" id="exampleCheck2" />*/}
                    {/*        <label className="form-check-label" htmlFor="exampleCheck2">Java 1.18</label>*/}
                    {/*</div>*/}

                    <button className="btn btn-success">Сохранить</button>
                    <Link to={`/admin/champs/${compId}/edit`} className="btn btn-danger">Отмена</Link>
                </form>


            </Card>
        </>
);
};
