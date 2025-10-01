import { useState } from "react";
import EmployeeForm from "../components/forms/EmployeeForm";
import EmployeeList from "../components/forms/EmployeeList";
import styles from "./Backoffice.module.css";

const Backoffice = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
  };

  const handleCreateNew = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
  };

  return (
    <div className={styles.backoffice}>
      <h1>Medarbejdere</h1>
      <div className={styles.container}>
        <div className={styles.listSection}>
          <EmployeeList
            onEdit={handleEditEmployee}
            onCreateNew={handleCreateNew}
          />
        </div>
        <div className={styles.formSection}>
          <EmployeeForm
            isEditMode={isEditMode}
            selectedEmployee={selectedEmployee}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Backoffice;
