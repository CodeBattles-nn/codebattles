import useCachedGetAPI from "../../../hooks/useGetAPI.js";
import {useEffect} from "react";
import BreadcrumbsElement from "../../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../../components/AdminHeader.jsx";
import {useFieldArray, useForm} from "react-hook-form";
import Card from "../../../components/bootstrap/Card.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import constants from "../../../utils/consts.js";
import {MasterForm} from "../../../components/forms/MasterForm.jsx";
import {ProblemsForm} from "../../../components/form_impl/ProblemsForm.jsx";

export const AdminProblemsPageEdit = () => {

    const navigate = useNavigate()

    const {probId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/problems/${probId}/admin`, () => {
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

    const { control, reset} = form


    const testsArray = useFieldArray({
        control,
        name: "tests"
    });

    const examplesArray = useFieldArray({
        control,
        name: "examples"
    });


    useEffect(() => {
        if (data) {
            reset(data);
            // Принудительно сбросим поля для useFieldArray
            if (data.tests) {
                testsArray.replace(JSON.parse(data.tests));
            }
            if (data.examples) {
                examplesArray.replace(JSON.parse(data.examples));
            }
        }
    }, [data]);



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


        axios.patch(`/api/problems/${probId}`, sendData, conf)
            .then(() => navigate("/admin/problems"))
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
