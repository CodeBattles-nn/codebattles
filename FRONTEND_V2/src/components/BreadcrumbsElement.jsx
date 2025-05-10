import {Link} from "react-router-dom";
import PropTypes from "prop-types";

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

BreadcrumbsElement.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    active: PropTypes.bool
};

BreadcrumbsElement.defaultProps = {
    url: null,
    active: false
};

export default BreadcrumbsElement;
