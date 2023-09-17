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

function Row(props) {
  const { row } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{props.index + 1}</TableCell>
        <TableCell
          onClick={() => {
            props.onNameClickHandle(row._id);
          }}
          component="th"
          scope="row"
          align="right"
        >
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {new Date(row.createdAt).toLocaleString()}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.age}
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.gender}
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
          {row.visitCount}
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
            <SummarizeIcon aria-label="expand row" size="small"></SummarizeIcon>
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
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
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
  const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPartientsAddForm, setShowPartientsAddForm] = useState(false);
  const [showPartientsEditForm, setShowPartientsEditForm] = useState(false);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [showPartientProfile, setShowPartientProfile] = useState(false);
  const [userEditData, setUserEditData] = useState([]);

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
  useEffect(() => {
    getMedicalReportsStyle();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const getMedicalReportsStyle = () => {
    axios
      .get("http://localhost:5000/medicaleeportstyle/getmedicalreportstype")
      .then((response) => {
        setMedicalReportsStype(response.data[0]); // Update the categories state with the fetched data
        console.log(response.data[0]);
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
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleDateRangeSelection = (range) => {
    setSelectedDayRange(range);
    // setShowCalendar(false); // Hide the calendar
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleHideClick = () => {
    setPharmaceListInside([]);
    setShowPartientsEditForm(false);
    setShowPartientProfile(false);
    setShowAddReportForm(false);
    setShowAddForm(false);
    setShowPartientsAddForm(false);
  };

  const handleOnBillInsideRemove = (id) => {
    axios
      .delete(
        `http://localhost:5000/prescription/removebill/${PrescriptionId}/pharmaceutical/${id}`
      )
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(`Category with ID ${id} has been deleted.`);
        getAllPrescription(PrescriptionId);
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting category with ID ${id}:`, error);
      });
  };

  const onShareHande = (id) => {
    console.log(`Share clicked for id ${id}`);
  };

  const onDeleteHande = (id) => {
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`)
      .then((response) => {
        // Handle success, e.g., show a success message or update the categories list
        console.log(`Category with ID ${id} has been deleted.`);
        getPatientsList();
        // You might want to update the categories list here to reflect the changes
      })
      .catch((error) => {
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

  const handleNewPatientData = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/patients/new", data)
      .then((response) => {
        // Handle the response if needed
        getPharmaceApi();
        getPatientsList();
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    // Update the state or perform actions with the data as needed
  };

  const handleEditPatientData = (data) => {
    console.log(data);
    data.id = userEditData._id
    console.log(userEditData._id)
    axios
      .post("http://localhost:5000/patients/edit",data )
      .then((response) => {
        // Handle the response if needed
        getPharmaceApi();
        getPatientsList();
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
        setPharmaceListInside(response.data); // Update the categories state with the fetched data
        console.log(response.data);
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
    axios
      .post("http://localhost:5000/prescription/ubdateData", { data })
      .then((response) => {
        // Handle the response if needed
        getPatientsList();
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
  const handleNewReportData = (data) => {
    axios
      .post("http://localhost:5000/medicalreports/new", { data })
      .then((response) => {
        // Handle the response if needed
        getPatientsList();
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
  return (
    <div className="p-7 relative h-[97vh] overflow-auto">
      <div className=" flex flex-col justify-center items-center p-4">
        <div className="flex bg-white px-4 py-1 rounded-3xl w-1/2">
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
      <div className="flex gap-4 justify-center items-center w-full">
        <div className=" w-1/6">
          <FormControl className="w-full bg-whiteh" size="small" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              تصنيف حسب العمر{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
            >
              <MenuItem value="">
                <em>الكل</em>
              </MenuItem>
              <MenuItem value={10}>1-10</MenuItem>
              <MenuItem value={20}>10-20</MenuItem>
              <MenuItem value={30}>20-30</MenuItem>
              <MenuItem value={30}>30-50</MenuItem>
              <MenuItem value={30}>50-70</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className=" w-1/6">
          <FormControl className="w-full bg-whiteh" size="small" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              تصنيف حسب الحالة{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
            >
              <MenuItem value="">
                <em>الكل</em>
              </MenuItem>
              <MenuItem value={10}>امراض مزمنة</MenuItem>
              <MenuItem value={20}>سكري</MenuItem>
              <MenuItem value={30}>ضغط</MenuItem>
              <MenuItem value={30}>حمل</MenuItem>
              <MenuItem value={30}>50-70</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className=" w-1/6">
          <FormControl className="w-full bg-whiteh" size="small" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              تصنيف حسب الجنس{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
            >
              <MenuItem value="">
                <em>الكل</em>
              </MenuItem>
              <MenuItem value={10}>ذكر</MenuItem>
              <MenuItem value={20}>انثى</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className=" w-1/6">
          <FormControl className="w-full bg-whiteh" size="small" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              تصنيف حسب الوقت
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
            >
              <MenuItem value="">
                <em>الكل</em>
              </MenuItem>
              <MenuItem value={10}>اليوم</MenuItem>
              <MenuItem value={20}>اسبوع</MenuItem>
              <MenuItem value={20}>شهر</MenuItem>
              <MenuItem value={30}>سنه</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button onClick={toggleCalendar}>تحديد مده زمنية</button>
        <div className={`${showCalendar ? "" : "hidden"}`}>
          {/* <Calendar
            value={selectedDayRange}
            onChange={handleDateRangeSelection}
            shouldHighlightWeekends
          /> */}
        </div>
      </div>
      <TableContainer dir="rtl" component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="right">اسم المريض</TableCell>
              <TableCell align="center">التاريخ</TableCell>
              <TableCell align="center">العمر</TableCell>
              <TableCell align="center">الجنس</TableCell>
              <TableCell align="center">العنوان</TableCell>
              <TableCell align="center">الوزن</TableCell>
              <TableCell align="center">الطول</TableCell>
              <TableCell align="center">عدد الزيارات</TableCell>
              <TableCell align="center">الوصفة</TableCell>
              <TableCell align="center">التقرير</TableCell>
              <TableCell align="center">الخيارات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientsList.map((patient, index) => (
              <Row
                onShareHande={onShareHande}
                onDeleteHande={onDeleteHande}
                onPrescriptionDeleteHande={HandleOnPrescriptionDeleteHande}
                onEditHande={onEditHande}
                onReportShowHandel={onReportShowHandel}
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
            constantDiseases={constantDiseases}
            onFormSubmit={handleNewPatientData}
          ></NewPatientForm>
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
            onFormSubmit={handleNewReportData}
          ></NewMedicalReporyForm>
        </>
      ) : (
        ""
      )}
      {showPartientsAddForm ? (
        <>
          {" "}
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
          <NewPartientsForm
            patientsList={patientsList}
            pharmaceList={pharmaceList}
            inTakeTimeList={inTakeTimeList}
            partientId={partientsSelectId}
            onBillInsideRemove={handleOnBillInsideRemove}
            PrescriptionId={PrescriptionId}
            onPrinterClick={HandleonPrinterClick}
            pharmaceListInside={pharmaceListInside}
            onBillAdded={handleOnBillAdded}
            onFormSubmit={handleNewPrescriptionData}
          ></NewPartientsForm>
        </>
      ) : (
        ""
      )}
      {prints ? (
        <PatientReport
          prints={prints}
          dataToPrint={dataToPrint}
          medicalReportsStype={medicalReportsStype}
          feedback={handlePrintFeedBack}
        />
      ) : (
        ""
      )}
      {showPartientProfile ? (
        <>
          <BackGroundShadow onClick={handleHideClick}></BackGroundShadow>
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
    </div>
  );
}

function SelectLabels(props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className=" w-1/6">
      <FormControl className="w-full bg-whiteh" size="small" sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-helper-label">
          {props.title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label={props.title}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>الكل</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Partients;
