import { useFetchEmployeesTools } from "../../hooks/useFetchEmployeesTools";
import styles from "./EmployeeList.module.css";

const EmployeeList = ({ onEdit, onCreateNew }) => {
  const { employees, deleteEmployee, isLoading, error } =
    useFetchEmployeesTools();

  const handleDelete = async (id) => {
    if (window.confirm("Er du sikker på at du vil slette denne medarbejder?")) {
      try {
        await deleteEmployee(id);
        console.log("Medarbejder slettet");
      } catch (error) {
        console.error("Fejl ved sletning:", error);
      }
    }
  };

  const handleEditClick = (employee) => {
    console.log("Employee to edit:", employee); // Debug log
    if (onEdit) {
      onEdit(employee);
    } else {
      console.error("onEdit prop is missing!");
    }
  };

  if (isLoading) return <p>Indlæser medarbejdere...</p>;
  if (error) return <p>Fejl: {error}</p>;

  return (
    <div className={styles.employeeList}>

      {employees.length === 0 ? (
        <p>Ingen medarbejdere fundet.</p>
      ) : (
        <div className={styles.grid}>
          {employees.map((employee) => (
            <div key={employee._id} className={styles.employeeCard}>
              <img
                src={employee.image}
                alt={employee.name}
                className={styles.employeeImage}
              />
              <h3>{employee.name}</h3>
              <p>{employee.position}</p>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditClick(employee)}
                >
                  Rediger
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(employee._id)}
                >
                  Slet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
