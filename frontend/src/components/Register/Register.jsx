import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../../utils/useFormValidation.js";

export default function Register({ handleRegister }) {
  const { values, errors, isInputValid, reset, handleChange } =
    useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    handleRegister(
      {
        email: values.email,
        password: values.password,
      },
      reset
    );
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className={`popup__input ${
            isInputValid.email === undefined || isInputValid.email
              ? ""
              : "popup__input_type_error"
          }`}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email ? values.email : ""}
          minLength={2}
          maxLength={40}
          required
        />
        <span className="popup__error">{errors.email}</span>
        <input
          className={`popup__input ${
            isInputValid.password === undefined || isInputValid.password
              ? ""
              : "popup__input_type_error"
          }`}
          type="password"
          name="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={200}
          required
          onChange={handleChange}
          value={values.password ? values.password : ""}
        />
        <span className="popup__error">{errors.password}</span>
        <button className="auth__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link className="auth__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}