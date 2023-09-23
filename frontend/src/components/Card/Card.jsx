import { useContext } from "react";
import deletebutton from "../../images/delet.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import IconLike from "../IconLike/IconLike.jsx";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext)
  

  return (
    <article className="elements__item element">
      {/*шаблон добавления карточки*/}
      {currentUser._id === card.owner && <img src={deletebutton} alt="#" className="elements__delete-btn" onClick={() => onDelete(card._id)}/>}
      <img
        className="element__image"
        src={card.link}
        alt={`Картинка ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-elements">
          <IconLike likes = {card.likes} myid={currentUser._id} cardid={card._id}/>
        </div>
      </div>
    </article>
  );
}