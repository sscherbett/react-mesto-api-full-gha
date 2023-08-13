import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="edit-form__textfields">
        <input
          className="edit-form__input edit-form__input_text_name"
          name="name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required=""
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <span className="edit-form__input-error edit-form__input-error_text_name" />
        <input
          className="edit-form__input edit-form__input_text_occupation"
          name="about"
          placeholder="Вид деятельности"
          minLength={2}
          maxLength={200}
          required=""
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <span className="edit-form__input-error edit-form__input-error_text_about" />
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
