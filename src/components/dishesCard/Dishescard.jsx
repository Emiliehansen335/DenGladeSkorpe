import React from "react";
import { Link } from "react-router-dom";
import styles from "./dishesCard.module.css";

const DishesCard = ({ dish }) => {
  if (!dish) return null;

  return (
    <Link to={`/dishes/${dish._id}`} className={styles.productCard}>
      <img className="pizza" src={dish.image} alt={dish.title} />
      <h3 className={styles.cardTitle}>{dish.title}</h3>
    </Link>
  );
};

export default DishesCard;
