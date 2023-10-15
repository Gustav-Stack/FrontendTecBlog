import React, { useState } from "react";
import axios from "axios";
import "./styles/login.css";
import { useAuth, backend } from "../AuthContext.jsx";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const { setAuthToken, login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setLoginError(true);
      return;
    }

    try {
      // Faz a requisição para autenticar o usuário usando a constante "backend"
      const response = await axios.post(`${backend}/api/login`, {
        username,
        password
      });

      // Verifica se a autenticação foi bem-sucedida
      if (response.data.token) {
        // Armazena o token no local storage ou em algum lugar apropriado
        setAuthToken(response.data.token);
        login();
        // Redireciona para a página após o login bem-sucedido
        window.location.href = "/dashboard";
      } else {
        // Trate erros de autenticação aqui, se necessário
        setLoginError(true);
      }
    } catch (error) {
      // Trate erros de requisição aqui, como erro de conexão, usando a constante "backend" se necessário
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="dark-theme">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Faça o login</h1>

        <div className="form-group">
          <label htmlFor="username">Endereço de Email</label>
          <input
            type="email"
            name="username"
            id="username"
            placeholder="seuemail@example.com"
            value={formData.username}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {loginError && (
          <div className="error-message">
            Credenciais inválidas. Tente novamente.
          </div>
        )}

        <button type="submit" className="login-button">
          Entrar
        </button>

        <p className="register-link">
          Ainda não tem uma conta? <a href="/registro">Registre-se</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
