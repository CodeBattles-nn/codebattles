import {Link} from "react-router-dom";

const BreadcrumbsElement = ({name, url, active}) => {

    const isActiveClass = active ? ("active") : ("")

    return (

        url ? (
            <li className={"breadcrumb-item " + isActiveClass}>
                <Link to={url}>{name}</Link>
            </li>
        ) : (
            <li className={"breadcrumb-item " + isActiveClass}>
                {name}
            </li>
        )

    );
};

export default BreadcrumbsElement;
