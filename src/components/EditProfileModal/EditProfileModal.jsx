import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./EditProfileModal.css";

export default function EditProfileModal({ onClose, isOpen }) {
  const { currentUser, handleUpdateProfile } = useContext(AppContext);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    username: "",
    avatar: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUserInfo((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
      setCurrentUserInfo({
        username: currentUser.username,
        avatar: currentUser.avatar
      });
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
    >
      <label htmlFor="change-name-input" className="modal__label">
        Name*
      </label>
      <input
        id="change-name-input"
        type="text"
        className={`modal__input`}
        name="username"
        placeholder={currentUserInfo.username}
        required
        onChange={handleChange}
        value={currentUserInfo.username}
      />

      <label htmlFor="change-avatar-input" className="modal__label">
        Avatar URL*
      </label>
      <input
        id="change-avatar-input"
        name="avatar"
        type="url"
        className={`modal__input`}
        placeholder={currentUserInfo.avatar}
        value={currentUserInfo.avatar}
        required
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}
