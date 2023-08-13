import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_full-image ${card && "popup_opened"}`}>
      <div className="popup__wrapper">
        <button
          type="button"
          className="popup__close-button popup__close-button_type_full-image"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img className="popup__full-image" src={card?.link} alt={card?.name} />
        <h2 className="popup__image-title">{card ? card.name : ''}</h2>
      </div>
    </section>
  );
}
export default ImagePopup;
