import { useState, useEffect } from "react";
import { currentUserContext } from "../contexts/CurrenUserContext";
import { api } from "../utils/api";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

import { ProtectedRoute } from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProflePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState({});

  const checkToken = () => {
    auth
      .getContent()
      .then((data) => {
        if (!data) {
          return;
        }
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(`Err: ${err}`);
      });
  };

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmitRegistration(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        handleAutorizationSubmit();
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSuccess(false);
        handleAutorizationSubmit();
        console.log(`Err: ${err}`);
      });
  }

  function handleSubmitLogin(email, password) {
    auth
      .authorize(email, password)
      .then((_data) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsSuccess(false);
        handleAutorizationSubmit();
        console.log(`Err: ${err}`);
      });
  }

  function signout() {
    auth
    .signout()
    .then(res => {
      if(res) {
        setIsLoggedIn(false);
        setCurrentUser({});
        navigate("/sign-in", {replace: true});
      }
    })
    .catch((err) => console.log(`Err: ${err}`));
  }

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if(!isLoggedIn) {
      return
    };
    Promise.all([api.getProfile(), api.getCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .catch((err) => console.log(`Err: ${err}`));
  }, [isLoggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProflePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAutorizationSubmit() {
    setIsInfoPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProflePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Err: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id));
      })
      .catch((err) => console.log(`Err: ${err}`));
  }

  function handleUpdateUser(data) {
    api
      .patchProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Err: ${err}`));
  }

  function handleUpdateAvatar(data) {
    api
      .patchAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Err: ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Err: ${err}`));
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegistration={handleSubmitRegistration} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleSubmitLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  signOut={signout}
                  userEmail={userEmail}
                  cards={cards}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>

          <Footer />

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

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="deletion-confirm"
            title="Вы уверены?"
            buttonName="Да"
            isOpen={false}
            onClose={closeAllPopups}
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            name="infotooltip"
            isSuccess={isSuccess}
            successMessage="Вы успешно зарегистрировались!"
            errorMessage="Что-то пошло не так! Попробуйте еще раз."
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
