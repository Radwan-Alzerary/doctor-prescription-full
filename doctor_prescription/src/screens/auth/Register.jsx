import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const [serialNumber, setSerialNumber] = useState("");
  const [accsesDone, setAccsesDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);
  const [result, setResult] = useState(null); // Track the result

  const [values, setValues] = useState({
    email: "",
    password: "",
    userName: "",
    expireDate: "",
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    console.log("accessDone");
    event.preventDefault();
    await checkToken(event);
  };
  const register = async (event) => {
    try {
      const currentURL = window.location.origin; // Get the current URL
      const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

      const { data } = await axios.post(
        `${serverAddress}/users/register`,
        {
          ...values,
        },
        { withCredentials: true }
      );
      console.log("Response data:", data); // Add this line
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          //   navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
      setErrorMsg(ex);
    }
  };
  const checkToken = async (event) => {
    const currentURL = window.location.origin; // Get the current URL
    const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

    try {
      const response = await axios.post(`${serverAddress}/checkToken`, {
        token: serialNumber,
      });
      console.log(response);

      if (response.data.result) {
        console.log("POST request successful:", response.data);
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + response.data.dayNum);

        // Update state without the callback
        setValues((prevValues) => ({
          ...prevValues,
          expireDate: futureDate,
        }));

        // Set the result to true after updating the state
        setResult(true);
      } else {
        setErrorMsg("التوكين غير صالح او منتهي الصلاحية");
        console.log("accessDone");
        setResult(false);
      }
    } catch (error) {
      setErrorMsg("التوكين غير صالح او منتهي الصلاحية");
      console.error("Error making POST request:", error);
      setResult(false);
    }
  };

  useEffect(() => {
    if (result === true) {
      console.log("Result is true");
      register();
      // Perform any additional actions here if needed
    }
  }, [result]);

  return (
    <form
      className=" h-screen w-screen bg-gray-700  text-gray-900 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className=" w-full bg-white shadow sm:rounded-lg flex flex-row justify-center items-center ">
        <div className=" w-2/5 h-screen">
          <img
            className="w-full h-full"
            src={process.env.PUBLIC_URL + "/loginSideImage.jpg"}
            alt=""
          ></img>
        </div>

        <div className=" w-3/5">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              تسجيل حساب جديد
            </h1>
            <div className="w-full flex-1">
              <div className="flex flex-col items-center"></div>
              <div className="">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  placeholder="Username"
                  name="userName"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  placeholder="serialNumber"
                  required
                  name="serialNumber"
                  value={serialNumber}
                  onChange={(e) => {
                    setSerialNumber(e.target.value);
                  }}
                />

                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">تسجيل الحساب</span>
                </button>
                <p>{errorMsg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </form>
  );
}

export default Register;
