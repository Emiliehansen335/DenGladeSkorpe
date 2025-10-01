import { useCallback, useEffect, useState } from "react";

const useFetchEmployeesTools = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // HENT ALLE MEDARBEJDERE – memoiseret med useCallback, så referencen forbliver stabil (dvs at den ikke bliver genoprettet ved hver render)
  const fetchEmployees = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/employees");
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refetch-funktion, der blot kalder fetchEmployees
  const refetch = useCallback(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // OPRET MEDARBEJDER
  const createEmployee = async (formData) => {
    try {
      const response = await fetch("http://localhost:3042/employee", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Fejl ved oprettelse af medarbejder");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      throw error;
    }
  };

  // OPDATER MEDARBEJDER
  const updateEmployee = async (formData) => {
    try {
      const response = await fetch("http://localhost:3042/employee", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Fejl ved opdatering af medarbejder");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      throw error;
    }
  };

  // SLET MEDARBEJDER
  const deleteEmployee = async (params) => {
    await fetch(`http://localhost:3042/employee/${params}`, {
      method: "DELETE",
    });

    /* Filter all the employees without the matching ID. */
    const filteredArray = employees.filter((emp) => emp._id !== params);

    setEmployees(filteredArray);
  };

  // HENT MEDARBEJDER BASERET PÅ ID
  const fetchEmployeeById = async (id) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3042/employee/${id}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch employee: ${errorText}`);
      }

      const employee = await response.json();
      return employee.data[0];
    } catch (error) {
      setError(error.message);
      console.error("Error fetching employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    createEmployee,
    deleteEmployee,
    setEmployees,
    fetchEmployees,
    fetchEmployeeById,
    updateEmployee,
    isLoading,
    refetch,
    error,
  };
};

export { useFetchEmployeesTools };
