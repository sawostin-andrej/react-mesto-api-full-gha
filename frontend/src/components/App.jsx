import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import React, { useCallback } from "react";
import { useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import { auth } from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [popupImage, setPopupImage] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSending, setIsSending] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [deleteCardId, setDeleteCardId] = React.useState("");

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isActiveHeader, setIsActiveHeader] = React.useState(false);

  const navigate = useNavigate();

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setPopupImage(false);
    setDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setAllStatesForClosePopups();
      }
    },
    [
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      popupImage,
    ]
  );

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups();
  }, [setAllStatesForClosePopups]);

  useEffect(() => {
    document.addEventListener("keydown", closePopupByEsc);
    return () => document.removeEventListener("keydown", closePopupByEsc);
  }, []);

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopupImage(true);
  }

  useEffect(() => {
    loggedIn &&
      Promise.all([
        api.getinfo(localStorage.jwt),
        api.getInitialCards(localStorage.jwt),
      ])
      .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((err) => console.error(`Ошибка при загрузке ${err}`));
  }, [loggedIn]);

  useEffect(() => {
    const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setUserEmail(res.email);
          }
        })
        .catch((err) =>
          console.error(`Ошибка авторизации при повторном входе ${err}`)
        );
    };
  };
    tokenCheck();
  }, [navigate]);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setIsSending(true);
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка удаления карточки ${err}`))
      .finally(() => setIsSending(false));
  }

  function handleUpdateUser(datauser, reset) {
    setIsSending(true);
    api
      .setUserInfo(datauser, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка редактирования профиля ${err}`))
      .finally(() => setIsSending(false));
  }

  function handleUpdateAvatar(datauser, reset) {
    setIsSending(true);
    api
      .setAvatar(datauser, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка редактирования аватара ${err}`))
      .finally(() => setIsSending(false));
  }
  console.log();

  function handleAddPlaceSubmit(data, reset) {
    console.log(data)
    setIsSending(true);
    api
      .addCard(data, localStorage.jwt)
      .then(({data}) => {
        setCards([...cards, data]);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка добавления карточки ${err}`))
      .finally(() => setIsSending(false));
  }

  function handleRegister(value) {
    const { email, password } = value;
    auth
      .registration(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(true);
        navigate("/sign-in");
        setIsActiveHeader(false);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка регистрации ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorization(email, password)
      .then(() => {
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка авторизации ${err}`);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          email={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
          setIsActiveHeader={setIsActiveHeader}
          isActiveHeader={isActiveHeader}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDelete={handleDeletePopupClick}
                cards={cards}
              />
            }
          />

          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isSending={isSending}
          isOpen={isEditAvatarPopupOpen}
        />

        <PopupWithForm
          name="typeDelete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}
          isSending={isSending}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={popupImage}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
