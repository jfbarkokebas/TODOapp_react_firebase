import { useState } from "react"

import "./Home.css"

const Home = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil</span>
      <form className="form">
        <input 
        type="email" 
        placeholder="Digite seu e-mail."
        value={email}
        onChange={e=>setEmail(e.target.value)}
         />
         <input 
         autoComplete={false}
        type="password" 
        placeholder="Digite sua senha."
        value={password}
        onChange={e=>setPassword(e.target.value)}
         />
         <button type="submit">Acessar</button>
      </form>
    </div>
  )
}

export default Home