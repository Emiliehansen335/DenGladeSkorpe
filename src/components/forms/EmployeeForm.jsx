// EMPLOYEEFORM
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchEmployeesTools } from "../../hooks/useFetchEmployeesTools";
import styles from "./EmployeeForm.module.css";

const EmployeeForm = ({ isEditMode, selectedEmployee, onCancel }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { createEmployee, isLoading, updateEmployee, refetch } =
    useFetchEmployeesTools();

  // Hent employee hvis editMode er true
  useEffect(() => {
    if (isEditMode && selectedEmployee) {
      setName(selectedEmployee.name || "");
      setPosition(selectedEmployee.position || "");
      setImage(selectedEmployee.image || null);
    } else {
      // Reset form for new employee
      setName("");
      setPosition("");
      setImage(null);
      setSelectedFile(null);
    }
  }, [isEditMode, selectedEmployee]);

  // Forhåndsvis billede
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objUrl = window.URL.createObjectURL(file);
      setImage(objUrl);
    }
  };

  const handleSubmitEmployee = async (event) => {
    event.preventDefault();

    const employeeData = new FormData();
    employeeData.append("name", name);
    employeeData.append("position", position);

    // Tilføj billedet hvis det er valgt
    if (selectedFile) {
      employeeData.append("file", selectedFile);
    }

    try {
      let response;
      if (isEditMode && selectedEmployee) {
        employeeData.append("id", selectedEmployee._id);
        response = await updateEmployee(employeeData);
      } else {
        response = await createEmployee(employeeData);
      }

      if (response) {
        await refetch();
        onCancel(); // Reset form
      }
    } catch (error) {
      console.error("Fejl ved håndtering af medarbejder:", error);
    }
  };

  return (
    <form onSubmit={handleSubmitEmployee} className={styles.form}>
      <h2>{isEditMode ? "Opdater medarbejder" : "Tilføj medarbejder"}</h2>
      <div>
        <label htmlFor="name">Navn:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="position">Stilling:</label>
        <input
          id="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="image">Vælg billede (valgfrit):</label>
        {image && (
          <img className={styles.previewImage} src={image} alt="Preview" />
        )}
        <input id="image" type="file" onChange={handleImageChange} />
      </div>

      <button type="submit">
        {isEditMode ? "Opdater medarbejder" : "Tilføj medarbejder"}
      </button>
    </form>
  );
};

export default EmployeeForm;
