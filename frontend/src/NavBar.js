import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import './NavBar.css';

function NavBar() {
  const { currentUser, logOut } = useContext(UserContext);
  
  const loggedInJSX = (
    <nav className="NavBar">
      <NavLink exact className="NavBar-home" to='/'>Jobly</NavLink>
      <NavLink to='/jobs'>Jobs</NavLink>
      <NavLink to='/companies'>Companies</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink activeClassName="ignoreActive" exact to='/' onClick={logOut}>Log out</NavLink>
    </nav>

  )

  const loggedOutJSX = (
    <nav className="NavBar">
      <NavLink exact className="NavBar-home" to='/'>Jobly</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </nav>
  )
  
  return currentUser ? loggedInJSX : loggedOutJSX
}

export default NavBar;