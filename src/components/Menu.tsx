import Link from 'next/link'

import styles from '../styles/components/Menu.module.css'

interface MenuProps {
    activePage?: 'home' | 'award',
    handleChangePage: (page: 'home' | 'award') => void
}

export default function Menu({ activePage, handleChangePage }: MenuProps) {
    return (
        <nav className={styles.menuContainer}>
            <a 
                onClick={(event) => { event.preventDefault(); handleChangePage('home') }} 
                className={styles.menuLink}
            >
                <img src="/logo.svg" alt="Logo"/>
            </a>
            <main>
                <a
                    onClick={(event) => { event.preventDefault(); handleChangePage('home') }}  
                    className={`${styles.menuLink} ${ activePage !== 'award'? styles.active : '' }`}
                >
                    <img src="/home.svg" alt="Home"/>
                </a>
                <a
                    onClick={(event) => { event.preventDefault(); handleChangePage('award') }}  
                    className={`${styles.menuLink} ${ activePage === 'award'? styles.active : '' }`}
                >
                    <img src="/award.svg" alt="Award"/>
                </a>
            </main>
            <span></span>
        </nav>
    );
}