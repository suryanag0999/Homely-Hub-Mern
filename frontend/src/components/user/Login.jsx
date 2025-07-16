import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../CSS/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../store/Users/user-action";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, errors, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getLogin({ email, password }));
  };

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    } else if (isAuthenticated) {
      toast.success("User logged in Successfully");
      navigate("/");
    }
  }, [isAuthenticated, errors, navigate]);

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          {loading && <LoadingSpinner />}

          <form onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to="/user/forgotPassword" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="loginbutton btn-block py-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <Link to="/signup" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
