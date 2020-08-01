// const TOKEN = "81e7524cbfe55a22b7133d15580b3b6baf3af7f2";


export class API {

    static loginUser(body) {
        // use back tick so we can use dynamic variables
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify( body ) // send the rating to the api
            //dont have the name the function
        }).then(resp => resp.json()) // fetch the response then convert to json
    }

    // add new user
    static registerUser(body) {
        // use back tick so we can use dynamic variables
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify( body ) // send the rating to the api
            //dont have the name the function
        }).then(resp => resp.json()) // fetch the response then convert to json
    }

    static updateMovie(mov_id, body, token) {
        // use back tick so we can use dynamic variables
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            },
            body: JSON.stringify( body ) // send the rating to the api
            //dont have the name the function
        }).then(resp => resp.json()) // fetch the response then convert to json
    }

    static getMovies(token) {
        return fetch("http://127.0.0.1:8000/api/movies/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }
        }).then(resp => resp.json()) // fetch the response then convert to json
    }
    
    static createMovie(body, token) {
        // use back tick so we can use dynamic variables
        return fetch(`http://127.0.0.1:8000/api/movies/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            },
            body: JSON.stringify( body ) // send the rating to the api
            //dont have the name the function
        }).then(resp => resp.json()) // fetch the response then convert to json
    }

    static deleteMovie(mov_id, token) {
        // use back tick so we can use dynamic variables
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            },
        })
    }
}