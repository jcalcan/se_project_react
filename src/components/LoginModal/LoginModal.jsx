import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useRef } from "react";
import "./LoginModal.css";

export default function LoginModal({
  onClose,
  isOpen,
  handleLogin,
  handleModalSwitch,
  errorMessage
}) {
  const emailInputRef = useRef(null);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    let hasErrors = false;

    const isValidEmail = (email) => {
      return email.includes("@") && email.includes(".");
    };

    const isValidPassword = (password) => {
      return password.length >= 6;
    };

    if (!isValidEmail(currentUser.email)) {
      setEmailError(true);
      hasErrors = true;
    }

    if (!isValidPassword(currentUser.password)) {
      setPasswordError(true);
      hasErrors = true;
    }
    if (!hasErrors) handleLogin(currentUser);
  };

  useEffect(() => {
    if (isOpen) {
      emailInputRef.current?.focus();
      setCurrentUser({
        email: "",
        password: ""
      });
      setEmailError(false);
      setPasswordError(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      buttonWidthStyle={{ width: "73px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={
        <button
          type="button"
          to="signup"
          className="modal__alternateAction-link"
          onClick={handleModalSwitch}
        >
          or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email-input" className="modal__label">
        Email*
      </label>
      <input
        ref={emailInputRef}
        id="login-email-input"
        type="email"
        className={`modal__input ${emailError ? "modal__input_error" : ""}`}
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={currentUser.email}
      />
      {emailError && (
        <span className="modal__error-message">
          Please enter a valid email address
        </span>
      )}

      <label htmlFor="login-password-input" className="modal__label">
        Password*
      </label>
      <input
        id="login-password-input"
        name="password"
        type="password"
        className={`modal__input ${passwordError ? "modal__input_error" : ""}`}
        placeholder="Password"
        value={currentUser.password}
        required
        onChange={handleChange}
      />
      {passwordError && (
        <span className="modal__error-message">
          Password must be at least 6 characters long
        </span>
      )}
      {errorMessage && (
        <span className="modal__error-message">{errorMessage}</span>
      )}
    </ModalWithForm>
  );
}
