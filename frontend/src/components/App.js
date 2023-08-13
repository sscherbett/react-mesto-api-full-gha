import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] =
    React.useState(false);
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setEmail(data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.error(err);
          setIsLoggedIn(false);
          navigate('/sign-in');
        });
    } else {
      setIsLoggedIn(false);
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((error) => console.error(`Ошибка: ${error}`));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => console.error(`Ошибка: ${error}`));
    }
  }, [isLoggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleCardDelete(card) {
    api
      .handleDeleteButton(card._id)
      .then(() =>
        setCards((prevValue) =>
          prevValue.filter((c) => (c._id !== card._id ? c : ''))
        )
      )
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleUpdateUser(userInfo) {
    api
      .editProfile(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .addAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  function openFailTooltip() {
    setIsSuccessInfoTooltipStatus(false);
    setIsInfoTooltipOpen(true);
  }

  function openSuccessTooltip() {
    setIsSuccessInfoTooltipStatus(true);
    setIsInfoTooltipOpen(true);
  }

  function closeInfoTooltip() {
    if (isSuccessInfoTooltipStatus) {
      navigate('/sign-in');
      setIsInfoTooltipOpen(false);
    }
    setIsInfoTooltipOpen(false);
  }

  function handleExit() {
    navigate('/sign-in');
    setEmail('');
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} setEmail={setEmail} onClose={handleExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onSuccess={openSuccessTooltip}
                onFail={openFailTooltip}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={() => {
                  setIsLoggedIn(true);
                }}
                onFail={openFailTooltip}
                setEmail={setEmail}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
          title={
            isSuccessInfoTooltipStatus
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="submit"
          buttonName="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
