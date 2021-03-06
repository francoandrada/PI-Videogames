import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom'
import { clearVideogame, getVideogame } from '../../Redux/actions';
import { useParams } from 'react-router-dom'
import styles from './VideogameDetail.module.css'
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa'
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';

function VideogameDetail() {
  const dispatch = useDispatch();
  const videogameDetail = useSelector(state => state.videogameDetail)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getVideogame(id))
    return () => {
      dispatch(clearVideogame())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (videogameDetail?.data && videogameDetail.data.description.includes('<p>')) {
      const html = document.getElementById('description');
      html.innerHTML = videogameDetail.data.description;
    }
  }, [videogameDetail]);

  if (videogameDetail === null) {
    return (
      <div>
        < NotFound/>
      </div>
    )
  } else if (videogameDetail === undefined) {
    return (
      <div>
        < Loader/>
      </div>
    )
  } else {

    return (
      <div className={styles.container}>
        <Link to='/videogames'>
          <div className={styles.side}>
            <p className={styles.iconContainter}>< FaArrowCircleLeft className={styles.icon} /></p>
          </div>
        </Link>
        <div className={styles.containerDetail} >
          <div className={styles.detail}>
            <div className={styles.title}>
              <span>{videogameDetail.data.name}</span>
            </div>
            <div className={styles.image} >
              {
                videogameDetail.data.background_image ?
                <div className={styles.imageContainer}>
                  <img className={styles.cardImage} src={videogameDetail.data.background_image} />
                </div>
                : <p>It has no image</p>
              }
            </div>
            <div className={styles.text}>

              <div id='description'>{videogameDetail.data.description}</div>
              <div className={styles.noDesc}>
                Genres: &nbsp;
                {
                  Array.isArray(videogameDetail.data.genres) ? videogameDetail.data.genres.map(genre => 
                    <span>{genre} &nbsp; </span>
                  ) : <p>It has no gender</p>
                }
              </div>
              <div className={styles.noDesc}>Released in:
               {
                 videogameDetail.data.released ? <span>{videogameDetail.data.released} </span> : <p>It has no released</p>
               }

               </div>
              <div className={styles.noDesc}>Rating:
               
               {
                 videogameDetail.data.rating ? <span>{videogameDetail.data.rating} </span> : <p>It has no rating</p>
               }
               </div>
              <div className={styles.noDesc}>
                Available in: &nbsp;
                {
                  Array.isArray(videogameDetail.data.platforms) ? videogameDetail.data.platforms.map(platform => (
                    <span>{platform} &nbsp; </span>
                  )) : <p>It has no platforms</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideogameDetail