import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const [serialNumber, setSerialNumber] = useState("");
  const [accsesDone, setAccsesDone] = useState(false);
  const [serialNumberDefult, setSerialNumberDefult] =
    useState("123456787654321");
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    console.log(accsesDone);
    if (accsesDone) {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/users/register",
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
      }
    } else {
      event.preventDefault();
    }
  };
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
                  onChange={(e) => {
                    setSerialNumber(e.target.value);
                    e.target.value === serialNumberDefult
                      ? setAccsesDone(true)
                      : setAccsesDone(false);
                  }}
                />

                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">تسجيل الحساب</span>
                </button>
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
