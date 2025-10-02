import React, { useState } from "react";
import { useFetchDishes } from "../../hooks/useFetchDishes";
import DishesCard from "../dishesCard/Dishescard";
import styles from "../dishesCard/dishesCard.module.css";
import catBtnStyles from "./categoryButtons.module.css";

const Dishes = () => {
  const { dishes, isLoading, error } = useFetchDishes();
  // Start med første kategori som valgt, hvis der er nogen
  const categoryMap = {};
  dishes.forEach((dish) => {
    if (dish.category && !categoryMap[dish.category]) {
      categoryMap[dish.category] = dish.image;
    }
  });

  const categories = Object.keys(categoryMap);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Funktion til at få op til 3 retter fra hver kategori
  const getFirstThreePerCategory = (dishes) => {
    const grouped = {};
    dishes.forEach((dish) => {
      if (!grouped[dish.category]) grouped[dish.category] = [];
      if (grouped[dish.category].length < 3) grouped[dish.category].push(dish);
    });
    // Flad arrayen ud til ét array med alle de valgte retter
    return Object.values(grouped).flat();
  };

  // Filtrer dishes efter valgt kategori
  const filteredDishes = !selectedCategory
    ? getFirstThreePerCategory(dishes)
    : dishes.filter((dish) => dish.category === selectedCategory);

  if (isLoading) return <p>Indlæser...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h3 className={styles.kategori}>Vælg Kategori</h3>
      <div className={catBtnStyles.categoryButtons}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={
              selectedCategory === cat
                ? `${catBtnStyles.categoryButton} ${catBtnStyles.selected}`
                : catBtnStyles.categoryButton
            }
          >
            {categoryMap[cat] && (
              <img
                src={categoryMap[cat]}
                alt={cat}
                style={{
                  width: 94,
                  height: 94,
                  objectFit: "cover",
                }}
              />
            )}
            <a
              href="#"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "20px",
                fontFamily: "Just Another Hand, cursive",
                textAlign: "center",
                textShadow:
                  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                pointerEvents: "none",
                padding: "4px 12px",
                borderRadius: "6px",
                width: "max-content",
                maxWidth: "90%",
                zIndex: 2,
                textDecoration: "none",
              }}
              tabIndex={-1}
            >
              {cat}
            </a>
          </button>
        ))}
      </div>
      <div className={styles.container}>
        {Array.isArray(filteredDishes) && filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <DishesCard key={dish._id || dish.id} dish={dish} />
          ))
        ) : (
          <p>Ingen pizzaer fundet.</p>
        )}
      </div>
    </>
  );
};

export default Dishes;
