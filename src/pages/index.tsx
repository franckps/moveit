import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import Cookies from 'js-cookie'

import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css'
import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import Menu from '../components/Menu';
import Login from '../components/Login';
import { useCallback, useEffect, useState } from 'react';
import Award from '../components/Award';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  login: string,
  name: string
}

function handleLogin() {
  signIn()
}

function handleSignOut() {
  signOut()
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()
  const [ activePage, setActivePage ] = useState('home')

  useEffect(() => {
    if(!!session){
      Cookies.set('login', String(session.user.name))
      Cookies.set('name', String(session.user.name))
    }
  }, [session])

  const handleChangePage = useCallback((page) => {
    setActivePage(page)
  }, [])

  return (<>
    {!session? <Login handleLogin={handleLogin} /> : (
      <ChallengesProvider 
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >

        <Menu activePage={String(activePage) as 'home' | 'award'} handleChangePage={handleChangePage}/>

        {activePage === 'award'? (
          <Award />
        ) : (<>
          <Head>
            <title>Início | Moveit</title>
          </Head>

          <div className={styles.container}>

            <ExperienceBar />

            <CountDownProvider>
              <section>
                <div>
                  <Profile 
                    login={session.user.name} 
                    name={session.user.name} 
                    handleSignOut={handleSignOut} 
                  />
                  <CompletedChallenges />
                  <CountDown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountDownProvider>
          </div>
        </>)}
      </ChallengesProvider>
    )}
  </>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, login, name } = ctx.req.cookies
  return {
    props: { 
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted),
      login: String(login), 
      name: String(name)
    }
  }
}