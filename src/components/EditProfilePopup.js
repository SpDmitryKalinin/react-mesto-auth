import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props){
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name)
    const [description, setDescription] = useState(currentUser.about);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]); 

    function onChangeName(e){
        setName(e.target.value);
    }
    function onChangeDescription(e){
        setDescription(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();
        props.onUpdateUser(name, description);
    }
    return(
        <PopupWithForm 
            onClose = {props.onClose} 
            isOpen = {props.isOpen} 
            name="edit-avatar" 
            title="Редактировать профиль"
            onSubmit={onSubmit}
            buttonText ='Редактировать'>
                <label>
                    <input 
                        onChange={onChangeName} 
                        name="name" 
                        placeholder = "Имя" 
                        className="modal-window__item modal-window__name" 
                        type="text" 
                        required
                        value ={name || ''} 
                        minLength="2" 
                        maxLength="40"/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
                <label>
                    <input 
                        onChange={onChangeDescription} 
                        name="emloyment" 
                        placeholder = "Род деятельности" 
                        className="modal-window__item modal-window__employment" 
                        type="text" 
                        minLength="2" 
                        maxLength="200"
                        value ={description  || ''} 
                        required/>
                    <span className="modal-window__type-error">Вы пропустили это поле</span>
                </label>
        </PopupWithForm>);
}