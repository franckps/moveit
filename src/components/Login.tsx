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
            <img src="/simbolo.png" alt="Not authenticated" />
            <div>
                <strong>Logar com Github</strong>
                <p>
                    {loading? (
                        <button type="button" className={styles.signInButton} disabled>
                            <span>carregando...</span>
                            <span></span>
                        </button>
                    ) : (
                        <button type="button" className={styles.signInButton} onClick={() => {setLoading(true); handleLogin()}}>
                            <span>Login</span>
                            <span><img src="/github.png" alt="Login Button"/></span>
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
}