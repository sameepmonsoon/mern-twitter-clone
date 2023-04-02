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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CgSpinner, CgSpinnerTwo } from "react-icons/cg";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState("password");
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let schema = yup.object().shape({
    username: yup.string().required("Username is Required."),
    password: yup
      .string()
      .min(6, "At least 6 characters required.")
      .required("Password is required"),
    // @ts-ignore
    email: isSignIn ? yup.string().email().required("Email is required") : null,
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: (values, action) => {
      setIsLoading(true);
      dispatch(login());
      isSignIn
        ? HTTPMethods.post("/auth/signup", values)
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              dispatch(loginSuccess(res.data));
              setTimeout(() => {
                navigate("/");
                setIsSignIn(false);
                setIsLoading(!false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);

              dispatch(loginFailure());
            })
        : HTTPMethods.post("/auth/signin", values)
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              dispatch(loginSuccess(res.data));
              setTimeout(() => {
                navigate("/");
                setIsSignIn(false);
                setIsLoading(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);

              dispatch(loginFailure());
            });
    },
    validationSchema: schema,
  });
  const handleEyeToggle = () => {
    if (togglePassword == "password") setTogglePassword("text");
    else setTogglePassword("password");
  };
  return (
    <div className="flex flex-col justify-start items-center rounded-lg py-5 gap-y-4  w-[30rem]  transition-all duration-[2s] linear">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-start items-center rounded-lg py-5 gap-y-10  w-[30rem]"
        onFocus={() => {
          setIsSignIn(false);
        }}>
        <h2 className="text-[30px] capitalize font-[500]">
          Sign in to Twitter
        </h2>

        <input
          type="text"
          placeholder={
            formik.touched && formik.errors.username
              ? formik.errors.username
              : "Username"
          }
          onChange={formik.handleChange}
          name="username"
          className={` px-4 capitalize rounded-[4px] py-2 text-xl font-[400] text-black/60 w-[20rem] h-[3.4rem] border-[1px] outline-black focus:outline-[1px] focus:border-0 focus:outline-blue-300 ${
            formik.touched && formik.errors.username
              ? " placeholder-red-600 border-1 border-red-500 focus:outline-red-500"
              : ""
          }`}
        />
        <span className="relative flex justify-between">
          <input
            type={togglePassword}
            placeholder="password"
            name="password"
            onChange={formik.handleChange}
            className={` px-4 capitalize rounded-[4px] py-2 text-xl font-[400] text-black/60 w-[20rem] pr-10 h-[3.4rem] border-[1px] outline-black focus:outline-[1px] focus:border-0 focus:outline-blue-300
          `}
          />
          <span
            className="absolute right-2 top-4 cursor-pointer text-black/60"
            onClick={handleEyeToggle}>
            {togglePassword == "password" ? (
              <AiOutlineEye size={25} />
            ) : (
              <AiOutlineEyeInvisible size={25} />
            )}
          </span>
        </span>
        <button
          className="bg-black text-white font-[500] tracking-wide px-4 rounded-full mt-5 py-2  text-xl w-[20rem] h-[3rem]"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            setIsSignIn(false);
          }}>
          {isLoading ? (
            <span className="animate-spin flex justify-center items-center">
              <CgSpinner size={25} />
            </span>
          ) : (
            <>Sign In</>
          )}
        </button>
      </form>
      <p>
        Don't have any account?
        <button
          onClick={() => {
            setIsSignIn(true);
            formik.resetForm();
          }}
          className="ml-2 text-blue-600 hover:text-blue-500 underline">
          Sign Up
        </button>{" "}
      </p>
      {isSignIn && (
        <form className="flex flex-col justify-start items-center rounded-lg py-5 gap-y-8  w-[30rem] absolute bg-white">
          <h2 className="text-[30px] capitalize font-[500]">
            Sign Up to Twitter
          </h2>
          <input
            type="text"
            placeholder={
              formik.touched && formik.errors.username
                ? formik.errors.username
                : "Username"
            }
            onChange={formik.handleChange}
            name="username"
            className={` px-4 capitalize rounded-[4px] py-2 text-xl font-[400] text-black/60 w-[20rem] h-[3.4rem] border-[1px] outline-black focus:outline-[1px] focus:border-0 focus:outline-blue-300 ${
              formik.touched && formik.errors.username
                ? " placeholder-red-600 border-1 border-red-500 focus:outline-red-500"
                : ""
            }`}
            maxLength={25}
          />
          <input
            type="email"
            placeholder={
              formik.touched && formik.errors.email
                ? formik.errors.email
                : "Email"
            }
            onChange={formik.handleChange}
            name="email"
            className={` px-4 capitalize rounded-[4px] py-2 text-xl font-[400] text-black/60 w-[20rem] h-[3.4rem] border-[1px] outline-black focus:outline-[1px] focus:border-0 focus:outline-blue-300 ${
              formik.touched && formik.errors.username
                ? " placeholder-red-600 border-1 border-red-500 focus:outline-red-500"
                : ""
            }`}
            maxLength={25}
          />
          <span className="relative flex justify-between">
            <input
              type={togglePassword}
              placeholder={
                formik.touched && formik.errors.password
                  ? formik.errors.password
                  : "password"
              }
              name="password"
              onChange={formik.handleChange}
              className={` px-4 capitalize rounded-[4px] py-2 text-xl font-[400]  pr-10 text-black/60 w-[20rem] h-[3.4rem] border-[1px] outline-black focus:outline-[1px] focus:border-0 focus:outline-blue-300 ${
                formik.touched && formik.errors.password
                  ? " placeholder-red-600 border-1 border-red-500 focus:outline-red-500"
                  : ""
              }`}
              maxLength={11}
            />
            <span
              className="absolute right-2 top-4 cursor-pointer text-black/60"
              onClick={handleEyeToggle}>
              {togglePassword == "password" ? (
                <AiOutlineEye size={25} />
              ) : (
                <AiOutlineEyeInvisible size={25} />
              )}
            </span>
          </span>
          <button
            className="hover:opacity-90 bg-black text-white font-[500] tracking-wide px-4 rounded-full mt-5 py-2 text-xl w-[20rem] h-[3rem]"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}>
            {isLoading ? (
              <span className="animate-spin flex justify-center items-center">
                <CgSpinner size={25} />
              </span>
            ) : (
              <>Sign Up</>
            )}
          </button>
          <p className="">
            Already have an account?
            <button
              onClick={() => {
                setIsSignIn(false);
                formik.resetForm();
              }}
              className="ml-2 text-blue-600 hover:text-blue-500 underline">
              Sign in
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Form;
