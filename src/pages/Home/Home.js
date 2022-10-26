import { useState } from "react"
import { Link } from "react-router-dom"
import {
 signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../firebaseConection'
import "./Home.css"

const Home = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    if (email !== '' || password !== '') {
      alert('LOGADO!')

      await signInWithEmailAndPassword(auth, email, password)
        .then(

      )
        .catch(
          console.log('ERRO NO LOGIN!')
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
          autoComplete={false}
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
    </div>
  )
}

export default Home