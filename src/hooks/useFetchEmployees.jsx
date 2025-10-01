import { useEffect, useState } from "react";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get all employees
  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/employees");
      const data = await response.json();
      setEmployees(data.data || []);
      console.log("Fetched employees:", data);
    } catch (error) {
      setError("Der skete en fejl: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    error,
    isLoading,
  };
};

export { useFetchEmployees };
