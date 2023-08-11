import React from "react";
import { currentUserContext } from "../contexts/CurrenUserContext";
import { useContext } from "react";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(currentUserContext);
  const [name, setName] = React.useState(false);
  const [description, setDescription] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        type="text"
        placeholder="Ваше имя"
        className="popup__item popup__item_el_name"
        onChange={changeName}
        value={name || ""}
      />
      <span id="input-name-err" className="popup__error-message"></span>
      <input
        id="input-job"
        name="about"
        required
        minLength="2"
        maxLength="200"
        type="text"
        placeholder="Чем Вы занимаетесь"
        className="popup__item popup__item_el_job"
        onChange={changeDescription}
        value={description || ""}
      />
      <span id="input-job-err" className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;