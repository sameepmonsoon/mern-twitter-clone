import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center my-8 space-y-5">
      <p className="font-semibold text-xl ">Error, Page not found</p>
      <p>Please Go to the home page</p>
      <p>
        <Link className="rounded-full bg-blue-400 text-white px-6 py-2" to="/">
          Go Back!
        </Link>
      </p>
    </div>
  );
};

export default Error;
