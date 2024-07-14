import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  interface AxiosResponse {
    token?: string;
  }
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  async function sendRequest() {
    try {
      const endpoint = type === "signup" ? "register" : "login";
      const response = await axios.post<AxiosResponse>(
        `${BACKEND_URL}/api/auth/${endpoint}`,
        {
          ...postInput,
        }
      );

      if (type === "signin" && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/blogs");
        toast.success("Logged in successfully!");
      } else if (type === "signup") {
        toast.success("Registered successfully! Please login.");
        navigate("/Signin");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, key)) {
            toast.error(errors[key]);
          }
        }
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    }
  }

  return (
    <div className=" h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className=" px-10">
            <div className=" text-2xl font-extrabold ">
              {type === "signup"
                ? "Create an account"
                : "Already have an Account"}
            </div>
            <div
              className={
                type === "signin" ? "ml-4 text-slate-400" : "text-slate-400"
              }
            >
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className=" text-blue-400 underline pl-2"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signin" ? "SignUp" : "Login"}
              </Link>
            </div>
          </div>

          <div>
            {type === "signin" ? null : (
              <LabelledInput
                label="Name"
                placeholder="name..."
                onChange={(e) => {
                  setPostInput({
                    ...postInput,
                    name: e.target.value,
                  });
                }}
              />
            )}

            <LabelledInput
              label="Email"
              placeholder="Email@yourmail.com"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="Pasword.."
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />

            {type === "signin" ? null : (
              <LabelledInput
                label="password_confirmation"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="confirm_Pass..."
                onChange={(e) => {
                  setPostInput({
                    ...postInput,
                    password_confirmation: e.target.value,
                  });
                }}
              />
            )}
          </div>
          <div>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={isPasswordVisible}
                onChange={togglePasswordVisibility}
              />
              <span className="text-sm text-gray-600">Show password</span>
            </label>
          </div>
          <button
            onClick={sendRequest}
            type="button"
            className=" w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: Readonly<LabelledInputType>) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-900 ">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

export default Auth;
