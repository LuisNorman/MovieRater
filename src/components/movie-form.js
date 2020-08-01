import React, {useState, useEffect} from 'react';
import {API} from '../api-service';
import { useCookies } from 'react-cookie';

function MovieForm(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mr-token'])


    // use effects will run this whenever we change the props movie
    useEffect(() => {
        setTitle(props.movie.title)
        setDescription(props.movie.description)
    }, [props.movie]) // 

    // Update the movie
    const updateClicked = () => {
        console.log("update here")
        API.updateMovie(props.movie.id, {title, description}, token['mr-token']) // body = {"title":title, "description:description}
        .then(resp => props.updatedMovie(resp))
        .catch(error => console.log(error))
    }

    // Update the movie
    const createClicked = () => {
        console.log("update here")
        API.createMovie({title, description}, token['mr-token']) // body = {"title":title, "description:description}
        .then(resp => props.movieCreated(resp))
        .catch(error => console.log(error))
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <React.Fragment> 
            {/* check if movie is avail if not print null  */}
            { props.movie ? (
                <div>
                    <label htmlFor="title">Title</label><br></br>
                    <input id="title" type="text" placeholder="title" value={title}
                        onChange={evt => setTitle(evt.target.value)}
                    /><br></br>
                    <label htmlFor="description">Description</label><br></br>
                    <textarea id="description" type="text" placeholder="Description" value={description}
                        onChange={evt => setDescription(evt.target.value)}
                    ></textarea><br></br>
                    { props.movie.id ?
                        <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
                        <button onClick={createClicked} disabled={isDisabled}>Create</button>
                    }
                </div>
            ) : null}
            </React.Fragment>
    )
}

export default MovieForm;