import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import "./Singin.css";
const Singin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { logIn,users, error, isLoading } = useAuth();
  const onSubmit = (data) => {
    logIn(data.email, data.password, location, navigate);
    reset();
  };
  return (
    <section className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="login-part">
              <h1 className="text-start my-3">Sing In</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input required placeholder="Email" {...register("email")} />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {isLoading ? (
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Loading..."
                    disabled
                  />
                ) : (
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Sing In"
                  />
                )}
              </form>
              {error && <p className="text-danger">{error}</p>}
              <p className="loginReg">
                Already Login <Link to="/singup">Sing up</Link>{" "}
              </p>
            </div>
          </div>
        </div>
        {users.email&& <Link to="/home">Go to Home</Link>}
      </div>
    </section>
  );
};

export default Singin;
