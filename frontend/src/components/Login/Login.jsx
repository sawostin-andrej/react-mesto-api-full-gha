import React from "react";
import useFormValidation from "../../utils/useFormValidation.js";

export default function Login({ handleLogin }) {
  const {values, errors, reset, handleChange, isInputValid } =
    useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin(
      {
        email: values.email,
        password: values.password,
      },
      reset
    );
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
          value={values.email ? values.email : ""}
          onChange={handleChange}
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
          name="password"
          type="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={200}
          value={values.password ? values.password : ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error">{errors.password}</span>
        <button className="auth__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
