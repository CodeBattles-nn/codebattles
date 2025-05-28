import Card from "./bootstrap/Card.jsx";
import PropTypes from "prop-types";

const BreadcrumbsRoot = ({children}) => {
    return (
        <Card>
            <nav aria-label="breadcrumb" className="my-3">
                <ol className="breadcrumb">
                    {children}
                </ol>
            </nav>
        </Card>
    );
};

BreadcrumbsRoot.propTypes = {
    children: PropTypes.node.isRequired
};

export default BreadcrumbsRoot;
