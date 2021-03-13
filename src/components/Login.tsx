import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/components/Login.module.css'

interface LoginPropsInterface {
    handleLogin: () => void
}

export default function Login({ handleLogin }: LoginPropsInterface) {
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

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
                <div>
                {loading? (
                    <button type="button" disabled>
                        <span>carregando...</span>
                        <span></span>
                    </button>
                ) : (
                    <button type="button" onClick={() => {setLoading(true); handleLogin()}}>
                        <span>Logar com o github</span>
                        <span><img src="/arrow-right.png" alt="Login Button"/></span>
                    </button>
                )}
                </div>
                <span style={{paddingLeft: '1.87rem',color: '#F00'}}>{message}</span>
            </section>
        </div>
    );
}