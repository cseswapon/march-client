import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const {users} = useAuth()
    return (
      <>
        <div className="container my-5">
          <h1 className="text-danger">Welcome To Our site</h1>
          {users.displayName && users.email ? (
            <Link to="/user">
              Click User Dashboard
            </Link>
          ) : (
            <Link to="/admin">
              Click Admin Dashboard
            </Link>
          )}
          <br />
        </div>
      </>
    );
};

export default Home;