export default function ImagePopup({card, onClose}){
    return(
        <section className={`modal-window modal-window_image ${card.link ? "modal-window_is-open" : ""}`} onClick={onClose}>
            <div className="modal-window__container-full-image" onClick={(evt) => evt.stopPropagation()}>
                <img className="modal-window__full-image" src={card.link} alt={card.name}/>
                <h2 className="modal-window__image-caption">{card.name}</h2>
                <button className="modal-window__close-button modal-window__close-button_image" onClick={onClose}></button>
            </div>
        </section>);
}