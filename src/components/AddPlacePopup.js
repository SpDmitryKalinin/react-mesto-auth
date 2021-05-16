import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}){
    const linkRef = React.useRef();
    const nameRef = React.useRef();
    function onSubmit(e){
        e.preventDefault();
        onAddPlace(nameRef.current.value, linkRef.current.value);
    }
    return(
        <PopupWithForm 
                onClose = {onClose} 
                isOpen = {isOpen} 
                name="add" 
                title="Новое место"
                onSubmit={onSubmit}>
                <label>
                    <input 
                        ref={nameRef} 
                        name="place" 
                        placeholder = "Название" 
                        className="modal-window__item modal-window__place" 
                        type="text" 
                        required 
                        minLength="2" 
                        maxLength="30"/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <label>
                    <input 
                        ref={linkRef} 
                        type="url" 
                        name="link" 
                        placeholder="Ссылка на картинку" 
                        className="modal-window__item modal-window__link" 
                        required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
            </PopupWithForm>
        );
}