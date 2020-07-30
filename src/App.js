import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovie] = useState([]);
  const[selectedMovie, setSelectedMovie] = useState(null);
  const[editedMovie, setEditedMovie] = useState(null);


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 81e7524cbfe55a22b7133d15580b3b6baf3af7f2',
      }
    }).then(resp => resp.json()) // fetch the response then convert to json
    .then(resp => setMovie(resp))
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
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout"> 
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked}/>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          { editedMovie ? <MovieForm movie={editedMovie}/> : null }
          
        </div>
    </div>
  );
}

export default App;
