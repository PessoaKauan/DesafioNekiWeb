import React from "react";
import { useState } from "react";
import CadastroForm from "../../Components/CadastroForms";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { create } from "../../Services/api";
import "./styles.css";
import BotaoVoltar from "../../Components/BotaoVoltar";
import Logo from "../../assets/logo.png";
const Cadastro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMensagem, setErrorMensagem] = useState({});
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const erro = {
    email: "E-mail inválido",
    password: "Senha inválida",
    noEmail: "Por favor insira um e-mail",
    noPassword: "Por favor insira uma senha",
    noEqual: "As senhas devem ser iguais",
  };

  const errorMsg = (name) => {
    return (
      errorMensagem &&
      name === errorMensagem.name && (
        <p className="erroCadastro">{errorMensagem.message}</p>
      )
    );
  };

  const validadeInput = (email, password, confirmarPassword) => {
    setErrorMensagem(null);
    if (!email) {
      setErrorMensagem({ name: "noEmail", message: erro.noEmail });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    if (password !== confirmarPassword) {
      setErrorMensagem({ name: "noEqual", message: erro.noEqual });
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
    if (!confirmarPassword) {
      setErrorMensagem({ name: "noPassword", message: erro.noPassword });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    return true;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMensagem(null);
    if (validadeInput(email, password, confirmarPassword)) {
      try {
        const response = await create(email, password);
        if (response) {
          setCadastroSucesso(true);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          console.log("Erro no cadastro: ", response.error);
        }
        return;
      } catch (error) {
        setErrorMensagem({
          name: "cadastroError",
          message: "Verifique as credencias e tente novamente!",
        });
        setTimeout(() => {
          setErrorMensagem(null);
        }, 2000);
      }
    }
  };
  return (
    <CadastroForm>
      <BotaoVoltar />
      <img className="login" src={Logo} alt="Logo skill" />
            {cadastroSucesso && (
        <p className="mensagemSucesso">O cadastro foi concluído com sucesso!</p>
      )}
      <form onSubmit={handleRegister}>
        <div className="input_container">
          <input
            type="email"
            placeholder="Exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {errorMsg("noEmail")}
          <div className="containerdasenhaCadastro">
            <input
              className="inputsenhaCadastro"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            {showPassword ? (
              <FiEye size={20} onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={20} onClick={togglePasswordVisibility} />
            )}
            {errorMsg("noPassword")}
            <input
              className="inputsenha"
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye size={20} onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={20} onClick={togglePasswordVisibility} />
            )}
            {errorMsg("noEqual")}
          </div>
          <div>
            <button onClick={handleRegister} className="Cadastro">
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </CadastroForm>
  );
};

export default Cadastro;
