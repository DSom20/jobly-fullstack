import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import UserContext from './UserContext';

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home">
      <div className="Home-text-container">
        <h1>Jobly</h1>
        <h3>Everone's favorite mock job board!</h3>
        <h3>Search for companies and jobs</h3>
        <h3>...and smash that APPLY button!</h3>
        {
          currentUser
            ? <h2>Welcome, {currentUser.username}!</h2>
            : (<div className="Home-link-container">
                <Link to="/login" >Log In</Link>
                <div className="Home-link-separator"/>
                <Link to="/signup">Sign Up</Link>
              </div>)
        }
      </div>

    </div>
  )
}

export default Home;