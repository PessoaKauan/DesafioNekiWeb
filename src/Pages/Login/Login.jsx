import { Navigate } from "react-router-dom";
import LoginForm from "../../Components/LoginForms";
import "./styles.css";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { AuthContext } from "../../Context/auth";
import Logo from "../../assets/logo.png";

//Utilizando o useState para definir as caracteristicas , como o lembrar e visualização de senha
const Login = ({ setIsLoggedIn }) => {
  const { login, errorLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMensagem, setErrorMensagem] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCadastro = () => {
    window.location.href = "/cadastro";
  }; // Redirecionando para a página de cadastro 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }; // Esconde ou mostra senha

  const handleRememberMeChange = (e) => {
    setRememberPassword(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }; // Função para salvar senha e email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
    }
    if (rememberedPassword) {
      setPassword(rememberedPassword);
    }
  }, []);

  const botaoCadastro = () => {
    window.location.href = "/cadastro";
  };

  const erro = {
    email: "Email ou senha inválido",
    password: "Email ou senha inválidas",
    noEmail: "Por favor coloque o email",
    noPassword: "Por favor coloque a senha",
    noResponse: "Login mal sucedido",
  }; // Mensagens de erros pré definidas 
  const errorMSG = (name) => {
    return (
      errorMensagem &&
      name === errorMensagem.name && (
        <p className="erro">{errorMensagem.message}</p>
      )
    );
  }; // Fornece a mensagem de erro correta para o erro ocorrido
  const validateInput = (email, password) => {
    setErrorMensagem(null);
    if (!email) {
      setErrorMensagem({ name: "noEmail", message: erro.noEmail });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    if (!password) {
      setErrorMensagem({ name: "noPassword", message: erro.noPassword });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    return true;
  }; // Validação de login

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMensagem(null);
    if (validateInput(email, password)) {
      try {
        setLoading(true);
        const response = await login(email, password);
        setTimeout(() => {
          setLoading(false);
          if (!response) {
            setErrorMensagem({ name: "noResponse", message: erro.noResponse });
          } else {
            window.location.href = "/home";
          }
        }, 3000);
      } catch (error) {
        setErrorMensagem({
          name: "loginError",
          message: "E-mail ou senha incorreto",
        });
        setTimeout(() => {
          setErrorMensagem(null);
        }, 3000);
        setLoading(false);
      }
    }
  };

  return (
    <LoginForm>
      <img className="login" src={Logo} alt="Logo Neki" />
      <form onSubmit={handleLogin}>
        <div className="input_container">
          <div className="containerdoemail">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorMSG("email")}
          {errorMSG("noEmail")}
          <div className="containerdasenha">
            <input
              className="inputloginsenha"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              autoComplete={
                rememberPassword ? "current-password" : "new-password"
              }
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye size={24} onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={24} onClick={togglePasswordVisibility} />
            )}
          </div>
          {errorMSG("password")}
          {errorMSG("noPassword")}
        </div>
        {errorMSG("invalidCredentials")}
        {errorMSG("loginError")}
        <label className="checkbox">
          <span className="remember">Lembrar de mim</span>
          <input
            type="checkbox"
            checked={rememberPassword}
            onChange={handleRememberMeChange}
          />
        </label>
        <input
          type="submit"
          value="Login"
          className="login_butao"
          onClick={handleLogin}
        />
      </form>
      <div className="containercadastro">
        <div>
          <button onClick={handleCadastro} className="Cadastro">
            Cadastrar
          </button>
        </div>
      </div>
    </LoginForm>
  );
};

export default Login;
