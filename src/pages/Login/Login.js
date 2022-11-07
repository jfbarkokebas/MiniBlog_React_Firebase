import styles from './Login.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'  
import { auth } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  //my hooks:
  const { error: authError, loading, login } = useAuthentication()

  const handleSubmit = async(e) => {
    e.preventDefault()  

    setError('')

    let user ={
      email,
      password
    }

    login(user)

  }

  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
      <p>Faça o login para usar o sistema</p>

      <form onSubmit={handleSubmit}>      

        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name='displayEmail'
            required
            placeholder='email do usuário'
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Senha:</span>
          <input
            type="password"
            name='displayPassword'
            required
            placeholder='Sua senha'
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </label>        

        {!loading && <button className='btn'>Entrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}

        {error && <p className='error'>{error}</p>}
        {authError && <p className='error'>{authError}</p>}


      </form>
    </div>
  )
}

export default Login