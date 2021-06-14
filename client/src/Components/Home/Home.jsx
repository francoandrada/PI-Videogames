import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllVideogames } from '../../Redux/actions';

function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames)
    useEffect(() => {
        dispatch(getAllVideogames())
    }, [dispatch])
    return (
        <div>
            <ul>
                {
                    videogames && Array.isArray(videogames.data) ? videogames.data.map(game => (
                        <li key={game.id}>
                            <Link to={`/videogames/${game.id}`}>{game.name}</Link>
                        </li>
                    )) : <h1>Cargando..</h1>
                }
            </ul>
        </div>
    )
}

export default Home