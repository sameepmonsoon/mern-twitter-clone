import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { HTTPMethods } from "../../Utils/HTTPMethods";
import { useDispatch } from "react-redux";
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
} from "../../Redux Store/userSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  let schema = yup.object().shape({
    username: yup.string().required("Username is Required."),
    password: yup.string().required("Password is required."),
    // @ts-ignore
    email: isSignIn ? yup.string().email().required("Email is required") : null,
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, action) => {
      console.log(values);
      dispatch(login());
      isSignIn
        ? HTTPMethods.post("/auth/signup", values)
        : HTTPMethods.post("/auth/signin", values)
            .then((res) => {
              console.log(res.data);

              dispatch(loginSuccess(res.data));
              navigate("/");
              setIsSignIn(false);
            })
            .catch((err) => {
              console.log(err);
              dispatch(loginFailure());
            });
    },
    validationSchema: schema,
  });

  return (
    <div className="flex flex-col justify-start items-center rounded-lg py-5 gap-y-4  w-[30rem] bg-slate-200 transition-all duration-[2s] linear">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-start items-center rounded-lg py-5 gap-y-4  w-[30rem]"
        onFocus={() => {
          setIsSignIn(false);
        }}>
        <h2>Sign in to Twitter</h2>
        <input
          type="text"
          placeholder="@username"
          onChange={formik.handleChange}
          name="username"
          className="bg-blue-200 px-4 rounded-full py-2 text-xl w-[20rem]"
        />
        <input
          type="password  "
          placeholder="password"
          name="password"
          onChange={formik.handleChange}
          className="bg-blue-200 px-4 rounded-full py-2 text-xl w-[20rem]"
        />
        <button
          className="rounded-full text-xl  px-4 py-2 text-white bg-blue-200 w-[20rem]"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            setIsSignIn(false);
          }}>
          Sign in
        </button>
      </form>
      <p>
        Don't have any account?{" "}
        <button onClick={() => setIsSignIn(true)}>Sign Up</button>{" "}
      </p>
      {isSignIn && (
        <form className="flex flex-col justify-start items-center rounded-lg py-5 gap-y-4  w-[30rem] absolute bg-inherit">
          <h2>Sign Up to Twitter</h2>
          <input
            type="text"
            placeholder="@username"
            name="username"
            onChange={formik.handleChange}
            className="bg-blue-200 px-4 rounded-full py-2 text-xl w-[20rem]"
          />
          <input
            type="email  "
            placeholder="email"
            name="email"
            onChange={formik.handleChange}
            className="bg-blue-200 px-4 rounded-full py-2 text-xl w-[20rem]"
          />
          <input
            type="password  "
            placeholder="password"
            name="password"
            onChange={formik.handleChange}
            className="bg-blue-200 px-4 rounded-full py-2 text-xl w-[20rem]"
          />
          <button
            className="rounded-full text-xl  px-4 py-2 text-white bg-blue-200 w-[20rem] "
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}>
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <button onClick={() => setIsSignIn(false)}>Sign In</button>{" "}
          </p>
        </form>
      )}
    </div>
  );
};

export default Form;
