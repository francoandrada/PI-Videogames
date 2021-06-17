import styles from './Navbar.module.css'
//import { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className={styles.navContainer}>
      <div>
        <Link to={'/'}>
          <h1 className={styles.logo}>Videogames App</h1> 
        </Link>
      </div>
    </div>
  )
}

export default Navbar