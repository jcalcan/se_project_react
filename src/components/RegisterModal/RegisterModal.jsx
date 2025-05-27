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

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    name: false,
    avatar: false
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validators = {
    email: (value) => value.includes("@") && value.includes("."),
    password: (value) => value.length >= 6,
    name: (value) => value.length > 3,
    avatar: (value) => /^https?:\/\/\S+$/i.test(value)
  };

  const validateForm = (formData = data) => {
    const newErrors = {};
    if (!validators.email(formData.email)) newErrors.email = "Invalid email";
    if (!validators.password(formData.password))
      newErrors.password = "Password must be at least 6 characters";
    if (!validators.name(formData.name))
      newErrors.name = "Name must be at least 4 characters";
    if (!validators.avatar(formData.avatar)) newErrors.avatar = "Invalid URL";
    setErrors(newErrors);
    setIsValid(
      Object.keys(newErrors).length === 0 &&
        Object.values(formData).every(Boolean)
    );
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setServerError("");
    validateForm(newData);
  };

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "", name: "", avatar: "" });
      setTouched({ email: false, password: false, name: false, avatar: false });
      setErrors({});
      setIsValid(false);
      setServerError("");
      emailInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(data).catch((error) => {
        setServerError(error);
        setIsValid(false);
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
        className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
        name="email"
        placeholder="Email"
        required
        onInput={handleInput}
        value={data.email}
      />

      <label htmlFor="signup-password-input" className="modal__label">
        Password*
      </label>
      <input
        id="signup-password-input"
        name="password"
        type="password"
        className={`modal__input ${
          errors.password ? "modal__input_error" : ""
        }`}
        placeholder="Password"
        value={data.password}
        required
        onInput={handleInput}
      />
      {touched.password && errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}
      <label htmlFor="signup-name-input" className="modal__label">
        Name*
      </label>
      <input
        id="signup-name-input"
        name="name"
        type="text"
        className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
        placeholder="Name"
        required
        value={data.name}
        onInput={handleInput}
      />
      {touched.name && errors.name && (
        <span className="modal__error">{errors.name}</span>
      )}
      <label htmlFor="signup-avatar-input" className="modal__label">
        Avatar URL*
      </label>
      <input
        id="signup-avatar-input"
        name="avatar"
        type="url"
        className={`modal__input ${errors.avatar ? "modal__input_error" : ""}`}
        placeholder="Avatar URL"
        required
        value={data.avatar}
        onInput={handleInput}
      />
      {serverError && (
        <span className="modal__error modal__error_server">{serverError}</span>
      )}
    </ModalWithForm>
  );
}
