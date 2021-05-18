import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const inputRef = React.useRef();
    function onSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputRef.current.value)
    }
    return(
        <PopupWithForm 
            onClose = {onClose} 
            isOpen = {isOpen} 
            name="edit-avatar" 
            title="Редактировать аватар"
            onSubmit={onSubmit}
            buttonText ='Обновить'>
            <label>
                <input 
                    ref={inputRef} 
                    type="url" 
                    name="link" 
                    placeholder="Ссылка на картинку" 
                    className="modal-window__item modal-window__link" 
                    required/>
                <span className="modal-window__type-error">Вы пропустили это поле</span>
            </label>
        </PopupWithForm>)
}