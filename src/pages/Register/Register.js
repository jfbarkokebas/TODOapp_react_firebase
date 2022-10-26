import './register.css'

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../firebaseConection'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if (email !== '' || password !== '') {


      await createUserWithEmailAndPassword(auth, email, password)
        .then(

          navigate('/', { replace: true })

        )
        .catch(
          setError('Erro ao fazer o cadastro')
        )
    } else {
      setError('Preencha todos os campos!')
    }


  }

  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta</span>

      <form className="form" onSubmit={handleRegister}>
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
        <button type="submit">Cadastrar</button>
      </form>

      <Link className="button-link" to="/">
        Já possui uma conta? Faça o login.
      </Link>
      {error !== '' && (<p className="error">{error}</p>)}
    </div>
  )
}

export default Register