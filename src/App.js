import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [movies, setMovie] = useState([]);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout"> 
          <div>
            { movies.map(movie => {
              return <h2>{movie.title}</h2>
            } ) }
          </div>
          <div>Movie Details</div>
        </div>
    </div>
  );
}

export default App;
