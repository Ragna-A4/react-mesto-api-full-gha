import React from "react";
import success from "../images/success.svg";
import failure from "../images/failure.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="close-button buttons-hover"
          type="button"
          onClick={props.onClose}
        ></button>
        <div>
          <img
            className="popup__image"
            src={props.isSuccess ? success : failure}
            alt={props.isSuccess ? "успех" : "неудача"}
          />
          <h3 className="popup__auth-message">
            {props.isSuccess
              ? props.successMessage
              : props.errorMessage}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;