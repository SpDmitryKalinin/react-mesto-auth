import logo from '../images/logo.svg';

function Header(props){
    
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"/>
            {props.status ? 
            <div className={"header__complete"}>
                <p className="header__email">email@mail.com</p>
                <button className="header__button">Выйти</button>
            </div> :
            window.location.href.indexOf('sign-up') != -1 ? <button className="header__button">Войти</button> : <button className="header__button">Регистрация</button>}     
        </header>
    );
}

export default Header;