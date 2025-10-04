import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import EmployeeCard from "../employeesCard/EmployeeCard";
import styles from "../employeesCard/employeeCard.module.css";

const Employees = () => {
  const { employees, isLoading, error } = useFetchEmployees();

  console.log("Employees component employees:", employees);

  if (isLoading) return <p>Indlæser...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className={styles.employeecontainer}>
        <h1>Personalet hos Den Glade Skorpe</h1>
        <p>
          Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der
          altid går den ekstra mil for at sikre, at kunderne får den bedste
          oplevelse. Teamet består af erfarne pizzabagere, der med passion
          tilbereder lækre pizzaer med friske råvarer.
        </p>
      </div>
      <div className={styles.sectionEmployee}>
        {Array.isArray(employees) && employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))
        ) : (
          <p>Ingen medarbejdere fundet.</p>
        )}
      </div>
    </>
  );
};

export default Employees;
