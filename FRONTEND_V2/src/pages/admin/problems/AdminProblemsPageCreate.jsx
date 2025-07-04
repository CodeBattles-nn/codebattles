import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useFieldArray, useForm} from "react-hook-form";
import Card from "../../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {ProblemsForm} from "../../../components/form_impl/ProblemsForm.jsx";
import {useTranslation} from 'react-i18next';
import {axiosInstance} from "../../../utils/settings.js";

export const AdminProblemsPageCreate = () => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    const [data, update] = useCachedGetAPI("/api/problems", () => {
    }, []);

    useEffect(() => {
        update()
    }, []);

    console.debug(data)

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            inData: "",
            outData: "",
            tests: [{in: "", out: ""}],
            examples: [{in: "", out: ""}]
        }
    })
    const {control} = form

    const testsArray = useFieldArray({
        control,
        name: "tests"
    });
    const examplesArray = useFieldArray({
        control,
        name: "examples"
    });


    const onSubmit = (data) => {
        const sendData = {...data}
        sendData.examples = JSON.stringify(data.examples)
        sendData.tests = JSON.stringify(data.tests)


        axiosInstance.post('/api/problems', sendData)
            .then(() => navigate("/admin/champs"))
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name={t('adminProblems.problems')}/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <div className="container mt-4">
                    <h3>{t('adminProblems.createProblem')}</h3>
                    <MasterForm form={form} onSubmit={onSubmit}>
                        <ProblemsForm form={form} testsArray={testsArray} examplesArray={examplesArray}/>
                    </MasterForm>
                </div>
            </Card>
        </>
    );
};
