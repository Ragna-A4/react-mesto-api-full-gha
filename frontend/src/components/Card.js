import React from "react";
import { currentUserContext } from "../contexts/CurrenUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(currentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((item) => item === currentUser._id);
  const cardLikeButtonClassName = `card-button card-button__like buttons-hover buttons-hover_type_like ${
    isLiked && "card-button__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    console.log(card);
    console.log(card._id);
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card-button card-button__trash buttons-hover"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__description">
        <h2 className="card__naming text-overflow">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          />
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;