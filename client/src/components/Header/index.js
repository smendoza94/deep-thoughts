import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>
        {/* Whenever a page renders the <Header> component, which should be on every 
        single page because it's rendered by the <App> component, we check to see if 
        the user is logged in and return navigation items depending on the result. 
        This is just another good case of using ternary operators to conditionally 
        render React data based on the status of a specific function or data. */}
        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
