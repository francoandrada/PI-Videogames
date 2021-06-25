//import { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { AiFillGithub } from 'react-icons/ai';

function Footer() {

  return (
    <div  className={styles.container}>
      <div className={styles.containerGit}>
        <a href="https://github.com/francoandrada/PI-Videogames-FT13" className={styles.gitLink}> <AiFillGithub className={styles.iconGit}/> </a>
      </div>
    </div>
  )
}

export default Footer