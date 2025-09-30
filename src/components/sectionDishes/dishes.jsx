import { useFetchDishes } from "../../hooks/useFetchDishes";
import DishesCard from "../dishesCard/Dishescard";
import styles from "../dishesCard/dishesCard.module.css";

const Dishes = () => {
  const { dishes, isLoading, error } = useFetchDishes();

  console.log("Dishes component dishes:", dishes);

  if (isLoading) return <p>Indlæser...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {Array.isArray(dishes) && dishes.length > 0 ? (
        dishes.map((dish) => <DishesCard key={dish.id} dish={dish} />)
      ) : (
        <p>Ingen pizzaer fundet.</p>
      )}
    </div>
  );
};

export default Dishes;
