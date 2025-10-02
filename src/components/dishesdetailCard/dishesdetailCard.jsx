import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./dishesdetailCard.module.css";

const DishesDetailCard = ({ dish }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    if (dish) {
      const sizes =
        dish.price && typeof dish.price === "object"
          ? Object.keys(dish.price)
          : [];
      setSelectedSize(sizes[0] || "");
    }
  }, [dish]);

  const handleAddToCart = () => {
    if (!dish || !selectedSize) return;

    const item = {
      id: dish._id,
      title: dish.title,
      image: dish.image,
      size: selectedSize,
      price: dish.price[selectedSize],
    };
    addToCart(item);
  };

  const handleChange = (e) => setSelectedSize(e.target.value);

  if (!dish) return <p>Ingen ret data</p>;

  const sizes =
    dish.price && typeof dish.price === "object" ? Object.keys(dish.price) : [];

  return (
    <div className={styles.productdetailCard}>
      <div className={styles.imgcontainer}>
        <img src={dish.image} alt={dish.title} />
      </div>

      <h2 className={styles.cardTitle}>{dish.title}</h2>

      <div className={styles.ingredientsSection}>
        <h3>Ingredienser</h3>
        <ul className={styles.ingredients}>
          {Array.isArray(dish.ingredients) && dish.ingredients.length > 0 ? (
            dish.ingredients.map((ingredient, idx) => (
              <li key={idx}>
                {typeof ingredient === "object"
                  ? JSON.stringify(ingredient)
                  : ingredient}
              </li>
            ))
          ) : (
            <li>Ingen ingredienser tilgængelige</li>
          )}
        </ul>
      </div>

      <section className={styles.section}>
        <h1>Vælg Størrelse</h1>
        <select value={selectedSize} onChange={handleChange}>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </option>
          ))}
        </select>
      </section>

      <section className={styles.section}>
        <h1>Pris</h1>
        <p className={styles.price}>
          {selectedSize && dish.price[selectedSize]
            ? `${dish.price[selectedSize]} kr`
            : "Vælg en størrelse"}
        </p>
      </section>

      <button className={styles.addButton} onClick={handleAddToCart}>
        Tilføj {dish.title} til kurven
      </button>
    </div>
  );
};

export default DishesDetailCard;
