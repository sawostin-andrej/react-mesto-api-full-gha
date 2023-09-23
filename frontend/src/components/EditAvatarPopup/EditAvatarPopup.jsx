import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSending,
}) {
  const input = useRef();
  const {values, errors, isValid, isInputValid, handleChange, reset} =
    useFormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="typeАvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isSending={isSending}
      isValid={isValid}
    >
      <input
        ref={input}
        className={`popup__input ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : "popup__input_type_error"
        }`}
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        id="avatar-input"
        value={values.avatar ? values.avatar : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="avatar-input-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}