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
          Welcome to Videogames App, a web application where you can search for your favorite video games, filter by name, genre and more. You can also create yours through a controlled form with everything you need to have a complete video game. Sorry for my english, it's from google translator. 
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