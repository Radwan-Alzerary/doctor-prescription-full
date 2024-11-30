import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import SideBarMenu from "./screens/global/SideBarMenu";
import MedicalReports from "./screens/medicalReports/MedicalReports";
import Partients from "./screens/patients/Partients";
import Dashboard from "./screens/dashboard/Dashboard";
import Pharmaceutical from "./screens/pharmaceutical/Pharmaceutical";
import Setting from "./screens/setting/Setting";
import "quill/dist/quill.snow.css"; // Add css for snow theme

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
import axios from "axios";
import Gpt from "./screens/global/Gpt";
import { IconButton } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { blue } from "@mui/material/colors";
import VoiceRecoed from "./screens/global/VoiceRecoed";
import SurgenList from "./screens/surgeon/SurgenList";
import SurgenType from "./screens/surgeon/SurgenType";
import SurgenDevice from "./screens/surgeon/SurgenDevice";
import SurgenNarcosis from "./screens/surgeon/SurgenNarcosis";
import SurgenDate from "./screens/surgeon/SurgenDate";
import Eco from "./screens/Eco/Eco";
import CheckPrint from "./screens/Eco/CheckPrint";
import Group from "./screens/pharmaceutical/Group";
import BookedScreen from "./screens/booked/BookedScreen";
import AutoComplete from "./screens/AutoComplete/AutoComplete";
import ConstDisease from "./screens/constDisease/ConstDisease";
import FinancialScreen from "./screens/financial/FinancialScreen";
import NextVisitCalender from "./screens/dashboard/NextVisitCalender";

function App() {
  const location = useLocation();

  // Check if the current route is '/bookedScreen'
  const hideSidebarAndHeader = location.pathname === "/bookedScreen";
  console.log(location.pathname);

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
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first
  const [settingData, setSettingData] = useState({});

  useEffect(() => {
    const getSettingApi = () => {
      axios
        .get(`${serverAddress}/setting/getdata`)
        .then((response) => {
          setSettingData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    getSettingApi();
  }, []);

  axios
    .get(`${serverAddress}/users/checkAvailable`)
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
      const currentURL = window.location.origin; // Get the current URL
      const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

      const { data } = await axios.post(
        `${serverAddress}/users`,
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
            {isAuthenticated && !hideSidebarAndHeader ? (
              <SideBarMenu
                currentUser={currentUser}
                onLanguageChange={handleLanguageChange}
              ></SideBarMenu>
            ) : (
              ""
            )}
            <main className="w-full">
              {isAuthenticated && !hideSidebarAndHeader ? (
                <Header></Header>
              ) : (
                ""
              )}

              <div className="h-[92vh] relative bg-[#F3F4F9] w-full">
                <Routes>
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/newcomputer" element={<Register />} />
                  <Route
                    exact
                    path="/bookedScreen"
                    element={<BookedScreen />}
                  />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/tst" element={<VoiceRecoed />} />
                  <Route exact path="/eco" element={<Eco />} />
                  <Route
                    exact
                    path="/autocomplete"
                    element={<AutoComplete />}
                  />
                  <Route exact path="/group" element={<Group />} />
                  <Route
                    exact
                    path="/constdisease"
                    element={<ConstDisease />}
                  />
                  <Route exact path="/checkeco" element={<CheckPrint />} />
                  <Route exact path="/" element={<PrivateRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route exact path="surgen">
                      <Route exact path="list" element={<SurgenList />}></Route>
                      <Route exact path="type" element={<SurgenType />}></Route>
                      <Route
                        exact
                        path="calender"
                        element={<SurgenDate />}
                      ></Route>
                      <Route
                        exact
                        path="device"
                        element={<SurgenDevice />}
                      ></Route>
                      <Route
                        exact
                        path="Narcosis"
                        element={<SurgenNarcosis />}
                      ></Route>
                    </Route>

                    <Route exact path="Chats" element={<Chats />} />
                    <Route exact path="PriceCheck" element={<FinancialScreen />} />
                    <Route
                      exact
                      path="dashboard"
                      element={<Dashboard />}
                    ></Route>
                    <Route
                      exact
                      path="NextVisitCalender"
                      element={<NextVisitCalender />}
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
                {settingData.spesialLogo ? (
                  isAuthenticated ? (
                    <>
                      <div className="z-50 flex justify-center items-center absolute -top-16 border-blue-300 right-[45%] w-32 h-20 rounded-lg bg-[#ffffffb7] border-2 border-spacing-11">
                        <img
                          className="logo w-[90%]"
                          src={process.env.PUBLIC_URL + "/sponserlogo.png"}
                          alt="Sponsor Logo"
                        />
                      </div>
                      <div className="z-50 flex justify-center items-center absolute -top-16 border-blue-300 right-[54%] w-32 h-20 rounded-lg bg-[#ffffffb7] border-2 border-spacing-11">
                        <img
                          className="logo w-[90%]"
                          src={process.env.PUBLIC_URL + "/sponserlogo2.png"}
                          alt="Sponsor Logo"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="z-50 flex justify-center items-center absolute -top-0 border-blue-300 right-[45%] w-32 h-20 rounded-lg bg-[#ffffffb7] border-2 border-spacing-11">
                        <img
                          className="logo w-[90%]"
                          src={process.env.PUBLIC_URL + "/sponserlogo.png"}
                          alt="Sponsor Logo"
                        />
                      </div>
                      <div className="z-50 flex justify-center items-center absolute -top-0 border-blue-300 right-[54%] w-32 h-20 rounded-lg bg-[#ffffffb7] border-2 border-spacing-11">
                        <img
                          className="logo w-[90%]"
                          src={process.env.PUBLIC_URL + "/sponserlogo2.png"}
                          alt="Sponsor Logo"
                        />
                      </div>
                    </>
                  )
                ) : (
                  ""
                )}
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
