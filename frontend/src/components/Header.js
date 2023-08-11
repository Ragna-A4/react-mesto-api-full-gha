import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, email, path, onClick, type, buttonName }) {
  return (
    <header className="header">
      <img className="header__logo" alt="лого_место" src={logo} />
      <div className="header__container">
        {isLoggedIn && (
          <span className="header__user-email header__user-email_loggedin">
            {email}
          </span>
        )}
        <button
          className={`header__action-button header__action-button_type_${type}`}
          type="button"
          onClick={onClick}
        >
          <Link to={path} className="link">
            {buttonName}
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;