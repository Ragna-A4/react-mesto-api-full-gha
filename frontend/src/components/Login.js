import { useState} from "react";
import Header from "./Header";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(formValue.email, formValue.password);
  };

  return (
    <>
      <Header
        isLoggedIn={false}
        email=""
        type="auth"
        path="/sign-up"
        buttonName="Регистрация"
      />
      <div className="popup__container popup__container_theme_dark">
        <form className="popup__form" onSubmit={handleSubmit}>
          <h3 className="popup__title popup__title_theme_bright">Вход</h3>

          <input
            id="email"
            name="email"
            required
            minLength="2"
            maxLength="40"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="popup__item popup__item_theme_bright"
            onChange={handleChange}
            value={formValue.email}
          />

          <input
            id="password"
            name="password"
            required
            minLength="2"
            maxLength="20"
            type="password"
            autoComplete="current-password"
            placeholder="Пароль"
            className="popup__item popup__item_theme_bright"
            onChange={handleChange}
            value={formValue.password}
          />

          <button
            className="popup__save-button popup__save-button_theme_bright buttons-hover buttons-hover_type_save"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
