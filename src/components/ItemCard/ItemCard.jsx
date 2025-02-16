import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <h2 className="itemCard-title">{item.name}</h2>
      <img className="itemCard-img" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
