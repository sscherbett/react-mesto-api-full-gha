import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoMesto from '../images/logo.svg';

function Header({ email, onClose }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logoMesto} alt="Логотип" className="header__logo" />
      <nav className="navbar">
        <ul className="navbar__menu">
          {location.pathname === '/sign-up' && (
            <li>
              <Link to="/sign-in" className="navbar__link">
                Войти
              </Link>
            </li>
          )}
          {location.pathname === '/sign-in' && (
            <li>
              <Link to="/sign-up" className="navbar__link">
                Регистрация
              </Link>
            </li>
          )}
          {location.pathname === '/' && (
            <li className="navbar__link_type_email">{email}</li>
          )}
          {location.pathname === '/' && (
            <li>
              <button className="navbar__link navbar__button" onClick={onClose}>
                Выйти
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
