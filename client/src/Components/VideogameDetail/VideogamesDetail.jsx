import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom'
import { clearVideogame, getVideogame } from '../../Redux/actions';
import { useParams } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch();
  const videogameDetail = useSelector(state => state.videogameDetail)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVideogame(id))
    return () => {
      dispatch(clearVideogame())
    }
  }, [dispatch, id])

  if (videogameDetail === null) {
    return (<h1>Usuario no encontrado</h1>)
  } else if (videogameDetail === undefined) {
    return (<h1>Cargando...</h1>)
  } else {
    return (<div>
              <span>Name: </span>
              <span>{videogameDetail.data.name}</span>
            </div>)
  }
}

export default Home