import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import React, { useCallback } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { useEffect } from "react";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [PopupImage, setPopupImage] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSending, setIsSending] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState([]);

  const [cards, setCards] = React.useState([]);
  const [deleteCardId, setDeleteCardId] = React.useState("");

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setPopupImage(false);
    setDeletePopupOpen(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setAllStatesForClosePopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [setAllStatesForClosePopups]
  );

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setAllStatesForClosePopups, closePopupByEsc]);

  function setEvantLisenerForDocument() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
    setEvantLisenerForDocument();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvantLisenerForDocument();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvantLisenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvantLisenerForDocument();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPopupImage(true);
    setEvantLisenerForDocument();
  }

  useEffect(() => {
    Promise.all([api.getinfo(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setIsSending(true);
    api
      .deleteCard(deleteCardId)
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
      .setUserInfo(datauser)
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
      .setAvatar(datauser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка редактирования аватара ${err}`))
      .finally(() => setIsSending(false));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSending(true);
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([ res, ...cards ]);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => console.error(`Ошибка добавления карточки ${err}`))
      .finally(() => setIsSending(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          cards={cards}
        />

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
          isOpen={PopupImage}
          onClose={closeAllPopups}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;