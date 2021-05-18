import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}){
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    function onSubmit(e){
        e.preventDefault();
        onAddPlace(name, link, setName, setLink);
    }
    function changeLink(e){
        setLink(e.target.value);
    }
    function changeName(e){
        setName(e.target.value);
    }
    return(
        <PopupWithForm 
                onClose = {onClose} 
                isOpen = {isOpen} 
                name="add" 
                title="Новое место"
                onSubmit={onSubmit}
                buttonText='Сохранить'>
                <label>
                    <input 
                        onChange ={changeName} 
                        name="place" 
                        placeholder = "Название" 
                        className="modal-window__item modal-window__place" 
                        type="text" 
                        required 
                        minLength="2" 
                        maxLength="30"
                        value={name || ''}/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <label>
                    <input 
                        onChange={changeLink}
                        type="url" 
                        name="link" 
                        placeholder="Ссылка на картинку" 
                        className="modal-window__item modal-window__link" 
                        required
                        value={link || ''}/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
            </PopupWithForm>
        );
}