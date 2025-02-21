import "./ItemCard.css";

function ItemCard({ item }) {
  function handleCardClick() {}

  return (
    <li className="itemCard">
      <h2 className="itemCard-title">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="itemCard-img"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
