import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isSending,
}) {
  const {values, errors, isValid, isInputValid, handleChange, reset} =
    useFormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: values.name, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isSending={isSending}
    >
      <input
        className={`popup__input popup__input_name ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__button_invalid"
        } `}
        type="text"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        id="title-input"
        value={values.name ? values.name : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="title-input-error">
        {errors.name}
      </span>
      <input
        className={`popup__input ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__button_invalid"
        } `}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        value={values.link ? values.link : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="link-input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
