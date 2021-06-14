//import { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {

  return (
    <div  className={styles.container}>
      <div className={styles.containerGit}>
        <span className={styles.gitLink}> GitHub </span>
      </div>
    </div>
  )
}

export default Footer