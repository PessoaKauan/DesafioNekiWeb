import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../Services/api";

// Criação do contexto de autenticação
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  
  // Estados para armazenar informações de usuário, estado de carregamento e erro de login
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState(null);

  // useEffect para recuperar informações de autenticação do localStorage ao iniciar
  useEffect(() => {
    const recoverToken = async () => {
      try {
        // Recupera dados do usuário, token e ID do usuário do localStorage
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const loggedUserId = localStorage.getItem("loggedUserId");

        // Se existir usuário e token, atualiza o estado 'user' e configura o token na api
        if (loggedUser && token) {
          setUser({ ...loggedUser, loggedUserId });
          api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        // Marca o carregamento como concluído
        setLoading(false);
      } catch (error) {
        console.error("Error recovering token:", error);
        setLoading(false);
      }
    };

    // Chama a função para recuperar o token ao montar o componente (array de dependências vazio)
    recoverToken();
  }, []);

  // useEffect para atualizar localStorage sempre que o estado 'user' mudar
  useEffect(() => {
    if (user) {
      // Armazena informações do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Remove 'user' do localStorage se 'user' for nulo (logout)
      localStorage.removeItem("user");
    }
  }, [user]);

  // Função de login
  const login = async (email, password) => {
    try {
      // Chama a função de criação de sessão com email e senha
      const response = await createSession(email, password);
      const token = response.data.accessToken;

      // Cria objeto com informações do usuário logado
      const loggedUser = {
        email: response.data.email,
        accessToken: token,
        loggedUserId: response.data.loggedUserId,
      };

      // Armazena token e ID do usuário no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedUserId", response.data.loggedUserId);

      // Configura o token nos cabeçalhos padrão da api
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Atualiza estado 'user', navega para a página inicial e limpa mensagem de erro de login
      setUser(loggedUser);
      navigate("/home");
      setErrorLogin("");
    } catch (error) {
      // Em caso de erro, trata a mensagem de erro de login
      const errorMessage = tratarErroLogin(error);
      setErrorLogin(errorMessage);
    }
  };

  // Função de logout
  const logout = () => {
    // Remove token e ID do usuário do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUserId");

    // Remove token dos cabeçalhos padrão da api, reseta estado 'user' e navega para página inicial
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/");
  };

  // Retorna o contexto Provider com valores relevantes para autenticação
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user, // Indica se há um usuário autenticado
        user, // Informações do usuário logado
        loading, // Estado de carregamento (true enquanto carrega, false quando concluído)
        errorLogin, // Mensagem de erro de login, se houver
        login, // Função para login
        logout, // Função para logout
      }}
    >
      {children} {/* Renderiza os componentes filhos dentro do contexto de autenticação */}
    </AuthContext.Provider>
  );
}
