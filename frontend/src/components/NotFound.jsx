import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <h3>Page not Found</h3>
      <p>
        Oops!! The page you are looking for might have been removed, had its
        name changed, or is temporarily unavailable.
      </p>
      <Link to="/">Go to home page</Link>
    </div>
  );
};

export default NotFound;
