//Импорт двух картинок с тернарным оператором
import confirmImage from './../images/yes.svg';
import crossImage from './../images/no.svg';

export default function InfoToolTip({isOpen, name, type, onClose}){

    return(
        <section 
            className={`modal-window modal-window${name} ${isOpen ? 'modal-window_is-open' : ''}`} 
            onClick={onClose}>
            <form  
                name={name} 
                className={`modal-window__form`} 
                onClick={(evt) => evt.stopPropagation()} 
                noValidate>
                <img className={"modal-window__image"} alt = "Индикатор успешной или неудачной регистрации" src={type ? confirmImage : crossImage}/>
                <h2 className="modal-window__title modal-window__title_tooltip">
                    {type ? 'Вы успешно зарегистрировались!' : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                <button type="button" className={`modal-window__close-button`} onClick={onClose}></button>
            </form>
        </section>
        );
}