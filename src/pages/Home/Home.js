import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {
 signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../firebaseConection'
import "./Home.css"

const Home = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    if (email !== '' || password !== '') {
     
      await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{

          navigate('/admin', {replace: true})
          setError('')

        })
        .catch(
          setError('Email e(ou) senha inválidos!')
        )
    }else{
      alert('Preencha todos os campos!')
    }


  }

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu e-mail."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
         
          type="password"
          placeholder="Digite sua senha."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Acessar</button>
      </form>

      <Link className="button-link" to="/register">
        Não possui uma conta? Cadastre-se.
      </Link>
      {error!=='' && (<p className="error">{error}</p>)}
    </div>
  )
}

export default Home