import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Login({ onLogin, onFail, setEmail }) {
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
      .login(formValues.email, formValues.password)
      .then((data) => {
        onLogin();
        navigate('/');
        setEmail(formValues.email);
        localStorage.setItem('jwt', data.token);
      })
      .catch((err) => {
        setErrorMessage('Некорректный email или пароль');
        onFail();
      });
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
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
          <span className="edit-form__input-error edit-form__input-error_text_name">
            {errorMessage}
          </span>
        </fieldset>
        <button
          type="submit"
          className="popup__saved popup__saved_type_auth"
          name="popup_save"
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
