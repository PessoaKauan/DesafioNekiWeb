import React from "react";
import "./styles.css"
import Logo from "../../assets/logo.png";
import BotaoLogout from "../BotaoLogout";
const Header = () => {
    return (
        <header className="header">
            <img className="logodoheader" src={Logo} alt="Logo Neki" />
            <h1 className="Titulo">Neki Skills</h1>
            <BotaoLogout />
        </header>
    )
}

export default Header;