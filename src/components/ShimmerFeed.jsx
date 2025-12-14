import '../utils/Utility.css'
import './Feed/Feed.css'
import Header from './Header/Header'
import Movie from './Movie/Movie'

const ShimmerFeed = () => {
  return (
    <div className='container'>
        <Header/>
        {/* MOVIE LIST */}
        <div className='movies-wrapper'>
            <div className='movie-grid'>
              <Movie/>
              <Movie/>
              <Movie/>
              <Movie/>
              <Movie/>
              <Movie/>
              <Movie/>
              <Movie/>
          </div>
        </div>
    </div>
  )
}

export default ShimmerFeed