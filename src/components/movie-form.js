import React, {useState} from 'react';


function MovieForm(props) {

    const [title, setTitle] = useState(props.movie.title);
    const [description, setDescription] = useState(props.movie.description);

    const updateClicked = () => {
        console.log("update here")
    }
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
                    <button onClick={updateClicked}>Update</button>
                </div>
            ) : null}
            </React.Fragment>
    )
}

export default MovieForm;