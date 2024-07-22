import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const currentURL = window.location.origin; // Get the current URL
      const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

      const { data } = await axios.post(
        `${serverAddress}/users/login`,
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          console.log(data.errors);
          const { email, password } = data.errors;
          if (email) {
            setErrorMsg(email);

            generateError(email);
          } else if (password) {
            setErrorMsg(password);
            generateError(password);
          }
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
      setErrorMsg(ex);
    }
  };
  return (
    <form
      className=" h-screen w-screen bg-gray-700  text-gray-900 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className=" w-full bg-white shadow sm:rounded-lg flex flex-row justify-center items-center ">
        <div class=" w-3/5">
          <div class="w-full flex flex-col items-center">
            <h1 class="text-2xl xl:text-3xl font-extrabold">تسجيل الدخول</h1>
            <div class="w-full flex-1">
              <div class="flex flex-col items-center"></div>
              <div class="">
                <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
                <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
                <button class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span class="ml-3">تسجيل الدخول</span>
                </button>
                <p className=" text-center text-red-500">{errorMsg}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-2/5 h-screen">
          <img
            className="w-full h-full"
            src={process.env.PUBLIC_URL + "/loginSideImage.jpg"}
            alt=""
          ></img>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </form>
  );
}

export default Login;
