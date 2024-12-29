import {
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { allUsersRoute, host } from "../../util/APIRoutes";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BiotechIcon from "@mui/icons-material/Biotech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { io } from "socket.io-client";
import {
  Add,
  ArrowDropDown,
  ArrowDropUp,
  AttachMoney,
  Book,
  Delete,
  Edit,
  Female,
  Male,
  SwapVert,
} from "@mui/icons-material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NewPartientsForm from "../../components/Partients/NewPartientsForm";
import NewPatientForm from "../../components/Partients/NewPatientForm";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";
import BillTable from "../../components/Partients/BillTable";
import axios from "axios";
import { blue, green, purple, red, yellow } from "@mui/material/colors";
import { useReactToPrint } from "react-to-print";
import PatientReport from "../global/PatientReport";
import NewMedicalReporyForm from "../../components/Partients/NewMedicalReporyForm";
import PartientsProfile from "../../components/Partients/PartientsProfile";
import EditPatientForm from "../../components/Partients/EditPatientForm";
import MedicalForm from "../../components/Partients/MedicalForm";
import AddLaboratoryExamination from "../../components/Partients/AddLaboratoryExamination";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";
import DateRangePickerComp from "../global/DateRangePickerComp";
import Loading from "../../components/pageCompond/Loading";
import CancelAlert from "../../components/pageCompond/CancelAlert";
import DeleteAlert from "../../components/pageCompond/DeleteAlert";
import VisitForm from "../../components/Partients/VisitForm";
import { FixedSizeList as List } from "react-window";
import PaymentVisit from "../../components/Partients/PaymentVisit";

const Row = React.memo(
  ({
    row,
    index,
    pageSelect,
    settingData,
    onNameClickHandle,
    onBookedHandel,
    onVisitFormShowHandel,
    onMedicalFormShowHandle,
    onPrescriptionShowHande,
    onReportShowHandel,
    onLaboryShowHandel,
    onEditHande,
    onCurrencyVisitHandel,
    onDeleteHande,
    onPrescriptionEditHandel,
    onPrescriptionDeleteHande,
    currentUser,
  }) => {
    const [open, setOpen] = useState(false);

    const getPharmaceuticalName = (params) => {
      const pharmaceuticalArray = params;
      if (pharmaceuticalArray) {
        const pharmaceuticalNames = pharmaceuticalArray.map((item) => {
          if (item.id !== null) {
            return item.id.name;
          }
          return "لا يوجد";
        });
        return pharmaceuticalNames.join(", ");
      } else {
        return "";
      }
    };
    const isBeforeFreeVisitDate = (freeVisitDate) => {
      return new Date() < new Date(freeVisitDate);
    };



    return (
      <React.Fragment>
        <TableRow
          className={` ${row.booked ? "bg-green-200 hover:bg-green-100" : "hover:bg-blue-50"
            }`}
          sx={{ "& > *": { borderBottom: "unset" } }}
        >
          <TableCell>{index + 1 + 20 * (pageSelect - 1)}</TableCell>
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientName ? (
            <TableCell
              className=" cursor-pointer hover:bg-blue-100"
              onClick={() => {
                onNameClickHandle(row._id);
              }}
              component="th"
              scope="row"
              align="center"
            >
              <div className={`flex ${row.freeVisitDate
                  ? (() => {
                    // Parse the freeVisitDate
                    const freeVisitDate = new Date(row.freeVisitDate);
                    // Get the number of days to subtract
                    const visitNumberOfDays = settingData.finanical.visitNumberOfDaysForFreeReview;
                    // Create a new date by subtracting the specified number of days
                    const todayCheck = new Date(freeVisitDate);
                    todayCheck.setDate(freeVisitDate.getDate() - visitNumberOfDays);
                    // Get today's date
                    const today = new Date();
                    // Normalize both dates to midnight to ignore time differences
                    today.setHours(0, 0, 0, 0);
                    todayCheck.setHours(0, 0, 0, 0);
                    // Calculate the difference in days
                    const diffTime = todayCheck - today;
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);

                    // Debugging logs (optional)
                    console.log('freeVisitDate:', freeVisitDate);
                    console.log('todayCheck:', todayCheck);
                    console.log('today:', today);
                    console.log('diffDays:', diffDays);

                    // Determine the class based on the difference
                    if (diffDays === 0) {
                      return 'text-green-400';
                    } else if (diffDays < 0) {
                      return 'text-purple-400';
                    } else {
                      return ''; // No additional class
                    }
                  })()
                  : ''
                } justify-center items-center gap-4 font-bold text-base`}

              >
                {row.name}

                {row.bookedPriority > 0 ? (
                  <div className=" bg-cyan-500 rounded-full w-8 h-8 flex justify-center items-center">
                    {row.bookedPriority}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientDate ? (
            <TableCell component="th" scope="row" align="center">
              <div className="bg-green-100 w-full flex justify-center items-center h-6 rounded-full">
                {new Date(row.updatedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientAge ? (
            <TableCell component="th" scope="row" align="center">
              {settingData &&
                settingData.patientsTable &&
                settingData.patientsTable.patientAgeYear ? (
                <div>{row.age ? row.age : 0} سنة</div>
              ) : (
                ""
              )}
              {settingData &&
                settingData.patientsTable &&
                settingData.patientsTable.patientAgeMonth ? (
                <div>{row.monthAge ? row.monthAge : 0} شهر</div>
              ) : (
                ""
              )}
              {settingData &&
                settingData.patientsTable &&
                settingData.patientsTable.patientAgeDay ? (
                <div>{row.dayAge ? row.dayAge : 0} يوم</div>
              ) : (
                ""
              )}
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientGender ? (
            <TableCell component="th" scope="row" align="center">
              <div
                className={`p-0.5 rounded-full  ${row.gender === "ذكر"
                  ? "bg-blue-200 hover:bg-blue-300"
                  : "bg-pink-200 hover:bg-pink-300"
                  }`}
              >
                {row.gender === "ذكر" ? (
                  <Male className=" text-blue-700"></Male>
                ) : (
                  <Female className=" text-pink-700"></Female>
                )}
              </div>
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientAdresses ? (
            <TableCell component="th" scope="row" align="center">
              {row.adresses}
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientSequance ? (
            <TableCell component="th" scope="row" align="center">
              {row.Sequence}
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientWeghit ? (
            <TableCell component="th" scope="row" align="center">
              {row.weight ? row.weight + "kg" : ""}
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientLeanth ? (
            <TableCell component="th" scope="row" align="center">
              {row.length ? row.length + "cm" : ""}
            </TableCell>
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientVisitNum ? (
            <TableCell component="th" scope="row" align="center">
              {row.visitDate.length}
            </TableCell>
          ) : (
            ""
          )}
          {currentUser ? (
            currentUser.role === "doctor" ? (
              <>
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAddVisit ? (
                  <TableCell align="center">
                    <IconButton
                      sx={{ color: blue[800] }}
                      onClick={() => {
                        onVisitFormShowHandel(row._id);
                      }}
                      aria-label="delete"
                    >
                      <ChromeReaderModeIcon
                        aria-label="expand row"
                        size="small"
                      ></ChromeReaderModeIcon>
                    </IconButton>
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAddMedicalData ? (
                  <TableCell align="center">
                    <IconButton
                      sx={{ color: blue[800] }}
                      onClick={() => {
                        onMedicalFormShowHandle(row._id);
                      }}
                      aria-label="delete"
                    >
                      <ContentPasteIcon
                        aria-label="expand row"
                        size="small"
                      ></ContentPasteIcon>
                    </IconButton>
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAddPrescription ? (
                  <TableCell align="center">
                    <IconButton
                      sx={{ color: yellow[800] }}
                      className=" hover:text-yellow-500"
                      onClick={() => {
                        onPrescriptionShowHande(row._id);
                      }}
                      aria-label="delete"
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/rx-icon.svg"}
                        alt=""
                        className="w-7 h-7"
                      />
                    </IconButton>
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAddReport ? (
                  <TableCell align="center">
                    <IconButton
                      sx={{ color: blue[800] }}
                      onClick={() => {
                        onReportShowHandel(row._id);
                      }}
                      aria-label="delete"
                    >
                      <SummarizeIcon
                        aria-label="expand row"
                        size="small"
                      ></SummarizeIcon>
                    </IconButton>
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAddLaboryTest ? (
                  <TableCell align="center">
                    <IconButton
                      sx={{ color: blue[800] }}
                      onClick={() => {
                        onLaboryShowHandel(row._id);
                      }}
                      aria-label="delete"
                    >
                      <BiotechIcon size={"small"} />
                    </IconButton>
                  </TableCell>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {settingData &&
            settingData.patientsTable &&
            settingData.patientsTable.patientOption ? (
            <TableCell align="center">
              {settingData &&
                settingData.patientsTable &&
                settingData.patientsTable.patientBooked ? (
                <IconButton
                  sx={{ color: purple[400] }}
                  className=" hover:text-purple-600"
                  onClick={() => onBookedHandel(row._id)}
                  aria-label="delete"
                >
                  <Book fontSize="inherit" />
                </IconButton>
              ) : (
                ""
              )}
              {currentUser ? (
                currentUser.role === "doctor" ? (
                  <>
                    <IconButton
                      onClick={() => {
                        onDeleteHande(row._id);
                      }}
                      sx={{ color: red[400] }}
                      className=" hover:text-red-600"
                      aria-label="delete"
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>

                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <IconButton
                sx={{ color: blue[400] }}
                className=" hover:text-blue-600"
                onClick={() => {
                  onEditHande(row._id);
                }}
                aria-label="delete"
              >
                <Edit aria-label="expand row" size="small"></Edit>
              </IconButton>
              <IconButton
                sx={{ color: green[400] }}
                className=" hover:text-blue-600"
                onClick={() => {
                  onCurrencyVisitHandel(row._id);
                }}
                aria-label="delete"
              >
                <AttachMoney aria-label="expand row" size="small"></AttachMoney>
              </IconButton>
            </TableCell>
          ) : (
            ""
          )}
          {currentUser ? (
            currentUser.role === "doctor" ? (
              <>
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientPrescriptionView ? (
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </TableRow>
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
            colSpan={16}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  className=" text-right font-bold"
                  gutterBottom
                  component="div"
                >
                  تاريخ الفحوصات
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">عدد الادوية</TableCell>
                      <TableCell align="center">التشخيص</TableCell>
                      <TableCell align="center">التاريخ</TableCell>
                      <TableCell align="center">الادوية</TableCell>
                      <TableCell align="center">الخيارات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.prescription.map((prescription) => (
                      <TableRow
                        key={prescription._id}
                        className="hover:bg-gray-50"
                        onClick={() => {
                          if (settingData.openEditPrescriptionByClick) {
                            onPrescriptionEditHandel(row._id, prescription._id);
                          }
                        }}
                      >
                        <TableCell align="center">{prescription.pharmaceutical.length}</TableCell>
                        <TableCell align="center">{prescription.MedicalDiagnosis}</TableCell>
                        <TableCell align="center">
                          {prescription.createdAt ? prescription.createdAt : ""}
                        </TableCell>
                        <TableCell align="center">
                          {getPharmaceuticalName(prescription.pharmaceutical)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation(); // Stop event propagation
                              onPrescriptionDeleteHande(row._id, prescription._id);
                            }}
                            sx={{ color: red[400] }}
                            className=" hover:text-red-600"
                            aria-label="delete"
                          >
                            <Delete fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation(); // Stop event propagation
                              onPrescriptionEditHandel(row._id, prescription._id);
                            }}
                            sx={{ color: blue[400] }}
                            className=" hover:text-red-600"
                            aria-label="edit"
                          >
                            <Edit fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
);

function Partients() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [profileRefresh, setProfileRefresh] = useState(false);
  const [showPartientsAddForm, setShowPartientsAddForm] = useState(false);
  const [showPartientsEditForm, setShowPartientsEditForm] = useState(false);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showPaymentVisitForm, setShowPaymentVisitForm] = useState(false);
  const [showLaporyReportForm, setShowLaporyReportForm] = useState(false);
  const [showPartientProfile, setShowPartientProfile] = useState(false);
  const [showMidicalForm, setShowMidicalForm] = useState(false);
  const [userEditData, setUserEditData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showReportEditForm, setShowReportEditForm] = useState(false);
  const [showLabReportEditForm, setShowLabReportEditForm] = useState(false);
  const [showVisitReportEditForm, setShowVisitReportEditForm] = useState(false);
  const [nextVisit, setNextVisit] = useState("");

  const [ShowPaymentEditVisitForm, setShowPaymentEditVisitForm] = useState(false);


  const [partientsSelectId, setPartientsSelectId] = useState("");
  const [PrescriptionId, setPrescriptionId] = useState("");
  const [pharmaceList, setPharmaceList] = useState([]);
  const [pharmaceListInside, setPharmaceListInside] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [inTakeTimeList, setInTakeTime] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [constantDiseases, setConstantDiseases] = useState([]);
  const [prints, setprints] = useState(false);
  const [dataToPrint, setDataToPrint] = useState([]);
  const [medicalReportsStype, setMedicalReportsStype] = useState([]);
  const [editPrescriptionData, setEditPrescriptionData] = useState({});
  const [ageQuery, setAgeQuery] = useState("");
  const [genderQuery, setGenderQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [dateQuery, setDateQuery] = useState("");
  const [settingData, setSettingData] = useState({});
  const [deleteInfo, setDeleteInfo] = useState({ id: "", type: "" });

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canceleAlert, setCanceleAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [range, setRange] = useState([
    {
      key: "selection",
    },
  ]);

  const [queryType, setQueryType] = useState("");
  const [queryOrder, setQueryOrder] = useState("asc");

  const socket = useRef();

  const [groupList, setGroupList] = useState();
  const [selectedReport, setSelectedReport] = useState({});
  const [selectedaLabory, setSelectedaLabory] = useState({});
  const currentURL = window.location.origin;
  const serverAddress = currentURL.replace(/:\d+/, ":5000");
  const [midscapeData, setMidscapeData] = useState([]);
  const [pageSelect, SetPageSelect] = useState(1);
  const [patientCount, setPatientCount] = useState(20);

  const barcodeRef = useRef("");
  const timeoutRef = useRef(null);
  const [orginBarcode, setOrginBarcode] = useState("");
  const [barcode, setBarcode] = useState("");

  const getPatientsList = useCallback(() => {
    axios
      .get(`${serverAddress}/patients/getall/${pageSelect}`, {
        params: {
          sort: queryType,
          order: queryOrder,
        },
      })
      .then((response) => {
        setPatientsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [pageSelect, queryOrder, queryType, serverAddress]);

  const getPatientsCount = useCallback(() => {
    axios
      .get(`${serverAddress}/patients/getcount/`)
      .then((response) => {
        setPatientCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  const handleScannerHandle = () => {
    axios
      .post("http://localhost:3200/scan", {
        id: partientsSelectId,
      })
      .then((response) => {
        setProfileRefresh(!profileRefresh);
      })
      .catch((error) => {
        console.error(
          "Error posting to localhost, trying serverAddress:",
          error
        );
        // If there's an error with localhost, try posting to the server address
        axios
          .post(`${serverAddress}/patients/scan/`, {
            id: partientsSelectId,
          })
          .then((response) => {
            setProfileRefresh(!profileRefresh);
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
      });
  };

  const handleReportDelete = useCallback(
    (id) => {
      if (settingData.abortProssesMsg) {
        setDeleteInfo({ id: id, type: "reportDelete" });
        setDeleteAlert(true);
      } else {
        axios
          .delete(`${serverAddress}/medicalreports/delete/${id}/`)
          .then((response) => {
            setProfileRefresh(!profileRefresh);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      }
    },
    [profileRefresh, serverAddress, settingData.abortProssesMsg]
  );

  const onImageDeleteHandle = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/patients/images/delete`, {
          id: partientsSelectId,
          imageUrl: data,
        })
        .then((response) => {
          setProfileRefresh(!profileRefresh);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [partientsSelectId, profileRefresh, serverAddress]
  );

  useEffect(() => {
    const socketConnection = io(host);
    socketConnection.on("book-received", (data) => {
      getPatientsList();
    });
    socketConnection.on("new-patient", (data) => {
      getPatientsList();
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const onBookedHandel = useCallback(
    (id) => {
      axios
        .post(`${serverAddress}/patients/bookPatents`, {
          id: id,
        })
        .then((response) => {
          socket.current.emit("send-book", {
            to: "",
          });
          getPatientsList();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [serverAddress]
  );

  const handleEditReportData = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/medicalreports/editone`, {
          id: selectedReport._id,
          data: data,
        })
        .then((response) => {
          setProfileRefresh(!profileRefresh);
          setShowReportEditForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [selectedReport._id, profileRefresh, serverAddress]
  );

  const handleReportEdit = useCallback(
    (id) => {
      axios
        .get(`${serverAddress}/medicalreports/getone/${id}`)
        .then((response) => {
          setSelectedReport(response.data);
          setShowReportEditForm(true);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );

  const handleLabReportEdit = useCallback(
    (id) => {
      axios
        .get(`${serverAddress}/labory/getone/${id}`)
        .then((response) => {
          setSelectedaLabory(response.data);
          setShowLabReportEditForm(true);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );

  const handleBarcodeAdd = async (barcode) => {

    // Make a copy of the currentRequestQueue in a local variable
    // const queueId = currentRequestQueue;

    try {
      const response = await axios.get(`${serverAddress}/patients/getbybarcode/${barcode}`)
      // productInsideQuiue();
      if (response.data) {
        setPatientsList(response.data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const previousKeyRef = useRef('');

  const arabicToEnglishMap = {
    'ض': 'q',
    'ص': 'w',
    'ث': 'e',
    'ق': 'r',
    'ف': 't',
    'غ': 'y',
    'ع': 'u',
    'ه': 'i',
    'خ': 'o',
    'ح': 'p',
    'ج': '[',
    'د': ']',
    'ش': 'a',
    'س': 's',
    'ي': 'd',
    'ب': 'f',
    'ل': 'g', // Adjusted to 'l'
    'ا': 'h', // Adjusted to 'a'
    'ت': 'g',
    'ن': 'k',
    'م': 'm',
    'ك': ';',
    'ط': "'",
    'ئ': 'z',
    'ء': 'x',
    'ؤ': 'c',
    'ر': 'v',
    'ى': 'n',
    'ة': 'h', // Adjusted as per standard layouts
    'و': ',',
    'ز': '.',
    'ظ': '/',
    'لا': 'b', // Include 'لا' if it's a single character
    // Arabic-Indic digits
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  };

  const handleKeyPress = useCallback(
    (event) => {
      let key = event.key;
      console.log('Raw key:', key);

      // Map Arabic characters to English
      if (arabicToEnglishMap[key]) {
        key = arabicToEnglishMap[key];
        console.log('Mapped key:', key);
      } else {
        console.log('No mapping found for:', key);
      }

      if (key === "Enter") {
        if (barcodeRef.current !== "") {
          // Barcode scanned, handle it
          console.log("Barcode Scanned:", barcodeRef.current);
          // setOrginBarcode(barcodeRef.current); // Uncomment if you use this function
          handleBarcodeAdd(barcodeRef.current);
          barcodeRef.current = "";
          setBarcode("");
        }
      } else {
        // Check for 'ل' followed by 'ا' and map to 'b'
        if (
          previousKeyRef.current === arabicToEnglishMap['ل'] &&
          key === arabicToEnglishMap['ا']
        ) {
          // Remove the last character (mapped 'ل')
          barcodeRef.current = barcodeRef.current.slice(0, -1);
          // Replace with 'b'
          barcodeRef.current += 'b';
          setBarcode((prevBarcode) => prevBarcode.slice(0, -1) + 'b');
        } else {
          // Key pressed, update barcode
          barcodeRef.current += key;
          setBarcode((prevBarcode) => prevBarcode + key);
        }

        // Clear barcode after a delay if no additional key is pressed
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }

        // Reset the timeout
        timeoutRef.current = setTimeout(() => {
          barcodeRef.current = "";
          setBarcode("");
        }, 2000);
      }

      // Update previousKeyRef for next iteration
      previousKeyRef.current = key;
    },
    [handleBarcodeAdd]
  );

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const handleKeyPressEvent = (event) => handleKeyPress(event);
    window.addEventListener("keypress", handleKeyPressEvent);

    return () => {
      window.removeEventListener("keypress", handleKeyPressEvent);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyPress]);


  const handleLabReportDelete = useCallback(
    (id) => {
      if (settingData.abortProssesMsg) {
        setDeleteInfo({ id: id, type: "labDelete" });
        setDeleteAlert(true);
      } else {
        axios
          .delete(`${serverAddress}/labory/delete/${id}/`)
          .then((response) => {
            setProfileRefresh(!profileRefresh);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      }
    },
    [profileRefresh, serverAddress, settingData.abortProssesMsg]
  );

  const handleEditLabReportData = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/labory/editone`, {
          id: selectedaLabory._id,
          data: data,
        })
        .then((response) => {
          setProfileRefresh(!profileRefresh);
          setShowLabReportEditForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [selectedaLabory._id, profileRefresh, serverAddress]
  );

  const handelVisitReportEdit = useCallback(
    (id, payment) => {
      axios
        .get(`${serverAddress}/visit/getone/${id}`)
        .then((response) => {
          setSelectedaLabory(response.data);
          if (payment) {
            setShowPaymentEditVisitForm(true)
          } else {
            setShowVisitReportEditForm(true);

          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );

  const handelVisitReportDelete = useCallback(
    (id) => {
      if (settingData.abortProssesMsg) {
        setDeleteInfo({ id: id, type: "visitDelete" });
        setDeleteAlert(true);
      } else {
        axios
          .delete(`${serverAddress}/visit/delete/${id}/`)
          .then((response) => {
            setProfileRefresh(!profileRefresh);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      }
    },
    [profileRefresh, serverAddress, settingData.abortProssesMsg]
  );

  const handelEditVisitReportData = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/visit/editone`, {
          id: selectedaLabory._id,
          data: data,
        })
        .then((response) => {
          setProfileRefresh(!profileRefresh);
          setShowVisitReportEditForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [selectedaLabory._id, profileRefresh, serverAddress]
  );

  const getAllGroup = useCallback(() => {
    axios
      .get(`${serverAddress}/pharmaceuticalGroup/getall`)
      .then((response) => {
        setGroupList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  const changeReportHeaderName = useCallback(
    (headerName) => {
      const data = { reportHeaderName: headerName };
      axios
        .post(`${serverAddress}/medicaleeportstyle/update`, {
          id: medicalReportsStype._id,
          data: data,
        })
        .then((response) => {
          getMedicalReportsStyle();
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [medicalReportsStype._id, serverAddress]
  );

  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        `${serverAddress}/users`,
        {},
        {
          withCredentials: true,
        }
      );
      setCurrentUser(data);
      setIsLoaded(true);
    };
    verifyUser();
  }, [Cookies, navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  useEffect(() => {
    getAllGroup();
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
  }, [getAllGroup, serverAddress]);

  useEffect(() => {
    getMedicalReportsStyle();
  }, []);

  const getMedicalReportsStyle = useCallback(() => {
    axios
      .get(`${serverAddress}/medicaleeportstyle/getmedicalreportstype`)
      .then((response) => {
        setMedicalReportsStype(response.data[0]);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  const handlePrint = useCallback(() => {
    axios
      .get(
        `${serverAddress}/patients/printpatientsdata/${partientsSelectId}/prescription/${PrescriptionId}`
      )
      .then((response) => {
        setDataToPrint(response.data);
        setprints(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [partientsSelectId, PrescriptionId, serverAddress]);

  useEffect(() => {
    axios
      .get(`${serverAddress}/category/getall`)
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  useEffect(() => {
    getPharmaceApi();
  }, [serverAddress]);

  const getPharmaceApi = useCallback(() => {
    axios
      .get(`${serverAddress}/pharmaceutical/getall`)
      .then((response) => {
        setPharmaceList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  useEffect(() => {
    axios
      .get(`${serverAddress}/intaketime/getall`)
      .then((response) => {
        setInTakeTime(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  const getConstDiseasesApi = useCallback(() => {
    axios
      .get(`${serverAddress}/constantdiseases/getall`)
      .then((response) => {
        setConstantDiseases(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [serverAddress]);

  useEffect(() => {
    getConstDiseasesApi();
    getPatientsList();
    getPatientsCount();
  }, [getConstDiseasesApi, getPatientsList, getPatientsCount]);

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleHideClick = () => {
    setNextVisit("");
    setPharmaceListInside([]);
    if (settingData.abortProssesMsg) {
      setCanceleAlert(true);
      setEditPrescriptionData("");
    } else {
      onCancelHande();
      setEditPrescriptionData("");
    }
  };

  const handleOnBillInsideRemove = useCallback(
    (id) => {
      if (settingData.abortProssesMsg) {
        setDeleteInfo({ id: id, type: "prescriptioBillnDelete" });
        setDeleteAlert(true);
      } else {
        setLoading(() => false);
        axios
          .delete(
            `${serverAddress}/prescription/removebill/${PrescriptionId}/pharmaceutical/${id}`
          )
          .then((response) => {
            setLoading(() => true);
            getAllPrescription(PrescriptionId);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      }
    },
    [PrescriptionId, serverAddress, settingData.abortProssesMsg]
  );

  const onShareHande = (id) => {
    console.log(`Share clicked for id ${id}`);
  };

  const onDeleteHande = useCallback(
    (id) => {
      if (settingData.abortProssesMsg) {
        setDeleteInfo({ id: id, type: "patientsDelete" });
        setDeleteAlert(true);
      } else {
        setLoading(false);
        axios
          .delete(`${serverAddress}/patients/delete/${id}`)
          .then((response) => {
            setLoading(true);
            getPatientsList();
          })
          .catch((error) => {
            setLoading(true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      }
    },
    [getPatientsList, serverAddress, settingData.abortProssesMsg]
  );

  const onEditHande = useCallback(
    (id) => {
      axios
        .get(`${serverAddress}/patients/medicalinfo/${id}`)
        .then((response) => {
          setUserEditData(response.data);
          setShowPartientsEditForm(true);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );


  const onPrescriptionShowHande = useCallback(
    (id) => {
      axios
        .post(`${serverAddress}/prescription/new`, { PartientsId: id })
        .then((response) => {
          setPharmaceListInside([]);
          setPrescriptionId(response.data.prescriptionId);
          setPartientsSelectId(id);
          axios
            .get(`${serverAddress}/patients/medicalinfo/${id}`)
            .then((response) => {
              setUserEditData(response.data);
            })
            .catch((error) => {
              console.error("Error fetching categories:", error);
            });

          setShowPartientsAddForm(true);
          setUserData(response.data.patientFumbling);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [serverAddress]
  );

  const onReportShowHandel = useCallback(
    (id) => {
      setPartientsSelectId(id);
      axios
        .get(`${serverAddress}/patients/getone/${id}`)
        .then((response) => {
          setUserEditData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
      setShowAddReportForm(true);
    },
    [serverAddress]
  );

  const onLaboryShowHandel = (id) => {
    setPartientsSelectId(id);
    setShowLaporyReportForm(true);
  };

  const onMedicalFormShowHandle = useCallback(
    (id) => {
      axios
        .get(`${serverAddress}/patients/medicalinfo/${id}`)
        .then((response) => {
          setUserEditData(response.data);
          setPartientsSelectId(id);
          setShowMidicalForm(true);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );

  const handleNewPatientData = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/patients/new`, data)
        .then((response) => {
          socket.current.emit("new-patient", {
            to: "",
          });
          getConstDiseasesApi();
          getPharmaceApi();
          getPatientsList();
          setShowAddForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getConstDiseasesApi, getPatientsList, getPharmaceApi, serverAddress]
  );

  const handleEditPatientData = useCallback(
    (data) => {
      data.id = userEditData._id;
      axios
        .post(`${serverAddress}/patients/edit`, data)
        .then((response) => {
          getPharmaceApi();
          getPatientsList();
          setShowPartientsEditForm(false);
          setShowMidicalForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getPatientsList, getPharmaceApi, serverAddress, userEditData._id]
  );

  const onBillGroupAdded = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/prescription/postpharmaceuticalgroup`, data)
        .then((response) => {
          getAllPrescription(data.PrescriptionId);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [serverAddress]
  );

  const handleOnBillAdded = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/prescription/postpharmaceutical`, data)
        .then((response) => {
          getPharmaceApi();
          getAllPrescription(data.PrescriptionId);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getPharmaceApi, serverAddress]
  );

  const getAllPrescription = useCallback(
    (PrescriptionId) => {
      axios
        .get(`${serverAddress}/prescription/getbills/${PrescriptionId}`)
        .then((response) => {
          setPharmaceListInside(response.data.prescription);
          medscapecheck(PrescriptionId);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );

  const medscapecheck = useCallback(
    (PrescriptionId) => {
      axios
        .get(`${serverAddress}/prescription/medscapecheck/${PrescriptionId}`)
        .then((response) => {
          setMidscapeData(response.data.midscapeData);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [serverAddress]
  );

  const onNameClickHandle = useCallback(
    (id) => {
      setPartientsSelectId(id);
      axios
        .get(`${serverAddress}/patients/medicalinfo/${id}`)
        .then((response) => {
          setUserEditData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      setShowPartientProfile(true);
    },
    [serverAddress]
  );

  const handleNewPrescriptionData = useCallback(
    (data) => {
      data.patientId = partientsSelectId;
      axios
        .post(`${serverAddress}/prescription/ubdateData`, { data })
        .then((response) => {
          getPatientsList();
          setEditPrescriptionData("");
          setNextVisit("");
          setShowPartientsAddForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getPatientsList, partientsSelectId, serverAddress]
  );

  const handlePrintFeedBack = () => {
    setprints(false);
  };

  const HandleonPrinterClick = () => {
    handlePrint();
  };

  const HandleonPrinterClickText = useCallback(
    (data) => {
      axios
        .get(`${serverAddress}/patients/medicalinfo/${partientsSelectId}`)
        .then((response) => {
          setDataToPrint({
            patients: response.data,
            textonly: true,
            data: data,
          });
          setprints(true);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [partientsSelectId, serverAddress]
  );

  const HandleonPrinterLabClickText = useCallback(
    (data) => {
      axios
        .get(`${serverAddress}/patients/medicalinfo/${partientsSelectId}`)
        .then((response) => {
          setDataToPrint({
            patients: response.data,
            textonly: true,
            data: data,
            type: "Lab",
          });
          setprints(true);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    [partientsSelectId, serverAddress]
  );

  const handleNewReportData = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/medicalreports/new`, { data })
        .then((response) => {
          getPatientsList();
          setShowAddReportForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getPatientsList, serverAddress]
  );

  const handleNewLaboryData = useCallback(
    (data) => {
      axios
        .post(`${serverAddress}/labory/new`, { data })
        .then((response) => {
          getPatientsList();
          setShowLaporyReportForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getPatientsList, serverAddress]
  );

  const handleNewVisit = useCallback(
    (data) => {
      console.log(data)

      axios
        .post(`${serverAddress}/visit/new`, { data })
        .then((response) => {
          getPatientsList();
          setShowVisitForm(false);
          setShowPaymentVisitForm(false);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    },
    [getPatientsList, serverAddress]
  );

  const handeSearchInput = useCallback(
    (event) => {
      const searchInputValue = event.target.value;
      if (searchInputValue === "") {
        getPatientsList();
      } else {
        axios
          .get(`${serverAddress}/patients/getbyname/${searchInputValue}`)
          .then((response) => {
            setPatientsList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }
    },
    [getPatientsList, serverAddress]
  );

  const handeSearchMidicalInput = useCallback(
    (event) => {
      const searchInputValue = event.target.value;
      if (searchInputValue === "") {
        getPatientsList();
      } else {
        axios
          .get(`${serverAddress}/patients/getbymedical/${searchInputValue}`)
          .then((response) => {
            setPatientsList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }
    },
    [getPatientsList, serverAddress]
  );

  const HandleOnPrescriptionDeleteHande = useCallback(
    (patientsId, prescriptionId) => {
      if (settingData.abortProssesMsg) {
        setDeleteInfo({
          id: { patientsId, prescriptionId },
          type: "prescriptioDelete",
        });
        setDeleteAlert(true);
      } else {
        axios
          .delete(
            `${serverAddress}/patients/Patientsid/${patientsId}/prescriptionid/${prescriptionId}`
          )
          .then((response) => {
            setProfileRefresh(!profileRefresh);
            getPatientsList();
          })
          .catch((error) => {
            console.error(
              `Error deleting prescription with ID ${prescriptionId}:`,
              error
            );
          });
      }
    },
    [
      getPatientsList,
      profileRefresh,
      serverAddress,
      settingData.abortProssesMsg,
    ]
  );

  const onPrescriptionEditHandel = useCallback(
    (patientsId, prescriptionId) => {
      axios
        .get(`${serverAddress}/prescription/getone/${prescriptionId}?`)
        .then((response) => {
          setPrescriptionId(response.data._id);
          getAllPrescription(response.data._id);
          setPartientsSelectId(patientsId);
          setEditPrescriptionData(response.data);
          setShowPartientsAddForm(true);
        })
        .catch((error) => {
          console.error("Error fetching prescription:", error);
        });
    },
    [getAllPrescription, serverAddress]
  );

  const onCancelHande = () => {
    setCanceleAlert(false);
    setShowLaporyReportForm(false);
    setShowPartientsEditForm(false);
    // setShowPartientProfile(false);
    setDeleteAlert(false);
    setShowAddReportForm(false);
    setShowMidicalForm(false);
    setShowAddForm(false);
    setShowPartientsAddForm(false);
    setShowVisitForm(false);
  };

  const onCancelAborteHande = () => {
    setCanceleAlert(false);
  };

  useEffect(() => {
    const onQueryChange = () => {
      if (ageQuery || stateQuery || genderQuery || range[0].startDate) {
        axios
          .post(`${serverAddress}/patients/queryselect`, {
            ageQuery: ageQuery,
            genderQuery: genderQuery,
            stateQuery: stateQuery,
            dateQuery: range,
          })
          .then((response) => {
            setPatientsList(response.data);
          })
          .catch((error) => {
            console.error("Error making POST request:", error);
          });
      }
    };

    onQueryChange();
  }, [ageQuery, stateQuery, genderQuery, range, serverAddress]);

  const onVisitFormShowHandel = useCallback(
    (id) => {
      setPartientsSelectId(id);
      axios
        .get(`${serverAddress}/patients/getOne/${id}`)
        .then((response) => {
          setUserEditData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      setShowVisitForm(true);
    },
    [serverAddress]
  );
  const onCurrencyVisitHandel = useCallback(
    (id) => {
      setPartientsSelectId(id);
      axios
        .get(`${serverAddress}/patients/getOne/${id}`)
        .then((response) => {
          setUserEditData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      setShowPaymentVisitForm(true);
    },
    [serverAddress]
  );


  const onDeleteConfirmHandel = useCallback(
    (id, type) => {
      if (type === "patientsDelete") {
        setLoading(false);
        axios
          .delete(`${serverAddress}/patients/delete/${id}`)
          .then((response) => {
            setLoading(true);
            setDeleteAlert(false);
            getPatientsList();
          })
          .catch((error) => {
            setLoading(true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      } else if (type === "reportDelete") {
        axios
          .delete(`${serverAddress}/medicalreports/delete/${id}/`)
          .then((response) => {
            setProfileRefresh(!profileRefresh);
            setDeleteAlert(false);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      } else if (type === "labDelete") {
        axios
          .delete(`${serverAddress}/labory/delete/${id}/`)
          .then((response) => {
            setProfileRefresh(!profileRefresh);
            setDeleteAlert(false);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      } else if (type === "prescriptioBillnDelete") {
        axios
          .delete(
            `${serverAddress}/prescription/removebill/${PrescriptionId}/pharmaceutical/${id}`
          )
          .then((response) => {
            setLoading(() => true);
            getAllPrescription(PrescriptionId);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      } else if (type === "prescriptioDelete") {
        axios
          .delete(
            `${serverAddress}/patients/Patientsid/${id.patientsId}/prescriptionid/${id.prescriptionId}`
          )
          .then((response) => {
            setProfileRefresh(!profileRefresh);
            setDeleteAlert(false);
            getPatientsList();
          })
          .catch((error) => {
            console.error(
              `Error deleting prescription with ID ${id.prescriptionId}:`,
              error
            );
          });
      } else if (type === "visitDelete") {
        axios
          .delete(`${serverAddress}/visit/delete/${id}/`)
          .then((response) => {
            setProfileRefresh(!profileRefresh);
            setDeleteAlert(false);
          })
          .catch((error) => {
            setLoading(() => true);
            console.error(`Error deleting category with ID ${id}:`, error);
          });
      }
    },
    [
      getPatientsList,
      getAllPrescription,
      profileRefresh,
      serverAddress,
      PrescriptionId,
    ]
  );

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ continuous: true });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  useEffect(() => {
    getPatientsList();
  }, [pageSelect, queryType, queryOrder]);

  const handleQuerySelect = (query) => {
    setQueryOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setQueryType(query);
  };

  const handleAgeQueryChange = (event) => {
    setAgeQuery(event.target.value);
  };

  const memoizedPatientsList = useMemo(() => patientsList, [patientsList]);

  return (
    <div className="p-2 relative h-[93vh] overflow-scroll">
      <div className="bg-white overflow-scroll shadow-sm h-full rounded-md pb-4">
        <div className="flex gap-4 justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center p-4">
            <div className="flex  bg-white px-4 py-1 rounded-3xl w-full shadow-md">
              <div>
                <InputBase
                  onChange={handeSearchInput}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="البحث عن مريض"
                  inputProps={{ "aria-label": "البحث عن مريض" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </div>

              <InputBase
                onChange={handeSearchMidicalInput}
                sx={{ ml: 1, flex: 1 }}
                placeholder="البحث داخل الطبلة"
                inputProps={{ "aria-label": "البحث داخل الطبلة" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          <div className="w-1/6">
            <FormControl
              className="w-full bg-whiteh"
              size="small"
              sx={{ m: 1 }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                <FormattedMessage
                  id={"ageSort"}
                  defaultMessage="Hello, World!"
                />
              </InputLabel>
              <Select
                onChange={handleAgeQueryChange}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label={
                  <FormattedMessage
                    id={"ageSort"}
                    defaultMessage="Hello, World!"
                  />
                }
              >
                <MenuItem value="all">
                  <em>الكل</em>
                </MenuItem>
                <MenuItem value={"1-10"}>1-10</MenuItem>
                <MenuItem value={"10-20"}>10-20</MenuItem>
                <MenuItem value={"20-30"}>20-30</MenuItem>
                <MenuItem value={"30-40"}>30-40</MenuItem>
                <MenuItem value={"40-50"}>40-50</MenuItem>
                <MenuItem value={"50-60"}>50-60</MenuItem>
                <MenuItem value={"60-70"}>60-70</MenuItem>
                <MenuItem value={"70-80"}>70-80</MenuItem>
                <MenuItem value={"80-90"}>80-90</MenuItem>
                <MenuItem value={"90-140"}>90-140</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="w-1/6">
            <FormControl
              className="w-full bg-whiteh"
              size="small"
              sx={{ m: 1 }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                <FormattedMessage
                  id={"stateSort"}
                  defaultMessage="Hello, World!"
                />
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={(event) => setStateQuery(event.target.value)}
                label={
                  <FormattedMessage
                    id={"stateSort"}
                    defaultMessage="Hello, World!"
                  />
                }
              >
                <MenuItem value="all">
                  <em>الكل</em>
                </MenuItem>
                {constantDiseases.map((diseases, index) => (
                  <MenuItem key={index} value={diseases._id}>
                    {diseases.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="w-1/6">
            <FormControl
              className="w-full bg-whiteh"
              size="small"
              sx={{ m: 1 }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                <FormattedMessage
                  id={"genderSort"}
                  defaultMessage="Hello, World!"
                />
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={(event) => setGenderQuery(event.target.value)}
                label={
                  <FormattedMessage
                    id={"genderSort"}
                    defaultMessage="Hello, World!"
                  />
                }
              >
                <MenuItem value="all">
                  <em>الكل</em>
                </MenuItem>
                <MenuItem value={"ذكر"}>ذكر</MenuItem>
                <MenuItem value={"انثى"}>انثى</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-1/6">
            <DateRangePickerComp
              range={range}
              setRange={(rangeValue) => setRange(rangeValue)}
            />
          </div>
        </div>
        <TableContainer dir="rtl" className="p-2 shadow">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" onClick={() => handleQuerySelect("")}>
                  #
                </TableCell>
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientName ? (
                  <TableCell
                    align="right"
                    className="cursor-pointer"
                    onClick={() => handleQuerySelect("name")}
                  >
                    <FormattedMessage
                      id={"PatientName"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "name" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientDate ? (
                  <TableCell align="center">
                    <FormattedMessage
                      id={"Date"}
                      defaultMessage="Hello, World!"
                    />
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAge ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("age")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"AgeTitle"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "age" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientGender ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("gender")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"Gender"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "gender" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientAdresses ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("adresses")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"Address"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "adresses" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientSequance ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("Sequence")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"Sequence"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "Sequence" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientWeghit ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("weight")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"Weight"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "weight" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientLeanth ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("length")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"Length"}
                      defaultMessage="Hello, World!"
                    />
                    {queryType === "length" ? (
                      queryOrder === "asc" ? (
                        <ArrowDropDown />
                      ) : (
                        <ArrowDropUp />
                      )
                    ) : (
                      <SwapVert />
                    )}
                  </TableCell>
                ) : (
                  ""
                )}
                {settingData &&
                  settingData.patientsTable &&
                  settingData.patientsTable.patientVisitNum ? (
                  <TableCell
                    align="center"
                    onClick={() => handleQuerySelect("visitCount")}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id={"VisitNumber"}
                      defaultMessage="Hello, World!"
                    />
                  </TableCell>
                ) : (
                  ""
                )}
                {currentUser ? (
                  currentUser.role === "doctor" ? (
                    <>
                      {settingData &&
                        settingData.patientsTable &&
                        settingData.patientsTable.patientAddVisit ? (
                        <TableCell align="center">
                          <FormattedMessage
                            id={"visit"}
                            defaultMessage="Hello, World!"
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      {settingData &&
                        settingData.patientsTable &&
                        settingData.patientsTable.patientAddMedicalData ? (
                        <TableCell align="center">
                          <FormattedMessage
                            id={"Examination"}
                            defaultMessage="Hello, World!"
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      {settingData &&
                        settingData.patientsTable &&
                        settingData.patientsTable.patientAddPrescription ? (
                        <TableCell align="center">
                          <FormattedMessage
                            id={"Rx"}
                            defaultMessage="Hello, World!"
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      {settingData &&
                        settingData.patientsTable &&
                        settingData.patientsTable.patientAddReport ? (
                        <TableCell align="center">
                          <FormattedMessage
                            id={"Report"}
                            defaultMessage="Hello, World!"
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      {settingData &&
                        settingData.patientsTable &&
                        settingData.patientsTable.patientAddLaboryTest ? (
                        <TableCell align="center">
                          <FormattedMessage
                            id={"LaboratoryTesting"}
                            defaultMessage="Hello, World!"
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      {settingData &&
                        settingData.patientsTable &&
                        settingData.patientsTable.patientOption ? (
                        <TableCell align="center">
                          <FormattedMessage
                            id={"Options"}
                            defaultMessage="Hello, World!"
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {patientsList.map((patient, index) => (
                <Row
                  row={patient}
                  index={index}
                  pageSelect={pageSelect}
                  settingData={settingData}
                  onNameClickHandle={onNameClickHandle}
                  onBookedHandel={onBookedHandel}
                  onVisitFormShowHandel={onVisitFormShowHandel}
                  onMedicalFormShowHandle={onMedicalFormShowHandle}
                  onPrescriptionShowHande={onPrescriptionShowHande}
                  onReportShowHandel={onReportShowHandel}
                  onLaboryShowHandel={onLaboryShowHandel}
                  onEditHande={onEditHande}
                  onDeleteHande={onDeleteHande}
                  onPrescriptionEditHandel={onPrescriptionEditHandel}
                  onPrescriptionDeleteHande={HandleOnPrescriptionDeleteHande}
                  onCurrencyVisitHandel={onCurrencyVisitHandel}
                  currentUser={currentUser}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{ direction: "ltr" }}
          className="flex justify-center items-center mt-2"
        >
          <Pagination
            count={Math.ceil(patientCount / 20)}
            variant="outlined"
            defaultPage={pageSelect}
            color="primary"
            onChange={(event, value) => SetPageSelect(value)}
          />
        </div>
      </div>

      <div className="fixed z-50 bottom-5 left-6">
        <Fab
          color="primary"
          onClick={handleAddButtonClick}
          sx={{ backgroundColor: blue[700], color: "white" }}
          aria-label="add"
        >
          <Add />
        </Fab>
      </div>
      {showAddForm && (
        <>
          <BackGroundShadow z onClick={handleHideClick} />
          <NewPatientForm
            handleExit={handleHideClick}
            currentUser={currentUser}
            screenMode={settingData.pullUpFullScreenMode}
            constantDiseases={constantDiseases}
            onFormSubmit={handleNewPatientData}
          />
        </>
      )}
      {!loading && <Loading />}
      {showPartientsAddForm && (
        <>
          <BackGroundShadow onClick={handleHideClick} />
          <NewPartientsForm
            userEditData={userEditData}
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            settingData={settingData}
            groupList={groupList}
            setNextVisit={setNextVisit}
            userData={userData}
            editPrescriptionData={editPrescriptionData}
            patientsList={patientsList}
            pharmaceList={pharmaceList}
            inTakeTimeList={inTakeTimeList}
            partientId={partientsSelectId}
            onBillInsideRemove={handleOnBillInsideRemove}
            PrescriptionId={PrescriptionId}
            onPrinterClick={HandleonPrinterClick}
            pharmaceListInside={pharmaceListInside}
            onBillAdded={handleOnBillAdded}
            onBillGroupAdded={onBillGroupAdded}
            midscapeData={midscapeData}
            onFormSubmit={handleNewPrescriptionData}
          />
        </>
      )}
      {prints && loading && (
        <div>
          <PatientReport
            prints={prints}
            nextVisit={nextVisit}
            dataToPrint={dataToPrint}
            medicalReportsStype={medicalReportsStype}
            feedback={handlePrintFeedBack}
          />
        </div>
      )}
      {showPartientProfile && (
        <>
          <BackGroundShadow z onClick={() => setShowPartientProfile(false)} />
          <PartientsProfile
            handleScannerHandle={handleScannerHandle}
            handleExit={() => setShowPartientProfile(false)}
            screenMode={settingData.pullUpFullScreenMode}
            onImageDeleteHandle={onImageDeleteHandle}
            settingData={settingData}
            handleEditPatientData={handleEditPatientData}
            userEditData={userEditData}
            refresh={profileRefresh}
            handleReportEdit={handleReportEdit}
            handleReportDelete={handleReportDelete}
            handleLabReportEdit={handleLabReportEdit}
            handleLabReportDelete={handleLabReportDelete}
            handelVisitReportEdit={handelVisitReportEdit}
            handelVisitReportDelete={handelVisitReportDelete}
            handelEditVisitReportData={handelEditVisitReportData}
            partientId={partientsSelectId}
            onPrescriptionDeleteHande={HandleOnPrescriptionDeleteHande}
            onPrescriptionEditHandel={onPrescriptionEditHandel}
          />
        </>
      )}
      {showPartientsEditForm && (
        <>
          <BackGroundShadow z onClick={handleHideClick} />
          <NewPatientForm
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            currentUser={currentUser}
            type={"edit"}
            constantDiseases={constantDiseases}
            onFormSubmit={handleEditPatientData}
            data={userEditData}
          />
        </>
      )}
      {showMidicalForm && (
        <>
          <BackGroundShadow onClick={handleHideClick} />
          <MedicalForm
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            settingData={settingData}
            onFormSubmit={handleEditPatientData}
            userEditData={userEditData}
          />
        </>
      )}
      {showAddReportForm && (
        <>
          <BackGroundShadow onClick={handleHideClick} />
          <NewMedicalReporyForm
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            userEditData={userEditData}
            medicalReportsStype={medicalReportsStype}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            type="new"
            changeReportHeaderName={changeReportHeaderName}
            onFormSubmit={handleNewReportData}
          />
        </>
      )}
      {showReportEditForm && (
        <>
          <BackGroundShadow onClick={() => setShowReportEditForm(false)} />
          <NewMedicalReporyForm
            handleExit={() => setShowReportEditForm(false)}
            screenMode={settingData.pullUpFullScreenMode}
            medicalReportsStype={medicalReportsStype}
            partientsSelectId={partientsSelectId}
            type="edit"
            changeReportHeaderName={changeReportHeaderName}
            data={selectedReport}
            onFormSubmit={handleEditReportData}
          />
        </>
      )}
      {showLaporyReportForm && (
        <>
          <BackGroundShadow onClick={handleHideClick} />
          <AddLaboratoryExamination
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterLabClickText}
            onFormSubmit={handleNewLaboryData}
          />
        </>
      )}
      {showVisitForm && (
        <>
          <BackGroundShadow onClick={() => setShowVisitForm(false)} />
          <VisitForm
            userEditData={userEditData}
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            settingData={settingData}
            onFormSubmit={handleNewVisit}
          />
        </>
      )}
      {ShowPaymentEditVisitForm && (
        <>
          <BackGroundShadow onClick={() => setShowPaymentEditVisitForm(false)} />
          <PaymentVisit
            handleExit={() => ShowPaymentEditVisitForm(false)}
            screenMode={settingData.pullUpFullScreenMode}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handelEditVisitReportData}
            settingData={settingData}
            type="edit"
            data={selectedaLabory}
          />
        </>
      )}
      {showPaymentVisitForm && (
        <>
          <BackGroundShadow onClick={() => setShowPaymentVisitForm(false)} />
          <PaymentVisit
            userEditData={userEditData}
            handleExit={handleHideClick}
            screenMode={settingData.pullUpFullScreenMode}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            settingData={settingData}
            onFormSubmit={handleNewVisit}
          />
        </>
      )}
      {showLabReportEditForm && (
        <>
          <BackGroundShadow onClick={() => setShowLabReportEditForm(false)} />
          <AddLaboratoryExamination
            handleExit={() => setShowLabReportEditForm(false)}
            screenMode={settingData.pullUpFullScreenMode}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterLabClickText}
            onFormSubmit={handleEditLabReportData}
            type="edit"
            data={selectedaLabory}
          />
        </>
      )}
      {showVisitReportEditForm && (
        <>
          <BackGroundShadow onClick={() => setShowVisitReportEditForm(false)} />
          <VisitForm
            handleExit={() => setShowVisitReportEditForm(false)}
            screenMode={settingData.pullUpFullScreenMode}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handelEditVisitReportData}
            settingData={settingData}
            type="edit"
            data={selectedaLabory}
          />
        </>
      )}
      {deleteAlert && (
        <DeleteAlert
          deleteInfo={deleteInfo}
          onShadowClick={() => setDeleteAlert(false)}
          onDeleteConfirmHandel={onDeleteConfirmHandel}
          onCancelAborteHande={onCancelHande}
        />
      )}
      {canceleAlert && (
        <CancelAlert
          onCancelHande={onCancelHande}
          onCancelAborteHande={onCancelAborteHande}
        />
      )}
    </div>
  );
}

export default Partients;
