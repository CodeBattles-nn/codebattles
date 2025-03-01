import {useEffect} from 'react';
import Card from "../../components/bootstrap/Card.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import LazySyntaxHighlight from "../../components/lazy/LazySyntaxHightlight.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import ResponsiveTable from "../../components/bootstrap/ResponsiveTable.jsx";

export const AdminSeeSendPage = () => {

    const {compId} = useParams();

    const [searchParams] = useSearchParams();

    const [data, update] = useCachedGetAPI(`/api/answers/last?compProblemId=${searchParams.get("compprobId")}&userId=${searchParams.get("userId")}`);

    const tests = JSON.parse(data?.result || "{}")

    console.log(tests)

    useEffect(() => {
        update()
    }, []);

    const colorsByResult = {
        "WRONG_ANSWER": "table-danger",
        "SUCCESS": "table-success",
        "RUNTIME_ERROR": "table-info",
        "COMPILATION_ERROR": "table-info",
        "TIME_LIMIT": "table-warning",
        "NOT_EXECUTED": "table-active",
    }

    return (<>
            <UserLoginRequired/>

            {/*<BreadcrumbsRoot>*/}
            {/*    <BreadcrumbsElement name="Соревнования" url="/champs"/>*/}
            {/*    <BreadcrumbsElement name="Посылки" url={`/champs/${compId}/sends`}/>*/}
            {/*    <BreadcrumbsElement name={data.id} active={true}/>*/}
            {/*</BreadcrumbsRoot>*/}

            <Card>
                <h3>Анализ посылки</h3>
                <p><b>Язык:</b> {data?.checker?.displayName}</p>
                <b>Исходный код:</b>
                <LazySyntaxHighlight lang={data?.checker?.languageHighlightName}>
                    {data.code}
                </LazySyntaxHighlight>
                <div className="my-4"></div>
                <ResponsiveTable>
                    <thead>
                    <tr>
                        <th scope="col">№ Теста</th>
                        <th scope="col">Время (ms)</th>
                        <th scope="col">Вердикт</th>
                        <th scope="col">Вывод</th>
                    </tr>
                    </thead>
                    <tbody className="theme-text-dark">
                    {
                        tests?.results?.map((test, i) => {
                            return (
                                <tr className={colorsByResult[test.msg]} key={"see-send-test-id-" + test.id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{test.time}</td>
                                    <td>{test.msg}</td>
                                    <td><p className="text-lines">{test.out}</p></td>
                                </tr>
                            )
                        })
                    }
                    {/*<tr>*/}
                    {/*    <th scope="row">-1</th>*/}
                    {/*    <td>-</td>*/}
                    {/*    <td>Подробные тесты будут доступны позже</td>*/}
                    {/*    <td><p className="text-lines">-</p></td>*/}
                    {/*</tr>*/}
                    </tbody>
                </ResponsiveTable>
            </Card>
        </>
    );
};

