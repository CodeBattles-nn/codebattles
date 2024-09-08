import If from "./If";
import {Link, useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TeacherNavBar = ({hiddenUrl}) => {

    const location = useLocation();
    const current_url = location.pathname;


    const _Navbar =
        <>
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron theme-bg-light  p-3">
                        <Link className="mr-2" to={"/teacher/champs"}>Соревнования</Link>
                        <Link to={"/teacher/profile"}>Смена пароля</Link>
                    </div>
                </div>
            </div>
        </>

    return (
        <If
            condition={current_url === hiddenUrl}
            is_false={_Navbar}
        />
    );
};

export default TeacherNavBar;
