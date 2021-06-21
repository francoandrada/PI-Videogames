import { Link } from 'react-router-dom'
import { FaArrowCircleLeft } from 'react-icons/fa'
import styles from './VideogameCreate.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createVideogame, getAllGenres, getAllPlatforms } from '../../Redux/actions';
import { useEffect, useState } from 'react';



function VideogameCreate() {

  const dispatch = useDispatch();
  const platformState = useSelector(state => state.platforms);
  let genreState = useSelector(state => state.genres);
 

  useEffect(() => {
    dispatch(getAllPlatforms());
  }, [])

  useEffect(() => {
    dispatch(getAllGenres());
  }, [])


  let genresWithCheck = Array.isArray(genreState.data) ? genreState.data.map(genre => ({checked: false, name: genre.name, id: genre.id})) : genreState
  
  const [genres, setGenres] = useState(genresWithCheck)


  let platformsWithCheck = Array.isArray(platformState.data) ? platformState.data.map(platform => ({checked: false, name: platform.name, id: platform.id})) : platformState
  
  const [platforms, setPlatforms] = useState(platformsWithCheck)
  
  const [game, setGame] = useState({
    name: '',
    description: '',
    rating: 0,
    released: '',
    genreName: null,
    platformName: null

  })
  const handleClickGenre = (e) => {
    setGenres(genres.map(genre => {
      if (genre.name === e.currentTarget.name) {
        genre.checked = !genre.checked;
      }
      return genre
    }))
    let genreschecked = genres.filter(genre => genre.checked).map(genre => genre.name);

    setGame({
      ...game,
      ['genreName']: genreschecked
    })
  }
  

  const handleClickPlatform = (e) => {
    setPlatforms(platforms.map((platform) => {
      if (platform.name === e.currentTarget.name) {
        platform.checked = !platform.checked;
      }
      return platform
    }))  
    let platformschecked = platforms.filter(platform => platform.checked).map(platform => platform.name);
    
    setGame({
      ...game,
      ['platformName']: platformschecked
    })
  }

 
  const handleChange = (e) => {
    setGame({
      ...game,
      [e.target.name] : e.target.value
    })
  }
  console.log(game);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!game.name) {
      return alert('Please, enter a name')
    }
    if (!game.description) {
      return alert('Please, enter a description')
    }
    if (!game.released) {
      return alert('Please, enter a released')
    }

    dispatch(createVideogame(game));
    alert('Videogame created successfully')
    e.target.reset();
  }



  return (
    <div className={styles.container}>
      <Link to='/videogames'>
        <div className={styles.side}>
          <p className={styles.iconContainter}>< FaArrowCircleLeft className={styles.icon} /></p>
        </div>
      </Link>
      <div className={styles.containerCreate}>
        <p className={styles.title}>Create a game</p>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.input_textarea}>
            <div className={styles.inputContainer}>
              <div>
                <input name='name' onChange={(e) => handleChange(e)} value={game.name} type="text" placeholder='Name: ' />
              </div>
              <div>
                <input name='released' onChange={(e) => handleChange(e)} value={game.released} type="date" placeholder='Release date:' />
              </div>
              <div>
                <input name='rating' onChange={(e) => handleChange(e)} value={game.rating} type="number" placeholder='Rating:' min="0" max="5"/>
              </div>
            </div>
            <div className={styles.textareaContainer}>
              <div>
                <textarea name='description' onChange={(e) => handleChange(e)} value={game.description} id="" cols="30" rows="10" placeholder='Description: '></textarea>
              </div>
            </div>
            <div className={styles.subtitle}>
              <p>Select platforms</p>
              <hr />
            </div>
            <div className={styles.selectContainer}>
              {
                Array.isArray(platforms) ?
                  platforms.map(p => (
                    <div key={p.id}>
                      <input type="checkbox" name={p.name} id="" onClick={handleClickPlatform}/>
                      <label >{p.name}</label>
                    </div>
                  )) : <h1>Loading..</h1>
              }
            </div>
            <div className={styles.subtitle}>
              <p>Select genres</p>
              <hr />
            </div>
            <div className={styles.selectContainer}>
              {
                Array.isArray(genresWithCheck) ?
                  genresWithCheck.map(g => (
                    <div key={g.id}>
                      <input name={g.name} type="checkbox"  id="" onClick={handleClickGenre} />
                      <label >{g.name}</label>
                    </div>
                  )) : <h1>Loading..</h1>
              }
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button id={styles.btn} type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideogameCreate