import React, {useState} from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function MovieDetails(props) {

    const [highlighted, setHighlighted] = useState(-1);

    let mov = props.movie;

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
        
    

    const getDetails = () => {
        // use back tick so we can use dynamic variables
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 81e7524cbfe55a22b7133d15580b3b6baf3af7f2',
            },
        }).then(resp => resp.json()) // fetch the response then convert to json
        .then(resp => props.updateMovie(resp))
        .catch(error => console.log(error))
    }
            

    const highlightRate = high => evt => {
        setHighlighted(high) // set highlighted to high (the val passed to function)
    }
    return (
        // to avoid having a div, use this
        <React.Fragment> 
            {/* check if movie is avail if not print null  */}
        { mov ? (
            <div>
                <h1>{mov && mov.title}</h1>
                <p>{mov && mov.description}</p>
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange' : ''}/>
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange' : ''}/>
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange' : ''}/>
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange' : ''}/>
                <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange' : ''}/>
                ({mov.no_of_ratings})

                {/* This highlights the hovered star */}
                <div className='rate-container'>
                    <h2>Rate it</h2>
                    { [...Array(5)].map( (e, i) => {
                        // i starts at 0 so we set rating to -1 bc we check at one point if highlight > i-1 which can be 0-1=-1
                        return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? 'purple' : ''}
                            onMouseEnter={highlightRate(i)}
                            onMouseLeave={highlightRate(-1)} // set tp -1 which is nothin. cant be 0 
                            onClick={rateClicked(i)}
                        />
                    })}
                </div>

            </div>
            
        ) : null}
        </React.Fragment> 
    )
}



export default MovieDetails;