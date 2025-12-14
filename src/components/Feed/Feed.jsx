import { useEffect, useState } from 'react'
import Header from '../Header/Header.jsx';
import '../../utils/Utility.css'
import './Feed.css'
import Movie from '../Movie/Movie.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_URL, MOVIE_RECORDS } from '../../utils/constants.js';
import {getFeed, updatePageNo } from '../../utils/userFeedSlice.js'
import NoMovie from '../NoMovie/NoMovie.jsx';
import ShimmerFeed from '../ShimmerFeed.jsx';

const Feed = () => {
 const userFeed = useSelector(store => store.userFeed)

 // use states for pages
 const [pageNumber, setPageNumber] = useState(1)
 const [pagesArray, setPagesArray] = useState([])
 const [feedFeched, setfeedFetched] = useState(false)

 const dispatch = useDispatch();


  useEffect(()=> {
    // fetch the movies of user
    fetchFeed(userFeed.page)

  },[]) 

async function fetchFeed(page) {
  try {
      const res = await fetch(FETCH_URL + "/movie/feed" + "?page="+ page +"&records="+MOVIE_RECORDS, {method: "GET", credentials: 'include'});

      const result = await res.json();

      if(res.status === 200) {
        dispatch(getFeed({movies: result?.movies, page: page}))
        setPageNumber(parseInt(page))

        //Calculate number of pages
        setPagesArray(Array.from({ length: Math.ceil(result?.totalMovies/MOVIE_RECORDS) }, (_, index) => index + 1));
        setfeedFetched(true)
      }
  }
  catch(e) {
      throw e;
  }
}

// function for handelling the previous and next button
async function handlePrevNext(action) {
  if(action=== 'prev') {
    if(pageNumber != 1){
      
      dispatch(updatePageNo(pageNumber - 1))
      fetchFeed(pageNumber - 1)
    }
  }

  if(action=== 'next') {
    if(pageNumber < pagesArray.length){
      dispatch(updatePageNo(pageNumber + 1))
      fetchFeed(pageNumber + 1)
    }
  }
}
  // if no user feed dont load movies from user feed
  if (!feedFeched && (!userFeed.movies || userFeed.movies.length === 0)) return(<ShimmerFeed/>)
  if (feedFeched && (!userFeed.movies || userFeed.movies.length === 0)) return(<NoMovie/>)
  return (
    <div className='container'>

        <Header/>
        {/* MOVIE LIST */}
        <div className='movies-wrapper'>
            <div className='movie-grid'>
              {userFeed?.movies.map((movie)=> (
              <Movie
                key = {movie._id}
                title= {movie.title}
                year = {movie.year}
                poster = {movie.poster}
                id = {movie._id}
              />
              ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className='pagination-wrapper'>
          <ul className='pagination-bar'>

            <li >
              <button 
                className={(pageNumber === 1? 'page-btn-disabled' : 'page-btn')}
                onClick={() => {handlePrevNext("prev")}}>
                Prev
              </button>
            </li>

            {pagesArray.map((p) => (
              <li key={p}>
                  <button 
                  className={(pageNumber === p? "page-num page-num-active": "page-num")}
                  value={p} onClick={(e)=> {fetchFeed(e.target.value); dispatch(updatePageNo(e.target.value))}}>
                    {p}
                  </button>
                </li>
            ))}
            
            <li className='page-btn'>
              <button 
              className={(pagesArray.length === pageNumber? 'page-btn-disabled': 'page-btn')}
              onClick={() => {handlePrevNext("next")}}>
                Next
              </button>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Feed