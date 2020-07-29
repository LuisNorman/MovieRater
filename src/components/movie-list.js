import React from 'react';

function MovieList(props) {

    // function to movie to evt
    const movieClicked = movie => evt => {
        console.log("here")
        props.movieClicked(movie)
    }

    return (
        <div>
            {/* check if the movies exist b4 iter */}
            { props.movies && props.movies.map(movie => {
                return (
                    <div key={movie.id}>
                      <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
                    </div>
              )
            } ) }
          </div>
    )
}



export default MovieList;