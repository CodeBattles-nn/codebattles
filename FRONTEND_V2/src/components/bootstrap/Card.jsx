const Card = ({children}) => {
    return (
        <div className="card my-3">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
