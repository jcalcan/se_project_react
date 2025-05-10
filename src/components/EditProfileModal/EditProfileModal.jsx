import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./EditProfileModal.css";

export default function EditProfileModal({ onClose, isOpen }) {
  const [isValid, setIsValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { currentUser, handleUpdateProfile, handleValidation } =
    useContext(AppContext);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    name: null,
    avatar: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUserInfo((prevData) => {
      const newData = {
        ...prevData,
        [name]: value
      };
      const validationResult = handleValidation(newData);
      if (validationResult === true) {
        setIsValid(true);
        setValidationErrors({});
      } else {
        setIsValid(false);
        setValidationErrors(validationResult);
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateProfile(currentUserInfo);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.username && currentUser?.avatar) {
      const newUserInfo = {
        name: currentUser.username,
        avatar: currentUser.avatar
      };
      setCurrentUserInfo(newUserInfo);

      const validationResult = handleValidation(newUserInfo);
      if (validationResult === true) {
        setIsValid(true);
        setValidationErrors({});
      } else {
        setIsValid(false);
        setValidationErrors(validationResult);
      }
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save Changes"
      buttonWidthStyle={{ width: "128px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="change-name-input" className="modal__label">
        Name*
      </label>
      <input
        id="change-name-input"
        type="text"
        className={`modal__input`}
        name="name"
        // placeholder={currentUserInfo.username}
        required
        onChange={handleChange}
        value={currentUserInfo.name || ""}
      />
      {validationErrors.name && (
        <span className="modal__input_error">{validationErrors.name}</span>
      )}
      <label htmlFor="change-avatar-input" className="modal__label">
        Avatar URL*
      </label>
      <input
        id="change-avatar-input"
        name="avatar"
        type="url"
        className={`modal__input`}
        // placeholder={currentUserInfo.avatar}
        value={currentUserInfo.avatar || ""}
        required
        onChange={handleChange}
      />
      {validationErrors.avatar && (
        <span className="modal__input_error">{validationErrors.avatar}</span>
      )}
    </ModalWithForm>
  );
}
