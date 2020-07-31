import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const[selectedMovie, setSelectedMovie] = useState(null);
  const[editedMovie, setEditedMovie] = useState(null);


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 81e7524cbfe55a22b7133d15580b3b6baf3af7f2',
      }
    })
    .then(resp => resp.json()) // fetch the response then convert to json
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, []) // array at end means only run effect once

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
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
