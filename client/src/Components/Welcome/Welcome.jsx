//import { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import style from './Welcome.module.css'

function Welcome() {

  return (
    <div className={style.container}>
      <div className={style.containerContent}>
        <div className={style.logo}>
          <h3>Videogame App</h3>
        </div>
        <div className={style.h3}>
          <p>MEET THE BEST VIDEOGAMES</p>
        </div>
        <div className={style.description}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam voluptates magni repellat ipsum error, dolorum dolore quos sunt itaque laboriosam fuga labore ipsam temporibus aliquid commodi autem animi voluptate delectus?
          </p>
        </div>
        <div >
          <div className={style.containerLink}>
            <Link to='/videogames'>
              <span id={style.link}> Lets go! </span>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Welcome