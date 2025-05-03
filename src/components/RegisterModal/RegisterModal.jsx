import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./RegisterModal.css";

export default function RegisterModal({ onClose, isOpen, handleRegistration }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setServerError("");
    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    setAvatarError(false);

    let hasErrors = false;

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

    if (!isValidEmail(data.email)) {
      setEmailError(true);
      hasErrors = true;
    }
    if (!isValidName(data.name)) {
      setNameError(true);
      hasErrors = true;
    }
    if (!isValidPassword(data.password)) {
      setPasswordError(true);
      hasErrors = true;
    }
    if (!isValidURL(data.avatar)) {
      setAvatarError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      console.log("Registration data:", data);
      handleRegistration({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar
      })
        .then(() => {
          console.log("Registration successful");
          onClose();
        })
        .catch((error) => {
          setServerError(error);
        });
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
      buttonWidthStyle={{ width: "86px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={
        <Link to="login" className="modal__login-link">
          or Log In
        </Link>
      }
    >
      <label htmlFor="signup-email-input" className="modal__label">
        Email*
      </label>
      <input
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
