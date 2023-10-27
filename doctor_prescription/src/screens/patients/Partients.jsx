import {
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
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
import { useSpeechRecognition } from "react-speech-recognition";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import {
  Add,
  Delete,
  Edit,
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
import { blue, green, red, yellow } from "@mui/material/colors";
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

function Row(props) {
  const { row } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{props.index + 1}</TableCell>
        <TableCell
          className=" cursor-pointer hover:bg-blue-50"
          onClick={() => {
            props.onNameClickHandle(row._id);
          }}
          component="th"
          scope="row"
          align="center"
        >
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <div className="bg-green-200 w-full flex justify-center items-center h-6 rounded-full">
          {new Date(row.createdAt).toLocaleString()}

          </div>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.age}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <div
            className={`p-0.5 rounded-full w-20 ${
              row.gender === "ذكر" ? "bg-blue-200" : "bg-pink-200"
            }`}
          >
            {row.gender}
          </div>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.adresses}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.weight}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.length}
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
                    props.onMedicalFormShowHandle(row._id);
                  }}
                  aria-label="delete"
                  // size="large"
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
                  // size="large"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/rx-icon.svg"}
                    alt=""
                    className="w-7 h-7"
                  />
                  {/* <Vaccines aria-label="expand row" size="small"></Vaccines> */}
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
                  // size="large"
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
                  // size="large"
                >
                  <BiotechIcon size={"small"} />
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <IconButton
                  sx={{ color: green[400] }}
                  className=" hover:text-green-600"
                  onClick={() => props.onShareHande(row._id)}
                  aria-label="delete"
                  // size="large"
                >
                  <Share fontSize="inherit" />
                </IconButton>
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
          colSpan={15}
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
                    <TableCell align="center">الخيارات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.prescription.map((prescription) => (
                    <TableRow key={prescription._id}>
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
  const defaultFrom = {
    year: 2019,
    month: 3,
    day: 4,
  };

  const defaultTo = {
    year: 2019,
    month: 3,
    day: 7,
  };

  const defaultRange = {
    from: defaultFrom,
    to: defaultTo,
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPartientsAddForm, setShowPartientsAddForm] = useState(false);
  const [showPartientsEditForm, setShowPartientsEditForm] = useState(false);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [showLaporyReportForm, setShowLaporyReportForm] = useState(false);
  const [showPartientProfile, setShowPartientProfile] = useState(false);
  const [showMidicalForm, setShowMidicalForm] = useState(false);
  const [userEditData, setUserEditData] = useState([]);
  const [userData, setUserData] = useState([]);

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

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canceleAlert, setCanceleAlert] = useState(false);
  const [range, setRange] = useState([
    {
      //   startDate: new Date(),
      //   endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [midscapeData, setMidscapeData] = useState([]);

  const navigate = useNavigate();
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
      setIsLoaded(true);
    };
    console.log(currentUser);
    verifyUser();
  }, [Cookies, navigate]);

  useEffect(() => {
    getMedicalReportsStyle();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getMedicalReportsStyle = () => {
    axios
      .get("http://localhost:5000/medicaleeportstyle/getmedicalreportstype")
      .then((response) => {
        setMedicalReportsStype(response.data[0]); // Update the categories state with the fetched data
        console.log(response.data[0]);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handlePrint = () => {
    axios
      .get(
        `http://localhost:5000/patients/printpatientsdata/${partientsSelectId}/prescription/${PrescriptionId}`
      )
      .then((response) => {
        setDataToPrint(response.data); // Update the categories state with the fetched data
        console.log(response.data);
        setprints(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/category/getall")
      .then((response) => {
        setCategoryList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
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
      .get("http://localhost:5000/pharmaceutical/getall")
      .then((response) => {
        setPharmaceList(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/intaketime/getall")
      .then((response) => {
        setInTakeTime(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  useEffect(() => {
    axios
      .get("http://localhost:5000/constantdiseases/getall")
      .then((response) => {
        setConstantDiseases(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  useEffect(() => {
    getPatientsList();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount
  const getPatientsList = () => {
    axios
      .get("http://localhost:5000/patients/getall")
      .then((response) => {
        setPatientsList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  // Function to handle the button click to toggle the calendar visibility
  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };
  const handleHideClick = () => {
    setPharmaceListInside([]);
    setCanceleAlert(true);
  };
  const handleOnBillInsideRemove = (id) => {
    setLoading(() => false);

    axios
      .delete(
        `http://localhost:5000/prescription/removebill/${PrescriptionId}/pharmaceutical/${id}`
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
  };
  const onShareHande = (id) => {
    console.log(`Share clicked for id ${id}`);
  };
  const onDeleteHande = (id) => {
    setLoading(false);
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`)
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
  };
  const onEditHande = (id) => {
    axios
      .get(`http://localhost:5000/patients/medicalinfo/${id}`)
      .then((response) => {
        console.log(response.data);
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
      .post("http://localhost:5000/prescription/new", { PartientsId: id })
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data.prescriptionId);
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
      .get(`http://localhost:5000/patients/medicalinfo/${id}`)
      .then((response) => {
        setUserEditData(response.data);
        console.log(response.data);
        setPartientsSelectId(id);
        setShowMidicalForm(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    console.log(`Prescription Show clicked for id ${id}`);
  };
  const handleNewPatientData = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/patients/new", data)
      .then((response) => {
        // Handle the response if needed
        getPharmaceApi();
        getPatientsList();
        setShowAddForm(false);
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    // Update the state or perform actions with the data as needed
  };

  const handleEditPatientData = (data) => {
    data.id = partientsSelectId;
    console.log(data);
    axios
      .post("http://localhost:5000/patients/edit", data)
      .then((response) => {
        // Handle the response if needed
        getPharmaceApi();
        getPatientsList();
        setShowPartientsEditForm(false);
        setShowMidicalForm(false);
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const handleOnBillAdded = (data) => {
    axios
      .post("http://localhost:5000/prescription/postpharmaceutical", data)
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
        getAllPrescription(data.PrescriptionId);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  const getAllPrescription = (PrescriptionId) => {
    axios
      .get(`http://localhost:5000/prescription/getbills/${PrescriptionId}`)
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
      .get(`http://localhost:5000/prescription/medscapecheck/${PrescriptionId}`)
      .then((response) => {
        setMidscapeData(() => response.data.midscapeData);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const onNameClickHandle = (id) => {
    setPartientsSelectId(id);
    setShowPartientProfile(true);
  };
  const handleNewPrescriptionData = (data) => {
    data.patientId = partientsSelectId;
    axios
      .post("http://localhost:5000/prescription/ubdateData", { data })
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
      .get(`http://localhost:5000/patients/medicalinfo/${partientsSelectId}`)
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
      .post("http://localhost:5000/medicalreports/new", { data })
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
      .post("http://localhost:5000/labory/new", { data })
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
  const handeSearchInput = (event) => {
    const searchInputValue = event.target.value;
    axios
      .get(`http://localhost:5000/patients/getbyname/${searchInputValue}`)
      .then((response) => {
        setPatientsList(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    console.log(event.target.value);
  };
  const HandleOnPrescriptionDeleteHande = (patientsId, prescriptionId) => {
    axios
      .delete(
        `http://localhost:5000/patients/Patientsid/${patientsId}/prescriptionid/${prescriptionId}
      `
      )
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        getPatientsList();
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
      });
  };
  const onPrescriptionEditHandel = (patientsId, prescriptionId) => {
    axios
      .get(`http://localhost:5000/prescription/getone/${prescriptionId}?`)
      .then((response) => {
        console.log(response.data);
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
    setShowAddReportForm(false);
    setShowMidicalForm(false);
    setShowAddForm(false);
    setShowPartientsAddForm(false);
  };
  const onCancelAborteHande = () => {
    setCanceleAlert(false);
  };
  useEffect(() => {
    const onQueryChange = () => {
      axios
        .post("http://localhost:5000/patients/queryselect", {
          ageQuery: ageQuery,
          genderQuery: genderQuery,
          stateQuery: stateQuery,
          dateQuery: range,
        })
        .then((response) => {
          setPatientsList(response.data); // Update the categories state with the fetched data

          // Handle the response if needed
          console.log("POST request successful:", response.data);
        })
        .catch((error) => {
          // Handle errors if the request fails
          console.error("Error making POST request:", error);
        });
    };

    onQueryChange();
  }, [ageQuery, stateQuery, genderQuery, dateQuery, range]);

  return (
    <div className="p-7 relative h-[93vh] overflow-scroll">
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
              >
                <MenuItem value="">
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
              >
                <MenuItem value="">
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
              >
                <MenuItem value="">
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
        <TableContainer dir="rtl" className="p-4 border shadow">
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
                  <FormattedMessage id={"Age"} defaultMessage="Hello, World!" />
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
                  onPrescriptionEditHandel={onPrescriptionEditHandel}
                  onShareHande={onShareHande}
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
          {" "}
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
          <PartientsProfile partientId={partientsSelectId}></PartientsProfile>
        </>
      ) : (
        ""
      )}
      {showPartientsEditForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <EditPatientForm
            constantDiseases={constantDiseases}
            onFormSubmit={handleEditPatientData}
            userEditData={userEditData}
          ></EditPatientForm>
        </>
      ) : (
        ""
      )}
      {showMidicalForm ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <MedicalForm
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
            partientsSelectId={partientsSelectId}
            onPrinterClick={HandleonPrinterClickText}
            onFormSubmit={handleNewReportData}
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
