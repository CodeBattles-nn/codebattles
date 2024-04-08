

// eslint-disable-next-line react/prop-types
const ResponsiveTable = ({children}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                {children}
            </table>
        </div>
    );
};

export default ResponsiveTable;
