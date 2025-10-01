import styles from "./footer.module.css";

const Footer = () => {
  return (
    <header className={styles.footer}>
      <img src="src\assets\logo.png" alt="logo" />
      <div className={styles.footerText}>
        <p>Email: gladskorpe@pizzaglad.dk</p>
        <p>Tlf: 12345678</p>
        <p>Adresse: Skorpevej 42, 1234 Pizzabyen</p>
      </div>
    </header>
  );
};


export default Footer;
