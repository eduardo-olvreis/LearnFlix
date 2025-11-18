import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./Header.module.css";

export default function Header({ name, user, navLinks = [] }) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <header className={style.container}>
      <div className={style.info}>
        <h2>
          Olá, <span>{name}!</span>
        </h2>
        <h3>{user}</h3>
      </div>
      <div className={style.botaoMenu}>
        <button onClick={handleClick}>
          <img
            src="../src/assets/images/menu-icon.svg"
            alt="Icone do menu lateral"
          />
        </button>
      </div>

      <div className={`${style.menu} ${visible ? style.visible : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.path} onClick={handleClick}>
              <Link className={style.item} to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
