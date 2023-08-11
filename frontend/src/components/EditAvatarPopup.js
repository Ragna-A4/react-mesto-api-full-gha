import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar"
        name="avatar"
        required
        type="url"
        placeholder="Ссылка на аватар"
        className="popup__item popup__item_el_avatar"
        ref={inputRef}
      />
      <span id="input-avatar-err" className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;