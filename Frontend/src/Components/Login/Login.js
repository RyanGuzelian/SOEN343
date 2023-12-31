import './Login.css'
import React, {useState} from 'react'
import Footer from "../Footer/Footer";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    //updates credentials when a user types in one of the input fields
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentials({
            ...credentials, [name]: value
        })
    }

    //submit the form
    const handleSubmit = (event) => {
        event.preventDefault()
        // back end login logic to check valid user
        navigate('/home')
        console.log(credentials)
    }

    //rendering form
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Footer/>
        </div>

    )
}

export default Login