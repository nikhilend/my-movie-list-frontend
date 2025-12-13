import '../../utils/Utility.css'
import './Movie.css'
import { useNavigate } from 'react-router-dom'
import { EDIT } from '../../utils/constants'


const Movie = ({title, poster, year, id}) => {

  const navigate = useNavigate()

  return (
    <div tabIndex={0} className='movie-item'
        onClick={() => {navigate("/addedit/" + EDIT+ "?updateId=" + id)}}
        >
        <img src={poster}></img>
        <p className='movie-title'>{title}</p>
        <p className='movie-year'>{year}</p>
    </div>
  )
}

export default Movie