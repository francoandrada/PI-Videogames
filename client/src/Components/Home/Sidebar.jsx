import { useEffect, useState } from 'react';
import { getAllGenres, getVideogamesByGenre, getVideogamesByOrder } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sidebar.module.css'
import SearchBar from './SearchBar';


function Sidebar() {

  const genres = useSelector(state => state.genres)
  const dispatch = useDispatch();

  const [filterGenre, setFilterGenre] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    dispatch(getAllGenres());
  }, [])

  useEffect(() => {
    if (filterGenre.length > 0) {
      dispatch(getVideogamesByGenre(filterGenre));
    }
  }, [filterGenre])

  useEffect(() => {
    if (sortBy.length > 0) {
      dispatch(getVideogamesByOrder(sortBy));
    }
  }, [sortBy])

  const handleClickGenre = (event, name) => {
    event.preventDefault();
    setFilterGenre(name);
  }

  const handleClickSort = (event, sortType) => {
    event.preventDefault();
    setSortBy(sortType);
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
                      <a onClick={(e) => handleClickGenre(e, genre.name)}>{genre.name}</a>
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
          <a className={styles.hover} onClick={(e)=> handleClickSort(e, 'A-Z')}>A-Z</a>
          <a className={styles.hover} onClick={(e)=> handleClickSort(e, 'Z-A')}>Z-A</a>
          <a className={styles.hover} onClick={(e)=> handleClickSort(e, 'Highest Rating')}>Highest Rating</a>
          <a className={styles.hover} onClick={(e)=> handleClickSort(e, 'Lower Rating')}>Lower Rating</a>
        </div>
      </nav>
    </div>




  )
}

export default Sidebar