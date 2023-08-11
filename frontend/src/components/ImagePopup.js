import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup image-popup ${card ? "popup_opened" : ""}`}>
      <div className="image-popup__container">
        <button
          className="close-button buttons-hover"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="image-popup__picture"
          src={card?.link}
          alt={card?.name}
        />
        <h3 className="image-popup__naming">{card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;