import { useEffect, useState } from "react";

const useFetchDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get all products
  const fetchDishes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/dishes");
      const data = await response.json();
      console.log("API response:", data); 
      setDishes(data.data || []);
    } catch (error) {
      setError("Der skete en fejl: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);


  return {
    dishes,
    error,
    isLoading,
  };
};

export { useFetchDishes };
