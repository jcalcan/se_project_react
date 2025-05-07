import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const { isLoggedIn, currentUser } = useContext(AppContext);

  function handleLike() {
    handleCardLike({
      id: item._id,
      isLiked: item.likes.some((id) => id === currentUser._id)
    });
  }

  function handleImageClick() {
    onCardClick(item);
  }

  return (
    <li className="itemCard">
      <div className="itemCard__title-heart-container">
        <h2 className="itemCard-title">{item.name}</h2>
        {isLoggedIn && currentUser && (
          <button
            type="button"
            className={`itemCard-title-heart-btn ${
              item.likes.some((id) => id === currentUser._id)
                ? "itemCard-title-heart-btn-liked"
                : ""
            }`}
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleImageClick}
        className="itemCard-img"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
