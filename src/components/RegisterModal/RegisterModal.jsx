import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useRef } from "react";
import "./RegisterModal.css";

export default function RegisterModal({
  onClose,
  isOpen,
  handleRegistration,
  handleModalSwitch
}) {
  const emailInputRef = useRef(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: ""
  });

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setTimeout(validateForm, 0);
  };

  const isValidEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const isValidName = (name) => {
    return name.length > 3;
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const isValidURL = (avatar) => {
    const urlRegex = /^https?:\/\/\S+$/i;
    return urlRegex.test(avatar);
  };

  const validateForm = () => {
    let formIsValid = true;

    if (!isValidEmail(data.email)) {
      setEmailError(true);
      formIsValid = false;
    } else {
      setEmailError(false);
    }

    if (!isValidPassword(data.password)) {
      setPasswordError(true);
      formIsValid = false;
    } else {
      setPasswordError(false);
    }

    if (!isValidName(data.name)) {
      setNameError(true);
      formIsValid = false;
    } else {
      setNameError(false);
    }

    if (!isValidURL(data.avatar)) {
      setAvatarError(true);
      formIsValid = false;
    } else {
      setAvatarError(false);
    }

    setIsValid(formIsValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(data);
    }
  };

  useEffect(() => {
    validateForm();
    if (isOpen) {
      emailInputRef.current?.focus();
      setData({
        email: "",
        password: "",
        name: "",
        avatar: ""
      });

      setIsValid(false);
      setServerError("");
      setEmailError(false);
      setPasswordError(false);
      setNameError(false);
      setAvatarError(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
      buttonWidthStyle={{ width: "86px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={
        <button
          type="button"
          to="login"
          className="modal__alternateAction-link"
          onClick={handleModalSwitch}
        >
          or Log In
        </button>
      }
      isValid={isValid}
    >
      <label htmlFor="signup-email-input" className="modal__label">
        Email*
      </label>
      <input
        ref={emailInputRef}
        id="signup-email-input"
        type="email"
        className={`modal__input ${emailError ? "modal__input_error" : ""}`}
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={data.email}
      />

      <label htmlFor="signup-password-input" className="modal__label">
        Password*
      </label>
      <input
        id="signup-password-input"
        name="password"
        type="password"
        className={`modal__input ${passwordError ? "modal__input_error" : ""}`}
        placeholder="Password"
        value={data.password}
        required
        onChange={handleChange}
      />
      {passwordError && (
        <span className="modal__error">
          {" "}
          Password must be at least 6 characters long
        </span>
      )}
      <label htmlFor="signup-name-input" className="modal__label">
        Name*
      </label>
      <input
        id="signup-name-input"
        name="name"
        type="text"
        className={`modal__input ${nameError ? "modal__input_error" : ""}`}
        placeholder="Name"
        required
        value={data.name}
        onChange={handleChange}
      />
      {nameError && (
        <span className="modal__error">Name must be at least 4 characters</span>
      )}
      <label htmlFor="signup-avatar-input" className="modal__label">
        Avatar URL*
      </label>
      <input
        id="signup-avatar-input"
        name="avatar"
        type="url"
        className={`modal__input ${avatarError ? "modal__input_error" : ""}`}
        placeholder="Avatar URL"
        required
        value={data.avatar}
        onChange={handleChange}
      />
      {serverError && (
        <span className="modal__error modal__error_server">{serverError}</span>
      )}
    </ModalWithForm>
  );
}
