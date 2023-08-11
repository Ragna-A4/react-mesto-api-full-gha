import React from "react";

function PopupWithForm({
  name,
  title,
  buttonName,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="close-button buttons-hover"
          type="button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            className="popup__save-button buttons-hover buttons-hover_type_save"
            type="submit"
          >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;