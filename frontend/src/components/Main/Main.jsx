import Card from "../Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="Жак-Ив Кусто"
          />
        </button>
        <div className="profile__info">
          <div className="profile__box">
            <h1 className="profile__title">
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((data) => {
          return (
            <article className="elements__item element" key={data._id}>
              <Card card={data} onCardClick={onCardClick} onDelete={onDelete} />
            </article>
          );
        })}
      </section>
      {/*контейнер добавления карточек*/}
    </main>
  );
}