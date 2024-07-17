import React from "react";
import Login from "../Pages/Login/Login";
import { AuthContext, AuthProvider } from "../Context/auth";
import Home from "../Pages/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Cadastro from "../Pages/Cadastro/Cadastro";
import Skill from "../Pages/Skill/Skill";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";

function Private({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Aguarde. Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/skills" element={<Skill />} />
          <Route
            path="/home"
            element={
              //<Private> DESCOMENTAR PARA ACESSAR HOME APENAS COM LOGIN
                <Home />
             //</Private>
                  }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
