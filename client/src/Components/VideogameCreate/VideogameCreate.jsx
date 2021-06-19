import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa'
import styles from './VideogameCreate.module.css'

// [ ] Un formulario controlado con los siguientes campos
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego




function VideogameCreate() {

  return (
    <div className={styles.container}>
      <Link to='/videogames'>
        <div className={styles.side}>
          <p className={styles.iconContainter}>< FaArrowCircleLeft className={styles.icon} /></p>
        </div>
      </Link>
      <div className={styles.containerCreate}>
        <p className={styles.title}>Create a game</p>
        <form action="" >
          <div className={styles.input_textarea}>
            <div className={styles.inputContainer}>
              <div>
                <input type="text" placeholder='Name: ' />
              </div>
              <div>
                <input type="date" placeholder='Release date:' />
              </div>
              <div>
                <input type="number" placeholder='Rating:' />
              </div>
            </div>
            <div className={styles.textareaContainer}>
              <div>
                <textarea name="" id="" cols="30" rows="10" placeholder='Description: '></textarea>
              </div>
            </div>
            <div className={styles.selectContainer}>
              <select name="" id="">
                <option value="">Genres</option>
              </select>
              <select name="" id="">
                <option value="">Platforms</option>
              </select>
            </div>
          </div>
          <button>Create</button>
        </form>
      </div>
    </div>
  )
}

export default VideogameCreate