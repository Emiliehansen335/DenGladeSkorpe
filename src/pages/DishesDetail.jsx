import { useParams } from "react-router-dom";
import { useFetchDishes } from "../hooks/useFetchDishes";
import DishesDetailCard from "../components/dishesdetailCard/dishesdetailCard";

const DishesDetail = () => {
  const { id } = useParams();
  const { dishes, isLoading, error } = useFetchDishes();

  if (isLoading) return <p>Indlæser retten...</p>;
  if (error) return <p>Fejl: {error}</p>;

  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) return <p>Ingen data fundet.</p>;

  return (
    <section>
      <DishesDetailCard dish={dish} />
    </section>
  );
};

export default DishesDetail;
