import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && 'elements__like-button_active'
  }`;
  return (
    <>
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={() => onCardClick(card)}
      />
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button"
          aria-label="Удалить"
          onClick={() => onCardDelete(card)}
        />
      )}
      <div className="elements__container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
            aria-label="Нравится"
          />
          <span className="elements__likes">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
