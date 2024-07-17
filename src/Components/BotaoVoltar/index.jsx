import React from 'react'
import { TfiBackLeft } from "react-icons/tfi"; 
import "./styles.css"   
const BotaoVoltar = () => {
    function goBack(){
        window.history.back()
    }

  return (
    <button className='Voltar' onClick={goBack}>
        <TfiBackLeft />
    </button>
  )
}

export default BotaoVoltar