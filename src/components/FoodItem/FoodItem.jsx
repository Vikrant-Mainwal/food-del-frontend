import React, { useContext} from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { addToCart, removeCartItems, cartItems } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={image?.url || image || "/fallback.png"}
          alt={name || "food"}
        />

        {!cartItems?.[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeCartItems(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            {cartItems?.[id] ?? 0}
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name || "Unnamed Food"}</p>
          <img src={assets.rating_starts} alt="" />
        </div>

        <p className="food-item-desc">
          {description || "No description available"}
        </p>

        <p className="food-item-price">
          ${price ?? 0}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
