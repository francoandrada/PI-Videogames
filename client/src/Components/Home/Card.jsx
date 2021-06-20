import styles from './Card.module.css'

function Card(props) {

  return (
    <div className={styles.container} key={props.id}>
      <div className={styles.card} >
        <div className={styles.imageContainer}>
          <img className={styles.cardImage} src={props.image} />
        </div>
        <div className={styles.contentText}>
          <p className={styles.contentTitle}>{props.name}</p>
          {
            Array.isArray(props.genres) ? props.genres.map(genre => (
              <span>{genre} &nbsp; </span>
              
            )) : <p>It has no gender</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Card