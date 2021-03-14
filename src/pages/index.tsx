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
  login: string
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
    {!session? <Login handleLogin={handleLogin}/> : (
      <ChallengesProvider 
        login={session.user.name}
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
  const { login } = ctx.req.cookies
  return {
    props: {
      login: String(login)
    }
  }
}