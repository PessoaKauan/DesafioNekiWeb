import React, { useContext } from 'react'
import "./styles.css"
import { AuthContext } from '../../Context/auth'
const BotaoLogout = () => {

    const {logout} = useContext(AuthContext)
    function handleLogout(){
        logout();
    }
  return (
    <button className='Sair' onClick={handleLogout}>Sair</button>
  )
}

export default BotaoLogout