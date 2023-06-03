import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
    login: string;
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [experience, setExperience] = useState(0)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
        axios.get(`/api/Users/${rest.login}`).then(response => {
            const { data } = response.data;
            if(!!data?.level)
                setLevel(Number(data.level) ?? 1)
            if(!!data?.currentExperience)
                setExperience(Number(data.experience) ?? 0)
            if(!!data?.currentExperience)
                setCurrentExperience(Number(data.currentExperience) ?? 0)
            if(!!data?.challengesCompleted)
                setChallengesCompleted(Number(data.challengesCompleted) ?? 0)
        })
    }, [])

    useEffect(() => {
        updateChallengesData();
    }, [level, experience, currentExperience, challengesCompleted])

    const updateChallengesData = async () => {
        if(level > 1 || currentExperience > 0 || challengesCompleted > 0 ) {
            Cookies.set('level', String(level))
            Cookies.set('experience', String(experience))
            Cookies.set('currentExperience', String(currentExperience))
            Cookies.set('challengesCompleted', String(challengesCompleted))
            try{
                axios.put(`/api/Users/${rest.login}`, { 
                    level, 
                    experience, 
                    currentExperience, 
                    challengesCompleted 
                })
            }catch(error){
                console.log(error)
            }
        }
    }

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge)
            return;

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience- experienceToNextLevel;
            levelUp()
        }

        setExperience(experience + amount)
        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{
            level, 
            currentExperience, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
        }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}