import { useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import styles from '../styles/pages/Login.module.css'

export default function Login() {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const router = useRouter()

    async function handleLogin() {
        try {
            let userRequest = await axios.get(`https://api.github.com/users/${user}`)
            console.log('userRequest: ', userRequest)
            if(userRequest.status == 200) {
                console.log('User erxistis')
                Cookies.set('login', userRequest.data.login)
                Cookies.set('name', userRequest.data.name ?? userRequest.data.login)
                router.push('/')
            } else
                return setMessage('User not found!')
        } catch(error) {
            setMessage('User not found!')
        }
    }
    return (
        <div className={styles.loginContainer}>
            <section>
                <img src="/logo-full-white.svg" alt="Logo"/>

                <h1>Bem-vindo</h1>
                <p>
                    <img src="/github.png" alt="Github"/>
                    <span>
                        Faça login com seu Github para começar
                    </span>
                </p>
                <form>
                    <input 
                        type="text" 
                        placeholder="Digite seu username"
                        onChange={(e) => { setUser(e.target.value) }}
                        defaultValue={user ?? ''}
                    />

                    {!!user? (
                        <button type="button" onClick={handleLogin}>
                            <img src="/arrow-right.png" alt="Login Button"/>
                        </button>
                    ) : (
                        <button type="button" disabled>
                            <img src="/arrow-right.png" alt="Login Button"/>
                        </button>
                    )}
                </form>
                <span style={{paddingLeft: '1.87rem',color: '#F00'}}>{message}</span>
            </section>
        </div>
    );
}