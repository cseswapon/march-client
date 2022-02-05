import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({children}) => {
  const location = useLocation();
  const { users, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="login-from">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (users.email) {
    return children;
  }
  return <Navigate to="/singin" state={{ from: location }} />;
};

export default PrivateRoute;
