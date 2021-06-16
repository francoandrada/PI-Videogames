import {  useState } from 'react'
import { useDispatch} from 'react-redux';
import styles from './SearchBar.module.css'
import { getVideogamesByName } from '../../Redux/actions'
import { BsSearch } from 'react-icons/bs'

function SearchBar() {

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  //const videogames = useSelector(state => state.videogames)

  // useEffect((event) => {
  //   event.preventDefault();
  //   dispatch(getVideogamesByName(input))
  // }, [input])


  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.length === 0) {
      alert("You must enter a game")
    } else {
      dispatch(getVideogamesByName(input))
    }
  }
  return (
    <div  className={styles.container}>
      <div className={styles.containerForm}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input value={input} className={styles.input} type="text" placeholder="Introduce a game" onChange={(e) => handleChange(e)}/>
          <button id={styles.search} type='submit'> <BsSearch/></button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar