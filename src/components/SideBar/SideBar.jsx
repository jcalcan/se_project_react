import { useContext, useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./SideBar.css";
import AppContext from "../../contexts/AppContext";

function SideBar() {
  const { currentUser, handleLogout } = useContext(AppContext);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  return (
    <div className="sidebar__profile">
      <div className="sidebar__profile-info">
        <div className="sidebar__avatar">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="sidebar__avatar-image"
            />
          ) : currentUser.username?.trim() ? (
            currentUser.username[0].toUpperCase()
          ) : (
            ""
          )}
        </div>
        <p className="sidebar__username">
          {currentUser.username?.trim() || "Guest"}
        </p>
      </div>
      <div className="sidebar__profile-actions">
        <button
          className="sidebar__profile-actions-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__profile-actions-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      {isEditProfileModalOpen && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
    </div>
  );
}

export default SideBar;
