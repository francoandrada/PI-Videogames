import { useEffect, useState } from 'react';
import { getAllGenres, getVideogamesByGenre } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sidebar.module.css'
import SearchBar from './SearchBar';


function Sidebar() {

  const genres = useSelector(state => state.genres)
  const dispatch = useDispatch();

  const [filterGenre, setFilterGenre] = useState('');


  useEffect(() => {
    dispatch(getAllGenres())
  }, [])



  const handleChange = (event, name) => {
    event.preventDefault();
    setFilterGenre(name)
    if (filterGenre) {
      dispatch(getVideogamesByGenre(filterGenre))
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <nav className={styles.navContainer}>
        <p>BROWSE BY</p>
        <div className={styles.browse}>
          <p>GENRE</p>
          <div >
            <ul >
              {
                Array.isArray(genres.data) ?
                  genres.data.map(genre => (
                    <li key={genre.id} className={styles.hover}>
                      <a value={genre.name} onClick={(e)=> handleChange(e, genre.name)}>{genre.name}</a> 
                    </li>
                  )) : <h1>Cargando..</h1>
              }
            </ul>

          </div>


        </div>
        <div className={styles.browse}>
          <p>RECENTLY ADDED</p>
        </div>
        <p >SORT BY</p>
        <div className={styles.sort}>
          <p className={styles.hover}>A-Z</p>
          <p className={styles.hover}>Z-A</p>
          <p className={styles.hover}>Rating 1-10</p>
          <p className={styles.hover}>Rating 10-1</p>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar