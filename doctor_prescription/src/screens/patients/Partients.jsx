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
import React, { useEffect, useState } from "react";
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
import { Calendar } from "react-modern-calendar-datepicker";
import {
  Add,
  Book,
  BookOnline,
  Delete,
  Edit,
  Female,
  Male,
  Medication,
  Report,
  Share,
  Vaccines,
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const getPharmaceuticalName = (params) => {
    const pharmaceuticalArray = params;
    // Extract the id and name properties from each item in the array
    if (pharmaceuticalArray) {
      const pharmaceuticalNames = pharmaceuticalArray.map((item) => {
        if (item.id !== null) {
          return item.id.name;
        }
        // You can choose to handle the case when item.id is null here,
        // for example, return a default value or an empty string.
        return "لا يوجد";
      });
      // Join the extracted names into a string and display it in the cell
      return pharmaceuticalNames.join(", ");
    } else {
      return "";
    }
  };

  return (
    <React.Fragment>
      <TableRow
        className={` ${
          row.booked ? "bg-green-200 hover:bg-green-100" : "hover:bg-blue-50"
        }`}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>{props.index + 1 + 20 * (props.pageSelect - 1)}</TableCell>
        <TableCell
          className=" cursor-pointer hover:bg-blue-100"
          onClick={() => {
            props.onNameClickHandle(row._id);
          }}
          component="th"
          scope="row"
          align="center"
        >
          <div className="flex justify-center items-center gap-4">
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
        <TableCell component="th" scope="row" align="center">
          <div className="bg-green-100 w-full flex justify-center items-center h-6 rounded-full">
            {new Date(row.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              // hour: "2-digit",
              // minute: "2-digit",
              // hour12: true, // Include this option for AM/PM format
            })}
          </div>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <div>{row.age ? row.age : 0} سنة</div>
          <div>{row.monthAge ? row.monthAge : 0} شهر</div>
          <div>{row.dayAge ? row.dayAge : 0} يوم</div>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <div
            className={`p-0.5 rounded-full  ${
              row.gender === "ذكر"
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
        <TableCell component="th" scope="row" align="center">
          {row.adresses}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.Sequence}
        </TableCell>

        <TableCell component="th" scope="row" align="center">
          {row.weight ? row.weight + "kg" : ""}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.length ? row.length + "cm" : ""}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.visitDate.length}
        </TableCell>

        {props.currentUser ? (
          props.currentUser.role === "doctor" ? (
            <>
              <TableCell align="center">
                <IconButton
                  sx={{ color: blue[800] }}
                  // className=" hover:text-yellow-500"
                  onClick={() => {
                    props.onVisitFormShowHandel(row._id);
                  }}
                  aria-label="delete"
                >
                  <ChromeReaderModeIcon
                    aria-label="expand row"
                    size="small"
                  ></ChromeReaderModeIcon>
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <IconButton
                  sx={{ color: blue[800] }}
                  // className=" hover:text-yellow-500"

                  onClick={() => {
                    props.onMedicalFormShowHandle(row._id);
                  }}
                  aria-label="delete"
                >
                  <ContentPasteIcon
                    aria-label="expand row"
                    size="small"
                  ></ContentPasteIcon>
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <IconButton
                  sx={{ color: yellow[800] }}
                  className=" hover:text-yellow-500"
                  onClick={() => {
                    props.onPrescriptionShowHande(row._id);
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
              <TableCell align="center">
                <IconButton
                  sx={{ color: blue[800] }}
                  // className=" hover:text-yellow-500"
                  onClick={() => {
                    props.onReportShowHandel(row._id);
                  }}
                  aria-label="delete"
                >
                  <SummarizeIcon
                    aria-label="expand row"
                    size="small"
                  ></SummarizeIcon>
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  sx={{ color: blue[800] }}
                  // className=" hover:text-yellow-500"
                  onClick={() => {
                    props.onLaboryShowHandel(row._id);
                  }}
                  aria-label="delete"
                >
                  <BiotechIcon size={"small"} />
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <IconButton
                  sx={{ color: purple[400] }}
                  className=" hover:text-purple-600"
                  onClick={() => props.onBookedHandel(row._id)}
                  aria-label="delete"
                  // size="large"
                >
                  <Book fontSize="inherit" />
                </IconButton>

                {/* <IconButton
                  sx={{ color: green[400] }}
                  className=" hover:text-green-600"
                  onClick={() => props.onShareHande(row._id)}
                  aria-label="delete"
                  // size="large"
                >
                  <Share fontSize="inherit" />
                </IconButton> */}
                <IconButton
                  onClick={() => {
                    props.onDeleteHande(row._id);
                  }}
                  sx={{ color: red[400] }}
                  className=" hover:text-red-600"
                  aria-label="delete"

                  // size="large"
                >
                  <Delete fontSize="inherit" />
                </IconButton>
                <IconButton
                  sx={{ color: blue[400] }}
                  className=" hover:text-blue-600"
                  onClick={() => {
                    props.onEditHande(row._id);
                  }}
                  aria-label="delete"
                >
                  <Edit aria-label="expand row" size="small"></Edit>
                </IconButton>
              </TableCell>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
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
                        if (props.settingData.openEditPrescriptionByClick) {
                          props.onPrescriptionEditHandel(
                            row._id,
                            prescription._id
                          );
                        }
                      }}
                    >
                      <TableCell align="center">
                        {prescription.pharmaceutical.length}
                      </TableCell>
                      <TableCell align="center">
                        {prescription.MedicalDiagnosis}
                      </TableCell>
                      <TableCell align="center">
                        {prescription.createdAt}
                      </TableCell>
                      <TableCell align="center">
                        {getPharmaceuticalName(prescription.pharmaceutical)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            props.onPrescriptionDeleteHande(
                              row._id,
                              prescription._id
                            );
                          }}
                          sx={{ color: red[400] }}
                          className=" hover:text-red-600"
                          aria-label="delete"

                          // size="large"
                        >
                          <Delete fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            props.onPrescriptionEditHandel(
                              row._id,
                              prescription._id
                            );
                          }}
                          sx={{ color: blue[400] }}
                          className=" hover:text-red-600"
                          aria-label="delete"

                          // size="large"
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
function Partients() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [profileRefresh, setProfileRefresh] = useState(false);
  const [showPartientsAddForm, setShowPartientsAddForm] = useState(false);
  const [showPartientsEditForm, setShowPartientsEditForm] = useState(false);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showLaporyReportForm, setShowLaporyReportForm] = useState(false);
  const [showPartientProfile, setShowPartientProfile] = useState(false);
  const [showMidicalForm, setShowMidicalForm] = useState(false);
  const [userEditData, setUserEditData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showReportEditForm, setShowReportEditForm] = useState(false);
  const [showLabReportEditForm, setShowLabReportEditForm] = useState(false);
  const [showVisitReportEditForm, setShowVisitReportEditForm] = useState(false);

  const [partientsSelectId, setPartientsSelectId] = useState("");
  const [PrescriptionId, setPrescriptionId] = useState("");
  const [pharmaceList, setPharmaceList] = useState([]);
  const [tradNamepharmaceList, setTradNamePharmaceList] = useState([]);
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
  const [selectedReport, setSelectedReport] = useState({});
  const [selectedaLabory, setSelectedaLabory] = useState({});
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000
  const [midscapeData, setMidscapeData] = useState([]);
  const [pageSelect, SetPageSelect] = useState(1);
  const [patientCount, setPatientCount] = useState(20);
  const handleReportDelete = (id) => {
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
  };
  const onBookedHandel = (id) => {
    axios
      .post(`${serverAddress}/patients/bookPatents`, {
        id: id,
      })
      .then((response) => {
        getPatientsList();
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const handleEditReportData = (data) => {
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
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const handleReportEdit = (id) => {
    axios
      .get(`${serverAddress}/medicalreports/getone/${id}`)
      .then((response) => {
        setSelectedReport(response.data);
        setShowReportEditForm(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleLabReportEdit = (id) => {
    axios
      .get(`${serverAddress}/labory/getone/${id}`)
      .then((response) => {
        setSelectedaLabory(response.data);
        setShowLabReportEditForm(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleLabReportDelete = (id) => {
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
  };
  const handleEditLabReportData = (data) => {
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
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const handelVisitReportEdit = (id) => {
    axios
      .get(`${serverAddress}/visit/getone/${id}`)
      .then((response) => {
        setSelectedaLabory(response.data);
        setShowVisitReportEditForm(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handelVisitReportDelete = (id) => {
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
  };
  const handelEditVisitReportData = (data) => {
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
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const changeReportHeaderName = (headerName) => {
    const data = { reportHeaderName: headerName };
    console.log(medicalReportsStype);
    axios
      .post(`${serverAddress}/medicaleeportstyle/update`, {
        id: medicalReportsStype._id,
        data: data,
      })
      .then((response) => {
        // Handle the response if needed
        getMedicalReportsStyle();
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

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

  useEffect(() => {
    getMedicalReportsStyle();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getMedicalReportsStyle = () => {
    axios
      .get(`${serverAddress}/medicaleeportstyle/getmedicalreportstype`)
      .then((response) => {
        setMedicalReportsStype(response.data[0]); // Update the categories state with the fetched data
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handlePrint = () => {
    axios
      .get(
        `${serverAddress}/patients/printpatientsdata/${partientsSelectId}/prescription/${PrescriptionId}`
      )
      .then((response) => {
        setDataToPrint(response.data); // Update the categories state with the fetched data
        setprints(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`${serverAddress}/category/getall`)
      .then((response) => {
        setCategoryList(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  useEffect(() => {
    getPharmaceApi();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getPharmaceApi = () => {
    axios
      .get(`${serverAddress}/pharmaceutical/getall`)
      .then((response) => {
        setPharmaceList(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${serverAddress}/intaketime/getall`)
      .then((response) => {
        setInTakeTime(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getConstDiseasesApi = () => {
    axios
      .get(`${serverAddress}/constantdiseases/getall`)
      .then((response) => {
        setConstantDiseases(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    getConstDiseasesApi();
    getPatientsList();
    getPatientsCount();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getPatientsList = () => {
    axios
      .get(`${serverAddress}/patients/getall/${pageSelect}`)
      .then((response) => {
        setPatientsList(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const getPatientsCount = () => {
    axios
      .get(`${serverAddress}/patients/getcount/`)
      .then((response) => {
        setPatientCount(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };
  const handleHideClick = () => {
    setPharmaceListInside([]);
    if (settingData.abortProssesMsg) {
      setCanceleAlert(true);
    } else {
      onCancelHande();
    }
  };
  const handleOnBillInsideRemove = (id) => {
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
          // Handle success, e.g., show a success message or update the categories list
          console.log(`Category with ID ${id} has been deleted.`);
          getAllPrescription(PrescriptionId);
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          setLoading(() => true);
          console.error(`Error deleting category with ID ${id}:`, error);
        });
    }
  };
  const onShareHande = (id) => {
    console.log(`Share clicked for id ${id}`);
  };
  const onDeleteHande = (id) => {
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
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          setLoading(true);

          // Handle error, e.g., show an error message
          console.error(`Error deleting category with ID ${id}:`, error);
        });

      console.log(`Delete clicked for id ${id}`);
    }
  };
  const onEditHande = (id) => {
    axios
      .get(`${serverAddress}/patients/medicalinfo/${id}`)
      .then((response) => {
        setUserEditData(response.data);
        setShowPartientsEditForm(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    console.log(`Edit clicked for id ${id}`);
  };
  const onPrescriptionShowHande = (id) => {
    axios
      .post(`${serverAddress}/prescription/new`, { PartientsId: id })
      .then((response) => {
        // Handle the response if needed
        setPharmaceListInside([]);
        setPrescriptionId(response.data.prescriptionId);
        setPartientsSelectId(id);
        setShowPartientsAddForm(true);
        setUserData(response.data.patientFumbling);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    console.log(`Prescription Show clicked for id ${id}`);
  };
  const onReportShowHandel = (id) => {
    setPartientsSelectId(id);
    setShowAddReportForm(true);

    console.log(`Prescription Show clicked for id ${id}`);
  };
  const onLaboryShowHandel = (id) => {
    setPartientsSelectId(id);
    setShowLaporyReportForm(true);

    console.log(`Prescription Show clicked for id ${id}`);
  };
  const onMedicalFormShowHandle = (id) => {
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

    console.log(`Prescription Show clicked for id ${id}`);
  };
  const handleNewPatientData = (data) => {
    axios
      .post(`${serverAddress}/patients/new`, data)
      .then((response) => {
        // Handle the response if needed
        getConstDiseasesApi();
        getPharmaceApi();
        getPatientsList();
        setShowAddForm(false);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    // Update the state or perform actions with the data as needed
  };
  const handleEditPatientData = (data) => {
    data.id = userEditData._id;
    axios
      .post(`${serverAddress}/patients/edit`, data)
      .then((response) => {
        // Handle the response if needed
        getPharmaceApi();
        getPatientsList();
        setShowPartientsEditForm(false);
        setShowMidicalForm(false);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const handleOnBillAdded = (data) => {
    axios
      .post(`${serverAddress}/prescription/postpharmaceutical`, data)
      .then((response) => {
        // Handle the response if needed
        getAllPrescription(data.PrescriptionId);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const getAllPrescription = (PrescriptionId) => {
    axios
      .get(`${serverAddress}/prescription/getbills/${PrescriptionId}`)
      .then((response) => {
        setPharmaceListInside(() => response.data.prescription); // Update the categories state with the fetched data
        medscapecheck(PrescriptionId);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const medscapecheck = (PrescriptionId) => {
    axios
      .get(`${serverAddress}/prescription/medscapecheck/${PrescriptionId}`)
      .then((response) => {
        setMidscapeData(() => response.data.midscapeData);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const onNameClickHandle = (id) => {
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
  };
  const handleNewPrescriptionData = (data) => {
    data.patientId = partientsSelectId;
    axios
      .post(`${serverAddress}/prescription/ubdateData`, { data })
      .then((response) => {
        // Handle the response if needed
        getPatientsList();
        setShowPartientsAddForm(false);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const handlePrintFeedBack = () => {
    setprints(false);
  };
  const HandleonPrinterClick = () => {
    handlePrint();
  };
  const HandleonPrinterClickText = (data) => {
    axios
      .get(`${serverAddress}/patients/medicalinfo/${partientsSelectId}`)
      .then((response) => {
        setDataToPrint({ patients: response.data, textonly: true, data: data }); // Update the categories state with the fetched data
        setprints(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleNewReportData = (data) => {
    axios
      .post(`${serverAddress}/medicalreports/new`, { data })
      .then((response) => {
        // Handle the response if needed
        getPatientsList();
        setShowAddReportForm(false);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const handleNewLaboryData = (data) => {
    axios
      .post(`${serverAddress}/labory/new`, { data })
      .then((response) => {
        // Handle the response if needed
        getPatientsList();
        setShowLaporyReportForm(false);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const handleNewVisit = (data) => {
    axios
      .post(`${serverAddress}/visit/new`, { data })
      .then((response) => {
        // Handle the response if needed
        getPatientsList();
        setShowVisitForm(false);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const handeSearchInput = (event) => {
    const searchInputValue = event.target.value;
    if (searchInputValue === "") {
      getPatientsList();
    } else {
      axios
        .get(`${serverAddress}/patients/getbyname/${searchInputValue}`)
        .then((response) => {
          setPatientsList(response.data); // Update the categories state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  };
  const HandleOnPrescriptionDeleteHande = (patientsId, prescriptionId) => {
    if (settingData.abortProssesMsg) {
      setDeleteInfo({
        id: { patientsId, prescriptionId },
        type: "prescriptioDelete",
      });
      setDeleteAlert(true);
    } else {
      axios
        .delete(
          `${serverAddress}/patients/Patientsid/${patientsId}/prescriptionid/${prescriptionId}
      `
        )
        .then((response) => {
          setProfileRefresh(!profileRefresh);
          // Handle success, e.g., show a success message or update the categories list
          getPatientsList();
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
        });
    }
  };
  const onPrescriptionEditHandel = (patientsId, prescriptionId) => {
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
        console.error("Error fetching categories:", error);
      });
  };
  const onCancelHande = () => {
    setCanceleAlert(false);
    setShowLaporyReportForm(false);
    setShowPartientsEditForm(false);
    setShowPartientProfile(false);
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
            setPatientsList(response.data); // Update the categories state with the fetched data
            // Handle the response if needed
          })
          .catch((error) => {
            // Handle errors if the request fails
            console.error("Error making POST request:", error);
          });
      }
    };

    onQueryChange();
  }, [ageQuery, stateQuery, genderQuery, range]);

  const onVisitFormShowHandel = (id) => {
    setPartientsSelectId(id);
    setShowVisitForm(true);
    console.log(`visit Show clicked for id ${id}`);
  };

  const onDeleteConfirmHandel = (id, type) => {
    console.log(id, type);
    if (type === "patientsDelete") {
      setLoading(false);
      axios
        .delete(`${serverAddress}/patients/delete/${id}`)
        .then((response) => {
          setLoading(true);
          setDeleteAlert(false);
          getPatientsList();
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          setLoading(true);

          // Handle error, e.g., show an error message
          console.error(`Error deleting category with ID ${id}:`, error);
        });

      console.log(`Delete clicked for id ${id}`);
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
          // Handle success, e.g., show a success message or update the categories list
          console.log(`Category with ID ${id} has been deleted.`);
          getAllPrescription(PrescriptionId);
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          setLoading(() => true);
          console.error(`Error deleting category with ID ${id}:`, error);
        });
    } else if (type === "prescriptioDelete") {
      console.log(id);
      axios
        .delete(
          `${serverAddress}/patients/Patientsid/${id.patientsId}/prescriptionid/${id.prescriptionId}
      `
        )
        .then((response) => {
          setProfileRefresh(!profileRefresh);
          setDeleteAlert(false);

          // Handle success, e.g., show a success message or update the categories list
          getPatientsList();
          // You might want to update the categories list here to reflect the changes
        })
        .catch((error) => {
          // Handle error, e.g., show an error message
        });
    }else if (type === "visitDelete") {
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
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }

  useEffect(() => {
    getPatientsList();
  }, [pageSelect]);
  return (
    <div className="p-2 relative h-[93vh] overflow-scroll">
      {!browserSupportsSpeechRecognition ? (
        <span>Browser doesn't support speech recognition.</span>
      ) : (
        ""
      )}
      {/* <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}

      <div className=" bg-white overflow-scroll shadow-sm h-full rounded-md pb-4">
        <div className="flex gap-4 justify-center items-center w-full">
          <div className=" flex flex-col justify-center items-center p-4">
            <div className="flex bg-white px-4 py-1 rounded-3xl w-full shadow-md">
              <InputBase
                onChange={handeSearchInput}
                sx={{ ml: 1, flex: 1 }}
                placeholder="البحث عن مريض"
                inputProps={{ "aria-label": "البحث عن مريض" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          <div className=" w-1/6">
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
                onChange={(event) => {
                  setAgeQuery(event.target.value);
                }}
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

          <div className=" w-1/6">
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
                onChange={(event) => {
                  setStateQuery(event.target.value);
                }}
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
                  <MenuItem value={diseases._id}>{diseases.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className=" w-1/6">
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
                onChange={(event) => {
                  setGenderQuery(() => event.target.value);
                }}
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
          <div className=" w-1/6">
            <DateRangePickerComp
              range={range}
              setRange={(rangeValue) => {
                setRange(rangeValue);
              }}
            ></DateRangePickerComp>
          </div>
          <div className={`${showCalendar ? "" : "hidden"}`}>
            {/* <Calendar
            value={selectedDayRange}
            onChange={handleDateRangeSelection}
            shouldHighlightWeekends
          /> */}
          </div>
        </div>
        <TableContainer dir="rtl" className="p-2  shadow">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center"># </TableCell>
                <TableCell align="right">
                  <FormattedMessage
                    id={"PatientName"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage
                    id={"Date"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"AgeTitle"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"Gender"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"Address"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"Sequence"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>

                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"Weight"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"Length"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <FormattedMessage
                    id={"VisitNumber"}
                    defaultMessage="Hello, World!"
                  />
                </TableCell>
                {currentUser ? (
                  currentUser.role === "doctor" ? (
                    <>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id={"visit"}
                          defaultMessage="Hello, World!"
                        />
                      </TableCell>

                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id={"Examination"}
                          defaultMessage="Hello, World!"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id={"Rx"}
                          defaultMessage="Hello, World!"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id={"Report"}
                          defaultMessage="Hello, World!"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id={"LaboratoryTesting"}
                          defaultMessage="Hello, World!"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id={"Options"}
                          defaultMessage="Hello, World!"
                        />
                      </TableCell>
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
                  onBookedHandel={onBookedHandel}
                  pageSelect={pageSelect}
                  onVisitFormShowHandel={onVisitFormShowHandel}
                  onPrescriptionEditHandel={onPrescriptionEditHandel}
                  onShareHande={onShareHande}
                  settingData={settingData}
                  onDeleteHande={onDeleteHande}
                  currentUser={currentUser}
                  onPrescriptionDeleteHande={HandleOnPrescriptionDeleteHande}
                  onEditHande={onEditHande}
                  onMedicalFormShowHandle={onMedicalFormShowHandle}
                  onReportShowHandel={onReportShowHandel}
                  onLaboryShowHandel={onLaboryShowHandel}
                  onPrescriptionShowHande={onPrescriptionShowHande}
                  key={patient._id}
                  onNameClickHandle={onNameClickHandle}
                  id={patient._id}
                  row={patient}
                  index={index}
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
            onChange={(event, value) => {
              SetPageSelect(value);
              console.log(value);
            }}
          />
        </div>
      </div>

      <div className=" fixed z-50 bottom-5 left-6">
        <Fab
          color="primary"
          onClick={handleAddButtonClick}
          sx={{ backgroundColor: blue[700], color: "white" }}
          aria-label="add"
        >
          <Add />
        </Fab>
      </div>
      {showAddForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewPatientForm
            currentUser={currentUser}
            constantDiseases={constantDiseases}
            onFormSubmit={handleNewPatientData}
          ></NewPatientForm>
        </>
      ) : (
        ""
      )}

      {!loading ? <Loading></Loading> : ""}

      {showPartientsAddForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewPartientsForm
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
            midscapeData={midscapeData}
            onFormSubmit={handleNewPrescriptionData}
          ></NewPartientsForm>
        </>
      ) : (
        ""
      )}
      {prints && loading ? (
        <div>
          <PatientReport
            prints={prints}
            dataToPrint={dataToPrint}
            medicalReportsStype={medicalReportsStype}
            feedback={handlePrintFeedBack}
          />
        </div>
      ) : (
        ""
      )}
      {showPartientProfile ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowPartientProfile(false);
            }}
          ></BackGroundShadow>
          <PartientsProfile
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
          ></PartientsProfile>
        </>
      ) : (
        ""
      )}
      {showPartientsEditForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewPatientForm
            currentUser={currentUser}
            type={"edit"}
            constantDiseases={constantDiseases}
            onFormSubmit={handleEditPatientData}
            data={userEditData}
          ></NewPatientForm>
        </>
      ) : (
        ""
      )}
      {showMidicalForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <MedicalForm
            settingData={settingData}
            onFormSubmit={handleEditPatientData}
            userEditData={userEditData}
          ></MedicalForm>
        </>
      ) : (
        ""
      )}
      {showAddReportForm ? (
        <>
          {" "}
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewMedicalReporyForm
            medicalReportsStype={medicalReportsStype}
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            type="new"
            changeReportHeaderName={changeReportHeaderName}
            onFormSubmit={handleNewReportData}
          ></NewMedicalReporyForm>
        </>
      ) : (
        ""
      )}

      {showReportEditForm ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowReportEditForm(false);
            }}
          ></BackGroundShadow>
          <NewMedicalReporyForm
            partientsSelectId={partientsSelectId}
            type="edit"
            data={selectedReport}
            onFormSubmit={handleEditReportData}
          ></NewMedicalReporyForm>
        </>
      ) : (
        ""
      )}
      {showLaporyReportForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <AddLaboratoryExamination
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handleNewLaboryData}
          ></AddLaboratoryExamination>
        </>
      ) : (
        ""
      )}
      {showVisitForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <VisitForm
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handleNewVisit}
          ></VisitForm>
        </>
      ) : (
        ""
      )}

      {showLabReportEditForm ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowLabReportEditForm(false);
            }}
          ></BackGroundShadow>
          <AddLaboratoryExamination
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handleEditLabReportData}
            type="edit"
            data={selectedaLabory}
          ></AddLaboratoryExamination>
        </>
      ) : (
        ""
      )}
      {showVisitReportEditForm ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowLabReportEditForm(false);
            }}
          ></BackGroundShadow>
          <VisitForm
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handelEditVisitReportData}
            type="edit"
            data={selectedaLabory}
          ></VisitForm>
        </>
      ) : (
        ""
      )}

      {deleteAlert ? (
        <DeleteAlert
          deleteInfo={deleteInfo}
          onShadowClick={() => {
            setDeleteAlert(false);
          }}
          onDeleteConfirmHandel={onDeleteConfirmHandel}
          onCancelAborteHande={onCancelHande}
        ></DeleteAlert>
      ) : (
        ""
      )}
      {canceleAlert ? (
        <CancelAlert
          onCancelHande={onCancelHande}
          onCancelAborteHande={onCancelAborteHande}
        ></CancelAlert>
      ) : (
        ""
      )}
    </div>
  );
}

export default Partients;
