import Card from "./Card";
import { currentUserContext } from "../contexts/CurrenUserContext";
import { useContext } from "react";
import Header from "./Header";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  signOut,
  userEmail
}) {
  const currentUser = useContext(currentUserContext);

  return (
    <>
      <Header
        isLoggedIn={true}
        email={userEmail}
        type="exit"
        path="/sign-in"
        buttonName="Выйти"
        onClick={signOut}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__user">
            <div className="profile__avatar">
              <button
                className="profile__avatar-edit-button"
                type="button"
                onClick={onEditAvatar}
              ></button>
              <img
                className="profile__avatar profile__avatar_image"
                src={currentUser.avatar}
                alt="аватар"
              />
            </div>
            <div className="profile__user-info">
              <h1 className="profile__user-name text-overflow">
                {currentUser.name}
              </h1>
              <button
                className="profile__edit-button buttons-hover"
                type="button"
                onClick={onEditProfile}
              ></button>
              <p className="profile__user-job text-overflow">
                {currentUser.about}
              </p>
            </div>
          </div>
          <button
            className="profile__add-button buttons-hover"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="gallery">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
