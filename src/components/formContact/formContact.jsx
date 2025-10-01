import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useFetchContact } from "../../hooks/useFetchContact";
import styles from "./formContact.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { createContact } = useFetchContact();

  const handleSubmitContact = async (event) => {
    event.preventDefault();

    try {
      //kalder på createContact for at sende info videre
      let response = await createContact({ name, subject, description });
      console.log("Tilmelding succesfuld:", response);
      setShowModal(true);
    } catch (error) {
      console.error("Fejl ved tilmelding:", error);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmitContact} className={styles.form}>
          {/* Navn */}
          <div className={styles.inputGroup}>
            <label htmlFor="">Navn</label>
            <input
              id="name"
              type="text"
              value={name}
              /* opdatere mit state */
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Emne */}
          <div className={styles.inputGroup}>
            <label htmlFor="">Emne</label>
            <input
              id="subject"
              type="text"
              value={subject}
              /* opdatere mit state */
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Beskrivelse */}
          <div className={styles.inputGroup}>
            <label htmlFor="">Beskrivelse</label>
            <textarea
              id="description"
              value={description}
              /* opdatere mit state */
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button className={styles.submitbtn} type="submit">
            Send 
          </button>
        </form>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Tak for din besked, {name}!</h2>
              <p>Vi vender tilbage hurtigst muligt.</p>
              <button
                onClick={() => setShowModal(false)}
                className={styles.modalButton}
              >
                Luk
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactForm;
