import './Login.css'
import React, {useState} from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Login(props) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
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
        // back end login logic
        console.log(credentials)
    }

    //rendering form
    return (
        <div className="login-container">
            <Header/>
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