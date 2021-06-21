import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

function NotFound() {

  return (
<div className={styles.container}>
        <Link to='/'>
          <div className={styles.side}>
            <p className={styles.iconContainter}>< FaArrowCircleLeft className={styles.icon} /></p>
          </div>
        </Link>
        <div className={styles.containerDetail} >
          <div className={styles.detail}>
            <div className={styles.title}>
              <p>Items not found, please press the button on the left to go back and try again</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default NotFound