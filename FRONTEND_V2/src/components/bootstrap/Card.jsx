// eslint-disable-next-line react/prop-types
const Card = ({className, children}) => {
    return (
        <div className={"card my-3 w-100 " + className}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
