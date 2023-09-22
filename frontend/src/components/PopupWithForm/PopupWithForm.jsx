export default function PopupWithForm({
  title,
  name,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSending,
  isValid = true,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      {/*попап кнопки создания профиля*/}
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form popup__form_edit"
          name="edittheform"
          method="POST"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__button ${
              isValid ? "" : "popup__button_invalid"
            }`}
            disabled={isSending}
          >
            {isSending ? "..." : titleButton || "Сохранить"}
          </button>
        </form>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </section>
  );
}