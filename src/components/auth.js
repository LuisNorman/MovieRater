import React, {useState,  useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ isLoginView, setIsLoginView] = useState(true);
    const [invalidLogin, setInvalidLogin] = useState(false)

    const [token, setToken] = useCookies(['mr-token']) // movie rater token = name of cookie
    
    const loginClicked = () => {
        API.loginUser({username, password}) // Add curly braces around so it can be a json object
        .then(resp => _setToken(resp)) // pass the response to set token incase a failed login attemp
        // .then(resp => setToken('mr-token',resp.token))
        .catch(error => console.log(error + "Error!!!")) 
    }

    // Check response of login and disp the appropriate page
    const _setToken = (resp) => {
        if (resp.token) setToken('mr-token', resp.token)
        else {
            setInvalidLogin(true)
            console.log("Here: "+resp)
        }
    }

    useEffect(() => {
        console.log(token);
        // token object is empty so check for if token object has an attribute token (token.token) or token[mr-token]
        if (token['mr-token']) window.location.href = '/movies';
    }, [token]) // this effect/function is fired off everytime a token gets set

    const registerClicked = () => {
        API.registerUser({username, password}) // Add curly braces around so it can be a json object
        .then(() => loginClicked())
        .catch(error => console.log(error)) 
    }

    const isDisabled = username.length === 0 || password.length === 0;
    

    return (
        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>
            <div className="login-container">
                <label htmlFor="username">Username</label><br></br>
                <input id="username" type="text" placeholder="username" value={username}
                    onChange={evt => setUsername(evt.target.value)}
                /><br></br>
                <label htmlFor="password">Password</label><br></br>
                <input id="password" type="password" placeholder="password" value={password}
                    onChange={evt => setPassword(evt.target.value)}
                ></input><br></br>
                    {isLoginView ? 
                        <button onClick={loginClicked} disabled={isDisabled}>Login</button> : 
                        <button onClick={registerClicked} disabled={isDisabled}>Register</button>
                    } 
                {isLoginView ? 
                    <p onClick={() => setIsLoginView(false)}>You don't have an account? Register here!</p>
                    : 
                    <p onClick={() => setIsLoginView(true)}>You already have an account? Login</p>
                }
                {invalidLogin ? <h3>Invalid login. Please try again!</h3> : ''}
            </div>
        </div>
    )
}

export default Auth;