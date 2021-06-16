import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { getAllVideogames } from '../../Redux/actions';

import styles from './Home.module.css'
import Card from '../Home/Card';
import Sidebar from './Sidebar';

function Home() {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames)
    useEffect(() => {
        dispatch(getAllVideogames(page))
    }, [page])

    return (

        <div>
            <div className={styles.homeContainer} >
                <Sidebar />
                <div className={styles.cardsContainer}>
                    {
                        videogames && Array.isArray(videogames.data) ? videogames.data.map(game => (
                            <div key={game.id} className={styles.cardContainer}>
                                <NavLink to={`/videogames/${game.id}`}>
                                    <Card
                                        id={game.id}
                                        name={game.name}
                                        image={game.background_image}
                                        genres={game.genres}
                                    />
                                </NavLink>
                            </div>
                        )) : <h1>Cargando..</h1>
                    }

                </div>
            </div>
                <div className={styles.pages}>
                    <button id="pri" onClick={() => setPage(1)}>1</button>
                    <button onClick={() => setPage(2)}>2</button>
                    <button onClick={() => setPage(3)}>3</button>
                    <button onClick={() => setPage(4)}>4</button>
                    <button onClick={() => setPage(5)}>5</button>
                </div>
        </div>
    )
}

export default Home