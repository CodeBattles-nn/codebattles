import Card from "../../components/bootstrap/Card.jsx";
import {useNavigate} from "react-router-dom";
import BreadcrumbsElement from "../../components/BreadcrumbsElement.jsx";
import BreadcrumbsRoot from "../../components/BreadcrumpsRoot.jsx";
import UserLoginRequired from "../../components/UserLoginRequired.jsx";
import {AdminHeader} from "../../components/AdminHeader.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import constants from "../../utils/consts.js";

export const AdminChampsCreate = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            description: '',
            startedAt: new Date().toISOString().slice(0, 16),
            endedAt: new Date().toISOString().slice(0, 16)
        }
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        // Convert date strings to ISO format
        const formattedData = {
            ...data,
            startedAt: new Date(data.startedAt).toISOString(),
            endedAt: new Date(data.endedAt).toISOString()
        };

        console.log(formattedData);

        const conf = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(constants.LOCALSTORAGE_JWT)}`
            }
        }

        axios.post('/api/competitions', data, conf)
            .then(() => navigate("/admin/champs"))
    };


    return (
        <>
            <UserLoginRequired/>

            <BreadcrumbsRoot>
                <BreadcrumbsElement name="Создание соревнования"/>
            </BreadcrumbsRoot>

            <AdminHeader/>

            <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Название</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            {...register("name", {required: "Название обязательно"})}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Описание</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="3"
                            {...register("description", {required: "Описание обязательно"})}
                        />
                        {errors.description &&
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Дата и время начала</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded"
                            {...register("startedAt", {required: "Дата и время начала обязательны"})}
                        />
                        {errors.startedAt && <p className="text-red-500 text-sm mt-1">{errors.startedAt.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Дата и время окончания</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded"
                            {...register("endedAt", {required: "Дата и время окончания обязательны"})}
                        />
                        {errors.endedAt && <p className="text-red-500 text-sm mt-1">{errors.endedAt.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Сохранить
                    </button>
                </form>
            </Card>
        </>
    );
};
