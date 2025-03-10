import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  function handleImageClick() {
    onCardClick(item);
  }

  return (
    <li className="itemCard">
      <h2 className="itemCard-title">{item.name}</h2>
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
