import Card from "../../components/bootstrap/Card.jsx";
import useCachedGetAPI from "../../hooks/useGetAPI.js";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";

import Select, {Option} from 'rc-select';
import 'rc-select/assets/index.css';

import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";

export const AdminUsersDetailCheckersPage = () => {

    const {compId} = useParams()

    const [data, update] = useCachedGetAPI(`/api/competitions/${compId}`, () => {
    }, []);
    const [users, updateUsers] = useCachedGetAPI(`/api/checkers`, () => {
    }, []);

    const [selectesUsers, setSelectesUsers] = useState([])

    useEffect(() => {
        update()
        updateUsers()
    }, []);

    // console.log(data)

    useEffect(() => {
        setSelectesUsers(data?.checkers?.map(elem => elem.id))
    }, [data])

    const handleSelectChange = (value) => {
        setSelectesUsers(value); // Update the state with selected values
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm()

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        setLoading(true)
        axios
            .put(`/api/competitions/${compId}/checkers`,
                {usersIds: selectesUsers},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
                    }
                })
            .then(() => {
                navigate(`/admin/champs/${compId}/edit`)
            })
            .catch(() => {
                navigate("/")

            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Соревнования"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card key={data.id}>
                <h2>Управление чекерами</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        style={{color: "black", width: "50%"}}
                        mode="multiple"
                        tokenSeparators={[' ', ',']}
                        value={selectesUsers}
                        onChange={handleSelectChange}
                        showSearch

                    >
                        {
                            users.map(elem => {
                                return (
                                    <Option disabled={false} className="bg-dark"
                                            value={elem.id}>{elem.displayName} ({elem.languageHighlightName})</Option>
                                )
                            })
                        }
                        {/*<Option value="lucy">lucy</Option>*/}
                        {/*<Option value="yiminghe">yiminghe</Option>*/}
                    </Select>
                    <br/>
                    <button className="btn btn-primary" disabled={loading}>изменить</button>
                </form>
            </Card>
        </>
    );
};
