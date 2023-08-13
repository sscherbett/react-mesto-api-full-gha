import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Register({ onSuccess, onFail }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(formValues.email, formValues.password)
      .then((data) => {
        onSuccess();
      })
      .catch((err) => {
        onFail();
        setErrorMessage('Пользователь с таким email уже зарегистрирован');
        console.error(err);
      });
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="edit-form__textfields edit-form__textfields_type_auth">
          <input
            className="edit-form__input edit-form__input_type_auth"
            name="email"
            type="email"
            placeholder="Email"
            required={true}
            value={formValues.email}
            onChange={handleChange}
          />
          <span className="edit-form__input-error edit-form__input-error_text_name">
            {errorMessage}
          </span>
          <input
            className="edit-form__input edit-form__input_type_auth"
            name="password"
            type="password"
            placeholder="Пароль"
            required={true}
            value={formValues.password}
            onChange={handleChange}
          />
          <span className="edit-form__input-error edit-form__input-error_text_name" />
        </fieldset>
        <button
          type="submit"
          className="popup__saved popup__saved_type_auth"
          name="popup_save"
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text-container">
        <Link to="/sign-in" className="register__text">
          Уже зарегистрированы? Войти
        </Link>
      </p>
    </div>
  );
}
export default Register;
