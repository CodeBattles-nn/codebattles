import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useFieldArray, useForm} from "react-hook-form";
import Card from "../../../components/bootstrap/Card.jsx";
import constants from "../../../utils/consts.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {ProblemsForm} from "../../../components/form_impl/ProblemsForm.jsx";

export const AdminProblemsPageCreate = () => {

    const navigate = useNavigate()

    const [data, update] = useCachedGetAPI("/api/problems", () => {
    }, []);

    useEffect(() => {
        update()
    }, []);

    console.log(data)

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
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        const sendData = {...data}
        sendData.examples = JSON.stringify(data.examples)
        sendData.tests = JSON.stringify(data.tests)


        axios.post('/api/problems', sendData, conf)
            .then(() => navigate("/admin/champs"))
    };

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Задачи"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <div className="container mt-4">
                    <h3>Создать задачу</h3>
                    <MasterForm form={form} onSubmit={onSubmit}>
                        <ProblemsForm form={form} testsArray={testsArray} examplesArray={examplesArray}/>
                    </MasterForm>
                </div>
            </Card>
        </>
    );
};
