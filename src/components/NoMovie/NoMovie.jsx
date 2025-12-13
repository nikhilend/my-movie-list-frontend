import '../../utils/Utility.css'
import './NoMovie.css'
import { useNavigate } from 'react-router-dom'
import { ADD } from '../../utils/constants'

const NoMovie = () => {

  const navigate = useNavigate()

  return (
        
    <div className='container'>
     <div className='no-movie-wrapper'>
        <h1 className='no-movie-heading'>Your Movie List is Empty</h1>
        <button className='btn btn-primary' onClick={() => {navigate("/addedit/"+ ADD)}}>Add new Movie</button>
     </div>
    </div>
  )
}

export default NoMovie