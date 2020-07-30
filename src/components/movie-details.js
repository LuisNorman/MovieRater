import React, {useState} from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function MovieDetails(props) {

    const [highlighted, setHighlighted] = useState(-1);

    let mov = props.movie;

    // Post (put if already there) the new rating to api/movies/{movie.id}/rate_movie
    // then call function getDetails() to display the details
    const rateClicked = rate => evt => {
        // use back tick so we can use dynamic variables
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 81e7524cbfe55a22b7133d15580b3b6baf3af7f2',
            },
            body: JSON.stringify( {stars: rate + 1} ) // send the rating to the api
            //dont have the name the function
        }).then(() => getDetails())
        .catch(error => console.log(error))
    }
        
    
    // Fetch the movie details from api/movies
    const getDetails = () => {
        // use back tick so we can use dynamic variables
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 81e7524cbfe55a22b7133d15580b3b6baf3af7f2',
            },
        }).then(resp => resp.json()) // fetch the response then convert to json
        .then(resp => props.updateMovie(resp)) // call parent function to update movie. *best practice - instead of updating it in the child class
        .catch(error => console.log(error))
    }
            
    // set highlighted to high (the val passed to function)
    // function that fires off another function (evt)
    const highlightRate = high => evt => {
        setHighlighted(high) 
    }

    return (
        // to avoid having a div, use this
        <React.Fragment> 
            {/* check if movie is avail if not print null  */}
            { mov ? (
                <div>
                    <h1>{mov.title}</h1>
                    <p>{mov.description}</p>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange' : ''}/>
                    ({mov.no_of_ratings})

                    {/* This highlights the hovered star */}
                    <div className='rate-container'>
                        <h2>Rate it</h2>
                        {/* we're iterating 5 times and creating a star each iteration with onMouseEnter and ...Leave effects
                            Each iteration/star creation, it register with key i so the 3rd star will have key 2 (index starts at 0) */}
                        { [...Array(5)].map( (e, i) => {
                            // i starts at 0 so we set rating to -1 bc we check at one point if highlight > i-1 which can be 0-1=-1
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? 'purple' : ''}
                                onMouseEnter={highlightRate(i)} // highlight the stars that's hovered at index i and before
                                onMouseLeave={highlightRate(-1)} // set tp -1 which is nothin. cant be 0 bc first star has key = 0
                                onClick={rateClicked(i)} // update the rating. In the function, I update rating to i+1 because they are 0-indexed
                            />
                        })}
                    </div>
                </div>
            ) : null}
        </React.Fragment> 
    )
}



export default MovieDetails;