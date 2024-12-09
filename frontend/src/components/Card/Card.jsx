import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";  
import images from "../../assets/image";
import { StoreContext } from "../../context/StoreContext";

const Card = ({ id, name, price, description, imageUrl, category }) => {
  const { cartItems = {}, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`); 
  };

  return (
    <div className="item" onClick={handleCardClick}>
      <div className="item-image-container">
        <img className="item-image" src={`${url}/${imageUrl}`} alt={name} />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={(e) => {
              e.stopPropagation(); 
              addToCart(id);
            }}
            src={images.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="item-counter">
            <img
              onClick={(e) => {
                e.stopPropagation(); 
                removeFromCart(id);
              }}
              src={images.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={(e) => {
                e.stopPropagation(); 
                addToCart(id);
              }}
              src={images.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>

      <div className="item-info" onClick={handleCardClick}>
        <div className="item-name-rating">
          <p>{name}</p>
          <img src={images.rating_stars} alt="Rating" />
        </div>

        <p className="item-description">{description}</p>
        <p className="item-price">Rs {price}</p>
      </div>
    </div>
  );
};

export default Card;
