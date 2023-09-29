import React from 'react';

const LoginPage = (props) => {
    return (
        <div className="container" style={{"background-color": "#ffe0b2"}}>
            <div className="row" style={{"margin-top": "25%"}}>
                <div className="col-2"></div>
                <div className="col-8 bg-light p-5" style={{"border-radius": "15px"}}>
                    <h4 className="text-danger">Error text</h4>
                    <form action="/" method="post">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">ID соревнования</label>
                            <input className="form-control" name="id" aria-describedby="emailHelp"
                                   placeholder="Введите id"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Логин</label>
                            <input className="form-control" name="login" aria-describedby="emailHelp"
                                   placeholder="Введите логин"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Пароль</label>
                            <input type="password" className="form-control" name="password"
                                   placeholder="Введите пароль"/>
                        </div>
                        <button type="submit" className="btn btn-primary text-white">Войти</button>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
};

export default LoginPage;