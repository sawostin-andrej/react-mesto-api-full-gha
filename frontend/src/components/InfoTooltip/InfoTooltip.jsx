import React from "react";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section className={`popup popup__info ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <div
          className={`popup__image-success ${
            !isSuccess ? "popup__image-error" : ""
          }`}
        />
        <h2 className="popup__info-title">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}
