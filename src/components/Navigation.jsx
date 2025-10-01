import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import headerImg from "../assets/headerImg.png";
import billede from "../assets/basket_icon.png";
import logo from "../assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`navbar ${isOpen ? "open" : ""}`}
      style={{
        backgroundImage: `url(${headerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay">
        <h3>Den</h3>
        <h1>Glade</h1>
        <h2>Skorpe</h2>
      </div>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Link to="/">
        <img className="logo2" src={billede} alt="logo" />
      </Link>
      <div className="burger-menu" onClick={toggleMenu}>
        {isOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink to="/">FORSIDE</NavLink>
        </li>
        <li>
          <NavLink to="./Personalet">PERSONALET</NavLink>
        </li>
        <li>
          <NavLink to="./Kontakt">KONTAKT</NavLink>
        </li>
        <li>
          <NavLink to="./Kurv">KURV</NavLink>
        </li>
        <li>
          <NavLink to="./backoffice">
            BACKOFFICE
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
