import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState("");
  const [cardUrl, setCardUrl] = React.useState("");

  React.useEffect(() => {
    setCardName("");
    setCardUrl("");
  }, [isOpen]);

  function addCardName(e) {
    setCardName(e.target.value);
  }

  function addCardUrl(e) {
    setCardUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardUrl,
    });
  }

  return (
    <PopupWithForm
      name="gallery-add"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-place"
        name="name"
        required
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Название"
        className="popup__item popup__item_el_place"
        onChange={addCardName}
        value={cardName}
      />
      <span id="input-place-err" className="popup__error-message"></span>
      <input
        id="input-url"
        name="link"
        required
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__item popup__item_el_link"
        onChange={addCardUrl}
        value={cardUrl}
      />
      <span id="input-url-err" className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;