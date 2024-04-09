const Card = (props) => {

    // eslint-disable-next-line react/prop-types
    const {className, children, ...other} = props;

    return (
        <div className={"card my-3 w-100 " + className} {...other}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
