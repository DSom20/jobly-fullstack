import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import Alert from './Alert';
import JoblyApi from "./helpers/JoblyApi";
import { Link, useHistory } from 'react-router-dom';
import UserContext from './UserContext';
import './SignUp.css';


const INITIAL_STATE = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: ""
}

function SignUp() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();
  const { logIn } = useContext(UserContext);
  const [alerts, setAlerts] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({
      ...oldFormData,
      [name]: value
    }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const resp = await JoblyApi.signUp(formData)
    if (!resp.token) {
      setAlerts(resp.map(message => <Alert key={uuid()} text={message} />));
    } else {
      logIn(resp);
      history.push('/jobs')
    }
  }

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form className="SignUp-form">
        <div>
          <label htmlFor="username">Username</label>
          <input id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input id="first_name"
            name="first_name"
            type="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input id="last_name"
            name="last_name"
            type="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <div className="SignUp-registered">
        <Link to="/login">Already registered? Log in here</Link>
        </div>
        {alerts}
      </form>
    </div>
  )
}

export default SignUp;