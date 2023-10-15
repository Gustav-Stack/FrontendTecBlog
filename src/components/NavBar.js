import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/nav.css";
import { BiMenu } from "react-icons/bi";
import { useAuth } from "../AuthContext";
import logo from "./styles/G_logo.png";

export default function NavBar() {
  const { isLoggedIn, logout } = useAuth(); // Certifique-se de chamar a função useAuth para obter o valor correto de isLoggedIn e a função de logout.

  const [styles, setStyles] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setStyles(false); // Feche o menu após a navegação
  };

  const handleLogout = () => {
    logout(); // Chame a função de logout do seu contexto de autenticação aqui
    navigate("/"); // Redirecione o usuário para a página inicial após o logout
  };

  return (
    <>
      <div className="nav-bar">
        <h1>
          <img className="nav-logo" alt="logo" src={logo} />
          Tec
        </h1>
        <ul className={styles ? "nav-bar-item-open" : "nav-bar-item"}>
          <li onClick={() => handleNavigation("/")}>Página Inicial</li>
          <li onClick={() => handleNavigation("/about")}>Sobre Nós</li>
          <li onClick={() => handleNavigation("/contact")}>Contate-nos</li>
          <li onClick={() => handleNavigation("/editor")}>
            Editor de Postagens
          </li>

          {isLoggedIn ? (
            <>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li onClick={() => handleNavigation("/login")}>Login</li>
          )}
        </ul>
        <div className="nav-bar-buttons">
          {/* Quaisquer outros botões ou componentes que você deseja manter */}
        </div>
        <div
          onClick={() => {
            setStyles(!styles);
          }}
          className="menu-burger"
        >
          <BiMenu size={25} />
        </div>
      </div>
    </>
  );
}
