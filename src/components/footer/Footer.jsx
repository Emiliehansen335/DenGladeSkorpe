import styles from "./footer.module.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <header className={styles.footer}>
      <img className="logo" src={logo} alt="Den glade skorpe logo" />
      <div className={styles.footerText}>
        <p>Email: gladskorpe@pizzaglad.dk</p>
        <p>Tlf: 12345678</p>
        <p>Adresse: Skorpevej 42, 1234 Pizzabyen</p>
      </div>
    </header>
  );
};


export default Footer;
