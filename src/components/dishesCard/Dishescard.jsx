import React from "react";
import { Link } from "react-router-dom";
import styles from "./dishesCard.module.css";

const DishesCard = ({ dish }) => {
  console.log("dish:", dish); // Se præcis hvad du får fra API'et

  if (!dish) return null;

  return (
    <div className={styles.productCard}>
      <img className="pizza" src={dish.image} alt={dish.title} />
      <h3>{dish.title}</h3>
    </div>
  );
};

export default DishesCard;
