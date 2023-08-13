import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardName = React.useRef();
  const cardLink = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      cardName.current.value = '';
      cardLink.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: cardLink.current.value,
      name: cardName.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="edit-form__textfields">
        <input
          className="edit-form__input edit-form__input_text_card-heading"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          ref={cardName}
        />
        <span className="edit-form__input-error edit-form__input-error_text_name" />
        <input
          className="edit-form__input edit-form__input_text_card-link"
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          required=""
          ref={cardLink}
        />
        <span className="edit-form__input-error edit-form__input-error_text_link" />
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
