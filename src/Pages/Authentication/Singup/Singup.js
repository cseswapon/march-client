import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
const Singup = () => {
    const { registerEmail, error, isLoading } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
     const onSubmit = (data) => {
         const newData = { ...data, role: "customer" };
       registerEmail(
         newData.email,
         newData.password,
         newData.name,
         newData.role,
         location,
         navigate
       );
       reset();
     };
    return (
      <section className="login-page">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="login-part">
                <h1 className="text-start my-3">Sing Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    required
                    placeholder="Enter Your Name"
                    {...register("name")}
                  />
                  <input
                    required
                    placeholder="Enter Your Email"
                    {...register("email")}
                  />
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {isLoading ? (
                    <input
                      className="btn btn-primary"
                      value="Loading.."
                      type="submit"
                    />
                  ) : (
                    <input
                      className="btn btn-primary"
                      value="Sing Up"
                      type="submit"
                    />
                  )}
                </form>
                {error && <p className="text-danger">{error}</p>}
                <p className="loginReg">
                  Already Register <Link to="/singin">Sing In</Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Singup;