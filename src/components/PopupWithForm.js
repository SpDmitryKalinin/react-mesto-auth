export default function PopupWithForm({isOpen, name, title, children, onClose, onSubmit, buttonText}){
    return(
        <section 
            className={`modal-window modal-window_${name} ${isOpen ? 'modal-window_is-open' : ''}`} 
            onClick={onClose}>
            <form 
                onSubmit={onSubmit} 
                name={name} 
                className={`modal-window__form`} 
                onClick={(evt) => evt.stopPropagation()} 
                noValidate>
                <h2 className="modal-window__title">{title}</h2>
                {children}
                <button className={`modal-window__item modal-window__submit-button`} type="submit">{buttonText}</button>
                <button type="button" className={`modal-window__close-button`} onClick={onClose}></button>
            </form>
        </section>);
}