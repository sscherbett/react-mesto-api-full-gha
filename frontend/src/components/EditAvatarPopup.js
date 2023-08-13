import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      avatar.current.value = '';
    }
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="edit-form__textfields">
        <input
          className="edit-form__input edit-form__input_text_card-link"
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          required=""
          ref={avatar}
        />
        <span className="edit-form__input-error edit-form__input-error_text_link" />
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
