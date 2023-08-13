import React from 'react';

function PopupWithForm({name, buttonName, title, children, isOpen, onClose, onSubmit}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__header">{title}</h2>
        <form className="edit-form" name={name} onSubmit={onSubmit}>
            {children} 
          <button
            type="submit"
            className="popup__saved"
            name="popup_save"
            value="save"
            aria-label="Сохранить"
          >
            {buttonName}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
