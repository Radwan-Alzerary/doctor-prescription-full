import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SideBarMenu from "./screens/global/SideBarMenu";
import MedicalReports from "./screens/medicalReports/MedicalReports";
import Partients from "./screens/patients/Partients";
import Dashboard from "./screens/dashboard/Dashboard";
import Pharmaceutical from "./screens/pharmaceutical/Pharmaceutical";
import Setting from "./screens/setting/Setting";

import Header from "./screens/global/Header";
import { IntlProvider } from "react-intl";
import arTranslations from "./lang/ar.json"; // Import the Arabic translations
import enTranslations from "./lang/en.json"; // Import the English translations
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // For cookies
import Category from "./screens/category/Category";
import PrescriptionsDesign from "./screens/prescriptions/PrescriptionsDesign";
import Login from "./screens/auth/Login";
import Chats from "./screens/chat/Chats";
import Register from "./screens/auth/Register";
import PrivateRoute from "./screens/auth/PrivateRoute";
import { useCookies } from "react-cookie";
import DoctorProfile from "./components/doctor/DoctorProfile";
import Tst from "./screens/global/tst";
import axios from "axios";
import Gpt from "./screens/global/Gpt";
import { Icon, IconButton } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { blue } from "@mui/material/colors";
import VoiceRecoed from "./screens/global/VoiceRecoed";
function Layout({ children }) {
  return (
    <div
      id="app"
      style={{
        display: "flex",
        height: "100%",
        minHeight: "100px",
        direction: "rtl",
      }}
    >
      <SideBarMenu />
      <main className="w-full">
        <Header />
        <div className="h-[92vh] relative bg-gray-100 w-full">{children}</div>
      </main>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });
  const [cookies, setCookies] = useCookies(["jwt"]); // Add "jwt" to the list of cookies you want to use
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.jwt); // Initialize isAuthenticated
  const [showGpt, setShowGpt] = useState(false); // Initialize isAuthenticated

  useEffect(() => {
    // This effect runs whenever cookies.jwt changes
    const isAuthenticated = !!cookies.jwt;
    // Update the isAuthenticated state when the "jwt" cookie changes
    setIsAuthenticated(isAuthenticated);
  }, [cookies.jwt]);

  const handleLanguageChange = (selectedLocale) => {
    setLocale(selectedLocale);
    Cookies.set("locale", selectedLocale);
  };

  const messages = locale === "en" ? enTranslations : arTranslations; // Get the translations based on the locale
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(true);

  const navigate = useNavigate();
  const [userAvailable, setUserAvailable] = useState(false);
  axios
    .get("http://localhost:5000/users/checkAvailable")
    .then((response) => {
      console.log(response.data);
      setUserAvailable(response.data);
      setIsLoaded(false);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });

  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        "http://localhost:5000/users",
        {},
        {
          withCredentials: true,
        }
      );
      setCurrentUser(data);
    };
    console.log(currentUser);
    verifyUser();
  }, [cookies, navigate]);
  return (
    <IntlProvider locale={locale} messages={messages}>
      {!isLoaded ? (
        userAvailable ? (
          <div
            id="app"
            style={{
              display: "flex",
              height: "100%",
              minHeight: "100px",
              direction: "rtl",
            }}
          >
            {isAuthenticated ? (
              <SideBarMenu
                currentUser={currentUser}
                onLanguageChange={handleLanguageChange}
              ></SideBarMenu>
            ) : (
              ""
            )}
            <main className="w-full">
              {isAuthenticated ? <Header></Header> : ""}

              <div className="h-[92vh] relative bg-[#F3F4F9] w-full">
                <Routes>
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/newcomputer" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/tst" element={<VoiceRecoed />} />
                  <Route exact path="/" element={<PrivateRoute />}>
                    <Route exact path="/" element={<Dashboard />}></Route>
                    <Route exact path="Chats" element={<Chats />} />
                    <Route
                      exact
                      path="dashboard"
                      element={<Dashboard />}
                    ></Route>
                    <Route
                      exact
                      path="medicalreports"
                      element={<MedicalReports />}
                    ></Route>
                    <Route exact path="patients" element={<Partients />} />
                    <Route
                      exact
                      path="pharmaceutical"
                      element={<Pharmaceutical />}
                    ></Route>
                    <Route exact path="category" element={<Category />}></Route>
                    <Route
                      exact
                      path="Prescriptiondesign"
                      element={<PrescriptionsDesign />}
                    ></Route>
                    <Route
                      exact
                      path="doctorprofile"
                      element={<DoctorProfile />}
                    ></Route>
                    <Route
                      exact
                      path="setting"
                      element={<Setting currentUser={currentUser} />}
                    ></Route>
                  </Route>
                </Routes>

                {isAuthenticated ? (
                  <div className=" z-50 absolute bottom-2 right-2">
                    {!showGpt ? (
                      <IconButton
                        onClick={() => {
                          setShowGpt(true);
                        }}
                        size="large"
                        sx={{ backgroundColor: blue[200], color: "black" }}
                      >
                        <QuizIcon></QuizIcon>
                      </IconButton>
                    ) : (
                      ""
                    )}

                    {showGpt ? (
                      <Gpt
                        onClick={() => {
                          setShowGpt(false);
                        }}
                      ></Gpt>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </main>
          </div>
        ) : (
          <div>
            <Register />
          </div>
        )
      ) : (
        ""
      )}
    </IntlProvider>
  );
}

export default App;
