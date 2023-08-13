import React from 'react';
import { api } from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        {/* profile */}
        <section className="profile">
          <div className="profile__wrapper">
            <div className="profile__avatar-container" onClick={onEditAvatar}>
              <img
                src={currentUser.avatar}
                alt="Аватар профиля"
                className="profile__avatar"
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              />
              <p className="profile__user-occupation">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить"
            onClick={onAddPlace}
          />
        </section>
        {/* elements cards*/}
        <section className="elements">
          <ul className="elements__items">
            {cards.map((element) => (
              <li key={element._id} className="elements__item">
                <Card
                  card={element}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Main;
