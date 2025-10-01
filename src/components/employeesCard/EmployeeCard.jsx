import React from "react";
import { Link } from "react-router-dom";
import styles from "./employeeCard.module.css";

const EmployeeCard = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className={styles.employeeCard}>
      <img className="employee" src={employee.image} alt={employee.title} />
      <h3>{employee.name}</h3>
      <h3>{employee.position}</h3>
    </div>
  );
};

export default EmployeeCard;
