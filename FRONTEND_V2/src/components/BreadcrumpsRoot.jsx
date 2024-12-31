import Card from "./bootstrap/Card.jsx";

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

export default BreadcrumbsRoot;
