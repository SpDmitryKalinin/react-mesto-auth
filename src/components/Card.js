import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}){
    const info = useContext(CurrentUserContext);
    if(!card){
        return null
    }   
    else{
        return(
            <section className="element">
                <img className="element__image" src={card.link} alt={card.name} onClick ={() => onCardClick(card)}/>
                <div className="element__caption">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like">
                        <button type="button" onClick ={() => onCardLike(card)} className={`element__button-like ${card.likes.some(i => i._id === info._id) ? "element__button-like_active" : ""}`}></button>
                        <p className="element__counter-like">{card.likes.length}</p>
                    </div>
                </div>
                {info._id === card.owner._id ? <button className="element__button-delete" onClick={()=>{onCardDelete(card)}}></button>: <></>}
            </section>
        )
    }
}