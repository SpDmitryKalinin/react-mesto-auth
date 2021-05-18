import logo from '../images/logo.svg';
import {Link, useHistory} from 'react-router-dom'; 
import React, { useState } from "react";
function Header(props){

    const history = useHistory();
    function signOut(){
        localStorage.removeItem('jwt');
        props.logout();
        history.push('/sign-in');
    }
    
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"/>
            {props.status ? 
            <div className={"header__complete"}>
                <p className="header__email">{props.mail}</p>
                <button onClick={signOut} className="header__button">Выйти</button>
            </div> :
            window.location.href.indexOf('sign-up') !== -1 ? <Link to={`/sign-in`} className="header__button">Войти</Link> : <Link to={`/sign-up`} className="header__button">Регистрация</Link>}     
        </header>
    );
}

export default Header;