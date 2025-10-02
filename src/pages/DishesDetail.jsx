import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DishesDetailCard from "../components/dishesdetailCard/dishesdetailCard";

const DishesDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        console.log("Fetching dish with ID:", id);
        setIsLoading(true);
        const response = await fetch(`http://localhost:3042/dish/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data.data) {
          setDish(data.data);
        } else if (data) {
          setDish(data);
        } else {
          throw new Error("No dish data found");
        }
      } catch (error) {
        console.error("Error fetching dish:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDish();
    }
  }, [id]);

  if (isLoading) return <p>Indlæser ret...</p>;
  if (error) return <p>Fejl: {error}</p>;
  if (!dish) return <p>Ingen ret fundet</p>;

  return (
    <div>
      <DishesDetailCard dish={dish} />
    </div>
  );
};

export default DishesDetail;
