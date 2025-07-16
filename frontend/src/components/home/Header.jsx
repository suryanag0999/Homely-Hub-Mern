import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/Users/user-action";
import { propertyAction } from "../../store/property/property-slice";
import { getAllProperties } from "../../store/property/property-action";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    toast.success("user loggedout succesfully");
    navigate("/");
  };

  const refreshFunction = () => {
    dispatch(propertyAction.updateSearchparams({}));
    dispatch(getAllProperties());
  };
  return (
    <>
      <nav className="header row sticky-top ">
        <Link to="/"></Link>
        <Link to="/" onClick={refreshFunction}>
          <img src="/assets/logo.png" alt="logo" className="logo" />
        </Link>

        <div className="search_filter">
          <Search />
          <Filter />
        </div>
        {!isAuthenticated && !user && (
          <Link to="/login">
            <span className="material-symbols-outlined web_logo">
              account_circle
            </span>
          </Link>
        )}
        {isAuthenticated && user && (
          <div className="dropdown">
            <span
              className="material-symbols-outlined web_logo dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.avatar.url && (
                <img
                  src={user.avatar.url}
                  className="user-img rounded-circle w-25 hh-25"
                  alt="icon"
                />
              )}
              {!user.avatar.url === "" && "account_circle"}
            </span>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="/profile">
                  My account
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutUser}
                >
                  logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};
export default Header;
