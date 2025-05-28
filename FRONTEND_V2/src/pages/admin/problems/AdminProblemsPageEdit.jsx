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

export const AdminProblemsPageEdit = () => {

    const navigate = useNavigate()

    const {probId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/problems/${probId}/admin`, () => {
    }, []);

    useEffect(() => {
        update()
    }, []);


    console.log(data)

    const {register, control, reset, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: "",
            description: "",
            inData: "",
            outData: "",
            tests: [{in: "", out: ""}],
            examples: [{in: "", out: ""}]
        }
    });


    useEffect(() => {
        if (data) {
            reset(data);
            // Принудительно сбросим поля для useFieldArray
            if (data.tests) {
                replaceTests(JSON.parse(data.tests));
            }
            if (data.examples) {
                replaceExamples(JSON.parse(data.examples));
            }
        }
    }, [data]);


    const {fields: testFields, append: appendTest, remove: removeTest, replace: replaceTests} = useFieldArray({
        control,
        name: "tests"
    });

    const {fields: exampleFields, append: appendExample, remove: removeExample,replace: replaceExamples} = useFieldArray({
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
                    <h3>Редактировать задачу</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Basic Fields */}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input className="form-control" {...register("name", {required: "Name is required"})} />
                            {errors.name && <div className="text-danger">{errors.name.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input className="form-control" {...register("description")} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Input Data</label>
                            <textarea className="form-control" {...register("inData")} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Output Data</label>
                            <textarea className="form-control" {...register("outData")} />
                        </div>

                        {/* Tests Section */}
                        <div className="mb-3">
                            <label className="form-label">Tests</label>
                            {testFields.map((item, index) => (
                                <div key={item.id} className="row mb-2">
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            placeholder="in"
                                            {...register(`tests.${index}.in`)}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            placeholder="out"
                                            {...register(`tests.${index}.out`)}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => removeTest(index)}>✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => appendTest({in: "", out: ""})}>
                                + Add Test
                            </button>
                        </div>

                        {/* Examples Section */}
                        <div className="mb-3">
                            <label className="form-label">Examples</label>
                            {exampleFields.map((item, index) => (
                                <div key={item.id} className="row mb-2">
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            placeholder="in"
                                            {...register(`examples.${index}.in`)}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            placeholder="out"
                                            {...register(`examples.${index}.out`)}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => removeExample(index)}>✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => appendExample({in: "", out: ""})}>
                                + Add Example
                            </button>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Card>
        </>
    );
};
