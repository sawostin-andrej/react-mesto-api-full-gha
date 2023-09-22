export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      {/*попап открытия большой картинки*/}
      <div
        className="popup__image-container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <img
          src={card.link}
          alt={`Картинка ${card.name}`}
          className="popup__image"
        />
        <p className="popup__image-title">{card.name}</p>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </section>
  );
}