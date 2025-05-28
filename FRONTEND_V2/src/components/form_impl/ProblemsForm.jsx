import React from 'react';
import {InputFormElement} from "../forms/InputFormElement.jsx";
import PropTypes from "prop-types";

export const ProblemsForm = ({form, testsArray, examplesArray}) => {
    const {
        register,
    } = form

    const {fields: testFields, append: appendTest, remove: removeTest} = testsArray
    const {fields: exampleFields, append: appendExample, remove: removeExample} = examplesArray

    return (
        <>

            <InputFormElement
                displayName={"Имя"}
                name={"name"}
                args={{required: "Имя обязательно"}}
            />
            <InputFormElement
                displayName={"Описание"}
                name={"description"}
                args={{required: "Описание обязательно"}}
            />
            <InputFormElement displayName={"Входные данные"} name={"inData"}/>
            <InputFormElement displayName={"Выходные данные"} name={"outData"}/>


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
        </>
    );
};


ProblemsForm.propTypes = {
    form: PropTypes.object,
    testsArray: PropTypes.object,
    examplesArray: PropTypes.object,
}


