import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./dishesdetailCard.module.css";

const DishesDetailCard = ({ dish }) => {
  if (!dish) return null;

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Få alle størrelser fra price-objektet
  const sizes =
    dish.price && typeof dish.price === "object" ? Object.keys(dish.price) : [];
  // Sæt første størrelse som default valgt
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");

  const handleChange = (e) => setSelectedSize(e.target.value);

  const handleAddToCart = () => {
    const item = {
      id: dish.id,
      title: dish.title,
      image: dish.image,
      size: selectedSize,
      price: dish.price[selectedSize], // kun prisen for valgt størrelse
      // tilføj evt. flere felter hvis nødvendigt
    };
    addToCart(item);
    navigate("/kurv");
  };

  return (
    <div className={styles.productdetailCard}>
      <div className={styles.imgcontainer}>
        <img className={styles.pizza} src={dish.image} alt={dish.title} />
      </div>
      <section className={styles.ingredientsSection}>
        <h2 className={styles.cardTitle}>{dish.title}</h2>
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
            <li>Ingen ingredienser</li>
          )}
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Vælg Størrelse</h3>
        <select
          className={styles.options}
          value={selectedSize}
          onChange={handleChange}
        >
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
            ? `${dish.price[selectedSize]}, -`
            : "Ingen pris"}
        </p>
      </section>

      <button className={styles.addButton} onClick={handleAddToCart}>
        Tilføj {dish.title} til kurven
      </button>
    </div>
  );
};

export default DishesDetailCard;
