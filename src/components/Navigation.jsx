import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import headerImg from "../assets/headerImg.png";

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
        <h1>Den</h1>
        <h2>Glade</h2>
        <h3>Skorpe</h3>
      </div>
      <Link to="/">
        <img src="src\assets\logo.png" alt="logo" />
      </Link>
      <Link to="/">
        <img className="logo2" src="src\assets\basket_icon.png" alt="logo" />
      </Link>
      <div className="burger-menu" onClick={toggleMenu}>
        {isOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink to="/">FORSIDE</NavLink>
        </li>
        <li>
          <NavLink to="./Blog">BLOG</NavLink>
        </li>
        <li>
          <NavLink to="./Faq">FAQ</NavLink>
        </li>
        <li>
          <NavLink to="./Contact">KONTAKT</NavLink>
        </li>
        <li>
          <NavLink to="./Backoffice">BACKOFFICE</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
