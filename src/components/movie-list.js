import React from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {API} from '../api-service'
import { useCookies } from 'react-cookie';


function MovieList(props) {

  const [token] = useCookies(['mr-token'])

    // function to movie to evt
    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
      props.editClicked(movie)
    }

    const removeClicked = movie => {
      API.deleteMovie(movie.id, token['mr-token'])
        .then(() => props.removeClicked(movie)) // even though no response if it's 20* go to props.removeClicked
        .catch(error => console.log(error))
    }

    return (
        <div>
            {/* check if the movies exist b4 iter */}
            { props.movies && props.movies.map(movie => {
                return (
                    <div key={movie.id} className="movie-item">
                      <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
                    <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                    </div>
              )
            } ) }
          </div>
    )
}



export default MovieList;