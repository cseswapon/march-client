import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const DescriptionAdmin = () => {
  const { users, logOut } = useAuth();
    return (
      <div className="container text-center">
        <h1 className="text-primary">Description with admin</h1>
        <button className="btn btn-danger" onClick={logOut}>
          Logout
        </button>{" "}
        <br />
        {!users.displayName && users.email && (
          <Link className="text-center" to="settask">
            Set task
          </Link>
        )}
        <br />
        {!users.displayName && users.email && (
          <Link className="text-center" to="alltask">
            All task
          </Link>
        )}
      </div>
    );
};

export default DescriptionAdmin;