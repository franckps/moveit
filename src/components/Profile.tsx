import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

interface ProfileProps {
    name: string,
    image: string,
    handleSignOut: () => void
}

export function Profile({name, image, handleSignOut}: ProfileProps) {
    const { level } = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src={image} alt={name} />
            <div>
                <strong>{name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
                <p>
                    <button type="button" className={styles.signOutButton} onClick={handleSignOut}>
                        Sair
                    </button>
                </p>
            </div>
        </div>
    );
}