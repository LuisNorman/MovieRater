import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {useFetch} from './hooks/useFetch';


function App() {

  const [movies, setMovies] = useState([]);
  const[selectedMovie, setSelectedMovie] = useState(null);
  const[editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']) // movie rater token = name of cookie
  const [data, loading, error] = useFetch();


  useEffect(()=>{
    setMovies(data) // set movies to data everytime effect runs
  }, [data]) // array at end with data means run effect everytime data changes

  // If token changes, check if token is still available
  // redirect to auth if not present
  useEffect(() => {
    console.log(token);
    if (!token['mr-token']) window.location.href = '/'
    }, [token]
  )

  // function to => movie
  // the function sets the selected movie
  // const movieClicked = movie => {
  //   setSelectedMovie(movie);
  // }

  const loadMovie = movie => {
    setSelectedMovie(movie)
    setEditedMovie(null);
    const newMovies = movies.map(mov => {
      // Find the movie that was just updated and
      // replace it with the updated movie else keep 
      // the old movie which only occurs for movies that
      // weren't updated
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }

  const updatedMovie = movie => {
    const newMovies = movies.map(mov => {
      // Find the movie that was just updated and
      // replace it with the updated movie else keep 
      // the old movie which only occurs for movies that
      // weren't updated
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }

  // Edit movie
  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  // Remove movie
  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id
      // if (mov.id === movie.id) {
      //   return false;
      // }
      // return true;
    //}
    )
    setMovies(newMovies)

  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null)

  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie]; // get all movies and append new movie that was passed in
    setMovies(newMovies)
  }

  const logoutUser = () => {
    deleteToken(['mr-token']);
  }

  // If loading, disp loading page
  if (loading) return <h1>Loading...</h1>
  
  // If error, display errors
  if (error) return <h1>Error loading movies: {error}</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1> <FontAwesomeIcon icon={faFilm}/>
          <span> Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout"> 
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked} 
            removeClicked={removeClicked}/>
          <button onClick={newMovie}>New movie</button>
        </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          {/* movieCreated is clicked when a new movie is submitted and 
          new movie is clicked when wanting to enter a new movie */}
          { editedMovie ? 
            <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated} />: null }
          
        </div>
    </div>
  );
}

export default App;
