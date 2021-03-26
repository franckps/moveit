import Head from 'next/head'
import styles from '../styles/components/Award.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

interface UserInterface {
    _id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    challengesCompleted: number,
    currentExperience: number,
    level: number,
    experience: number,
    experienceUpdatedAt: string,
}

export default function Award() {
  const [users, setUsers] = useState([] as Array<UserInterface>)
  const [details, setDetails] = useState(null as UserInterface)

  useEffect(() => {
    getUsersData()
  }, [])

  const getUsersData = async () => {
    let {data}: {message: string, data: Array<UserInterface>} = 
      (await axios.get('/api/Users')).data
    data.push(data[0])
    data.push(data[0])
    data.push(data[1])
    data.push(data[1])
    setUsers(data)
  }

  const closeDetails = () => {
    setDetails(null)
  }

  const openDetails = (id: number) => {
    setDetails(users[id])
  }

  return (
    <>
      <Head>
        <title>Award | Moveit</title>
      </Head>

      <div className={styles.container}>
        <h1>Leaderboard</h1>

        <section>
          <header className={styles.row}>
            <span>POSIÇÃO</span>
            <span>USUÁRIO</span>
            <span>DESAFIOS</span>
            <span>EXPERIÊNCIAS</span>
            <span>DETALHES</span>
          </header>

          <main>
            <ul>
            {users.map((user, key) => (
              <li key={key} className={styles.row} onClick={() => openDetails(key)}>
                <span>
                  <strong>{key}</strong>
                </span>
                <div>
                  <img src={user.image} alt={user.name}/>
                  <div>
                    <strong>{user.name}</strong>
                    <p>
                        <img src="icons/level.svg" alt="Level" />
                        Level {user.level}
                    </p>
                  </div>
                </div>
                <p>
                  <span>{user.challengesCompleted}</span> completados
                </p>

                <p>
                  <span>{user.experience}</span> xp
                </p>

                <p>
                  <button type="button" onClick={closeDetails}>
                    <img src="/icons/info.svg" alt="Details"/>
                  </button>
                </p>
              </li>
            ))}
            </ul>
          </main>
        </section>
      </div>

      {!!details &&
      (<div className={styles.overlay}>
          <div className={styles.detailsContainer}>
            <div className={styles.profileContainer }>
              <img src={details.image} alt={details.name}/>
              <div>
                <strong>{details.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level <span>{details.level}</span>
                </p>
              </div>
            </div>

            <p>
              <span>{details.challengesCompleted}</span> completados
            </p>

            <p>
              <span>{details.experience}</span> xp
            </p>

            <button type="button" onClick={closeDetails}>
                <img src="/icons/close.svg" alt="Fechar modal"/>
            </button>
          </div>
      </div>)}

    </>
  )
}