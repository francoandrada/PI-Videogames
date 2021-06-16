import { useEffect, useState } from 'react';
import { getAllGenres } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sidebar.module.css'
import SearchBar from './SearchBar';


function Sidebar() {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres)
  useEffect(() => {
    dispatch(getAllGenres())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.search}>
      <SearchBar/>
      </div>
      <nav className={styles.navContainer}>
        <p>BROWSE BY</p>
        <div className={styles.browse}>
          <p>GENRE</p>
          <ul >
            {
              Array.isArray(genres.data) ?
                genres.data.map(genre => (
                  <div key={genre.id} className={styles.hover}>
                    <li > {genre.name} </li>
                  </div>
                )) : <h1>Cargando..</h1>
            }
          </ul>
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