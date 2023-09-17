import React, { useEffect, useState } from "react";
import PatientReport from "../global/PatientReport";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  ToggleButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const data = {
  patients: {
    _id: "64f282ba7f289809591e7209",
    name: "احمد محسن",
    gender: "ذكر",
    age: 12,
    weight: 24,
    phonNumber: "07703324323",
    adresses: "الموصل حي الزهور",
    visitCount: 1,
    diseases: [],
    description: "",
    prescription: [],
    __v: 27,
  },
  prescription: {
    __v: 0,
  },
};

function PrescriptionsDesign() {
  const [medicalReportsStype, setMedicalReportsStype] = useState([]);
  const [loading, setLoading] = useState(false);
  const [medicalMiddleTextReportsStype, setMedicalTextMiddleReportsStype] =
    useState([]);
  const [medicalLeftTextReportsStype, setMedicalTextLeftReportsStype] =
    useState([]);
  const [medicalRightTextReportsStype, setMedicalTextRightReportsStype] =
    useState([]);
  useEffect(() => {
    getMedicalReportsStyle();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const getMedicalReportsStyle = () => {
    ubdateStyle();
  };

  const ubdateStyle = () => {
    axios
      .get("http://localhost:5000/medicaleeportstyle/getmedicalreportstype")
      .then((response) => {
        setMedicalReportsStype(response.data[0]); // Update the categories state with the fetched data
        setMedicalTextMiddleReportsStype(response.data[0].HeaderMidleText);
        setMedicalTextLeftReportsStype(response.data[0].HeaderLeftText);
        setMedicalTextRightReportsStype(response.data[0].HeaderRightText);
        console.log(response.data[0]);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  // const handleOnInputChange = () => {};
  const handleInputChange = (name, value) => {
    const data = { [name]: value };
    console.log(data);
    console.log(medicalReportsStype);
    axios
      .post("http://localhost:5000/medicaleeportstyle/update", {
        id: medicalReportsStype._id,
        data: data,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });

    setMedicalReportsStype({
      ...medicalReportsStype,
      [name]: value,
    });
  };

  const HandleOnTextRemove = (lineType, hederlineid) => {
    axios
      .post("http://localhost:5000/medicaleeportstyle/removeline", {
        id: medicalReportsStype._id,
        type: lineType,
        hederlineid: hederlineid,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
        ubdateStyle();
        ubdateStyle();
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
    console.log(lineType);
  };

  const onMiddleLineInput = (text, data, index, type) => {
    axios
      .post("http://localhost:5000/medicaleeportstyle/updatemiddle", {
        id: medicalReportsStype._id,
        text: text,
        data: data,
        type: type,
        index: index,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
        ubdateStyle();
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const addNewCenterText = (type) => {
    axios
      .post("http://localhost:5000/medicaleeportstyle/newmiddleline", {
        id: medicalReportsStype._id,
        type: type,
      })
      .then((response) => {
        // Handle the response if needed
        ubdateStyle();
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:5000/medicaleeportstyle/backgroundImage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        ubdateStyle()
        // alert("Image uploaded successfully");
        setFile(null);
      } else {
        // alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" h-[91vh] overflow-auto">
      {loading ? (
        <div className="flex justify-around p-3">
          <div className="">
            <div className="flex w-full mt-4 font-bold">
              <p>معلومات الاسم</p>
            </div>

            <div className="flex justify-between items-center gap-10">
              <TextField
                value={medicalReportsStype.mainNameHeader}
                label="اسم الطبيب"
                size="small"
                onChange={(event) => {
                  handleInputChange("mainNameHeader", event.target.value);
                }}
              ></TextField>
              <TextField
                value={medicalReportsStype.mainNameSize}
                onChange={(event) => {
                  handleInputChange("mainNameSize", event.target.value);
                }}
                type="number"
                label="حجم الخط"
                size="small"
              ></TextField>

              <div className="flex flex-col justify-center items-center">
                <p>اللون</p>
                <input
                  value={medicalReportsStype.mainNameHeaderColor}
                  onChange={(event) => {
                    handleInputChange(
                      "mainNameHeaderColor",
                      event.target.value
                    );
                  }}
                  type="color"
                  className=" border-none rounded-full"
                  // value={color} onChange={e => setColor(e.target.value)}
                />
              </div>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={medicalReportsStype.mainNameActive}
                    onChange={(event) => {
                      handleInputChange(
                        "mainNameActive",
                        !medicalReportsStype.mainNameActive
                      );
                    }}
                    color="primary"
                  />
                }
              />
            </div>
            <hr></hr>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الطبيب الوسطية</p>
            </div>
            <div>
              {medicalMiddleTextReportsStype.map((medicalText, index) => (
                <>
                  <div>السطر {index + 1}</div>
                  <div className="flex justify-between items-center w-full">
                    <TextField
                      value={medicalReportsStype.HeaderMidleText[index].text}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "text",
                          event.target.value,
                          index,
                          "middle"
                        );
                        console.log(event.target.value);
                      }}
                      label="معلومات السطر"
                      size="small"
                    ></TextField>
                    <TextField
                      type="number"
                      label="حجم الخط"
                      size="small"
                      value={medicalReportsStype.HeaderMidleText[index].size}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "size",
                          event.target.value,
                          index,
                          "middle"
                        );
                        console.log(event.target.value);
                      }}
                    ></TextField>

                    <div className="flex flex-col justify-center items-center">
                      <p>اللون</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.HeaderMidleText[index].Color}
                        onChange={(event) => {
                          onMiddleLineInput(
                            "Color",
                            event.target.value,
                            index,
                            "middle"
                          );
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                    <IconButton
                      onClick={() => {
                        HandleOnTextRemove("middle", medicalText._id);
                      }}
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                    <FormControlLabel
                      sx={{
                        display: "block",
                      }}
                      control={
                        <Switch
                          //   checked={loading}
                          //   onChange={() => setLoading(!loading)}
                          color="primary"
                        />
                      }
                    />
                  </div>
                </>
              ))}
              <div
                onClick={() => {
                  addNewCenterText("middle");
                }}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة سطر
              </div>
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الطبيب اليمنى</p>
            </div>
            <div>
              {medicalRightTextReportsStype.map((medicalText, index) => (
                <>
                  <div>السطر {index + 1}</div>
                  <div className="flex justify-between items-center w-full">
                    <TextField
                      value={medicalReportsStype.HeaderRightText[index].text}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "text",
                          event.target.value,
                          index,
                          "right"
                        );
                        console.log(event.target.value);
                      }}
                      label="معلومات السطر"
                      size="small"
                    ></TextField>
                    <TextField
                      type="number"
                      label="حجم الخط"
                      size="small"
                      value={medicalReportsStype.HeaderRightText[index].size}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "size",
                          event.target.value,
                          index,
                          "right"
                        );
                        console.log(event.target.value);
                      }}
                    ></TextField>

                    <div className="flex flex-col justify-center items-center">
                      <p>اللون</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.HeaderRightText[index].Color}
                        onChange={(event) => {
                          onMiddleLineInput(
                            "Color",
                            event.target.value,
                            index,
                            "right"
                          );
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                    <IconButton
                      onClick={() => {
                        HandleOnTextRemove("right", medicalText._id);
                      }}
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                    <FormControlLabel
                      sx={{
                        display: "block",
                      }}
                      control={
                        <Switch
                          //   checked={loading}
                          //   onChange={() => setLoading(!loading)}
                          color="primary"
                        />
                      }
                    />
                  </div>
                </>
              ))}
              <div
                onClick={() => {
                  addNewCenterText("right");
                }}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة سطر
              </div>
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الطبيب اليسرى</p>
            </div>
            <div>
              {medicalLeftTextReportsStype.map((medicalText, index) => (
                <>
                  <div>السطر {index + 1}</div>
                  <div className="flex justify-between items-center w-full">
                    <TextField
                      value={medicalReportsStype.HeaderLeftText[index].text}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "text",
                          event.target.value,
                          index,
                          "left"
                        );
                        console.log(event.target.value);
                      }}
                      label="معلومات السطر"
                      size="small"
                    ></TextField>
                    <TextField
                      type="number"
                      label="حجم الخط"
                      size="small"
                      value={medicalReportsStype.HeaderLeftText[index].size}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "size",
                          event.target.value,
                          index,
                          "left"
                        );
                        console.log(event.target.value);
                      }}
                    ></TextField>

                    <div className="flex flex-col justify-center items-center">
                      <p>اللون</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.HeaderLeftText[index].Color}
                        onChange={(event) => {
                          onMiddleLineInput(
                            "Color",
                            event.target.value,
                            index,
                            "left"
                          );
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                    <IconButton
                      onClick={() => {
                        HandleOnTextRemove("left", medicalText._id);
                      }}
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                    <FormControlLabel
                      sx={{
                        display: "block",
                      }}
                      control={
                        <Switch
                          //   checked={loading}
                          //   onChange={() => setLoading(!loading)}
                          color="primary"
                        />
                      }
                    />
                  </div>
                </>
              ))}
              <div
                onClick={() => {
                  addNewCenterText("left");
                }}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة سطر
              </div>
            </div>

            {/* <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الطبيب اليمنى</p>
            </div>
            <div>
              {medicalTextReportsStype.map((medicalText, index) => (
                <>
                  <div>السطر {index + 1}</div>
                  <div className="flex justify-between items-center w-full">
                    <TextField
                      value={medicalReportsStype.HeaderMidleText[index].text}
                      onChange={(event) => {
                        onMiddleLineInput("text", event.target.value, index);
                        console.log(event.target.value);
                      }}
                      label="معلومات السطر"
                      size="small"
                    ></TextField>
                    <TextField
                      type="number"
                      label="حجم الخط"
                      size="small"
                      value={medicalReportsStype.HeaderMidleText[index].size}
                      onChange={(event) => {
                        onMiddleLineInput("size", event.target.value, index);
                        console.log(event.target.value);
                      }}
                    ></TextField>

                    <div className="flex flex-col justify-center items-center">
                      <p>اللون</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.HeaderMidleText[index].Color}
                        onChange={(event) => {
                          onMiddleLineInput("Color", event.target.value, index);
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                    <IconButton
                      onClick={() => {
                        HandleOnTextRemove("middle", medicalText._id);
                      }}
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                    <FormControlLabel
                      sx={{
                        display: "block",
                      }}
                      control={
                        <Switch
                          //   checked={loading}
                          //   onChange={() => setLoading(!loading)}
                          color="primary"
                        />
                      }
                    />
                  </div>
                </>
              ))}
              <div
                onClick={()=>{addNewCenterText("right")}}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة سطر
              </div>
            </div>
            <div>
              <div>السطر 1</div>
              <div className="flex justify-between items-center w-full">
                <TextField label="معلومات السطر" size="small"></TextField>
                <TextField
                  type="number"
                  label="حجم الخط"
                  size="small"
                ></TextField>

                <div className="flex flex-col justify-center items-center">
                  <p>اللون</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    // value={color} onChange={e => setColor(e.target.value)}
                  />
                </div>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      //   checked={loading}
                      //   onChange={() => setLoading(!loading)}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400">
                اضافة سطر
              </div>
            </div> */}

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات المريض</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center flex-col">
                <p>تفعيل العمر</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.ageActive}
                      onChange={(event) => {
                        handleInputChange(
                          "ageActive",
                          !medicalReportsStype.ageActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <p>تفعيل اسم </p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.nameActive}
                      onChange={(event) => {
                        handleInputChange(
                          "nameActive",
                          !medicalReportsStype.nameActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <p> تفعيل التاريخ</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.dateActive}
                      onChange={(event) => {
                        handleInputChange(
                          "dateActive",
                          !medicalReportsStype.dateActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div>
                <div className="flex flex-col justify-center items-center">
                  <p>اللون العنوان</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.patientsTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "patientsTitleColor",
                        event.target.value
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>لون العنوان الثانوي</p>
                  <input
                    value={medicalReportsStype.patientsSubTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "patientsSubTitleColor",
                        event.target.value
                      );
                    }}
                    type="color"
                    className=" border-none rounded-full"
                    // value={color} onChange={e => setColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الجدول</p>
            </div>
            <div className="flex justify-between items-center">
              <TextField
                label=" حجم خط العناوين"
                size="small"
                value={medicalReportsStype.tableHeaderTextSize}
                onChange={(event) => {
                  handleInputChange("tableHeaderTextSize", event.target.value);
                }}
                sx={{ width: "10%" }}
              ></TextField>
              <TextField
                label=" حجم خط المحتوى"
                size="small"
                value={medicalReportsStype.tableContentTextSize}
                onChange={(event) => {
                  handleInputChange("tableContentTextSize", event.target.value);
                }}
                sx={{ width: "10%" }}
              ></TextField>

              <div className="flex justify-center items-center flex-col">
                <p>تفعيل الهيدر</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.tableHeaderActive}
                      onChange={(event) => {
                        handleInputChange(
                          "tableHeaderActive",
                          !medicalReportsStype.tableHeaderActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div>
                <div className="flex justify-center items-center flex-col">
                  <p>تفعيل التسلسل </p>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={medicalReportsStype.col1Active}
                        onChange={(event) => {
                          handleInputChange(
                            "col1Active",
                            !medicalReportsStype.col1Active
                          );
                        }}
                        color="primary"
                      />
                    }
                  />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p>تفعيل الدواء </p>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={medicalReportsStype.col2Active}
                        onChange={(event) => {
                          handleInputChange(
                            "col2Active",
                            !medicalReportsStype.col2Active
                          );
                        }}
                        color="primary"
                      />
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-center items-center flex-col">
                  <p>تفعيل الجرع </p>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={medicalReportsStype.col3Active}
                        onChange={(event) => {
                          handleInputChange(
                            "col3Active",
                            !medicalReportsStype.col3Active
                          );
                        }}
                        color="primary"
                      />
                    }
                  />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p>تفعيل عدد الجرع </p>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={medicalReportsStype.col4Active}
                        onChange={(event) => {
                          handleInputChange(
                            "col4Active",
                            !medicalReportsStype.col4Active
                          );
                        }}
                        color="primary"
                      />
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-center items-center flex-col">
                  <p>تفعيل وقت التناول </p>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={medicalReportsStype.col5Active}
                        onChange={(event) => {
                          handleInputChange(
                            "col5Active",
                            !medicalReportsStype.col5Active
                          );
                        }}
                        //   checked={loading}
                        //   onChange={() => setLoading(!loading)}
                        color="primary"
                      />
                    }
                  />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p>تفعيل الملاحضات </p>
                  <FormControlLabel
                    sx={{
                      display: "block",
                    }}
                    control={
                      <Switch
                        checked={medicalReportsStype.col6Active}
                        onChange={(event) => {
                          handleInputChange(
                            "col6Active",
                            !medicalReportsStype.col6Active
                          );
                        }}
                        color="primary"
                      />
                    }
                  />
                </div>
              </div>
              <div>
                <div>لون العناوين</div>
                <input
                  value={medicalReportsStype.tableHeaderColor}
                  onChange={(event) => {
                    handleInputChange("tableHeaderColor", event.target.value);
                  }}
                  type="color"
                  className=" border-none rounded-full"
                />
                <div>لون المحتويات</div>
                <input
                  value={medicalReportsStype.tableContentColor}
                  onChange={(event) => {
                    handleInputChange("tableContentColor", event.target.value);
                  }}
                  type="color"
                  className=" border-none rounded-full"
                />
              </div>
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الفوتر</p>
            </div>
            <div className="flex justify-between items-center">
              <TextField
                label="حجم الخط"
                size="small"
                value={medicalReportsStype.footerTextSize}
                onChange={(event) => {
                  handleInputChange("footerTextSize", event.target.value);
                }}
                sx={{ width: "10%" }}
              ></TextField>
              <TextField
                label="لون الخط"
                size="small"
                type="color"
                value={medicalReportsStype.footerTextColor}
                onChange={(event) => {
                  handleInputChange("footerTextColor", event.target.value);
                }}
                sx={{ width: "10%" }}
              ></TextField>

              <div className="flex justify-center items-center flex-col">
                <p>تفعيل العنوان</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.addressActive}
                      onChange={(event) => {
                        handleInputChange(
                          "addressActive",
                          !medicalReportsStype.addressActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <p>تفعيل تاريخ التسجيل </p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.dateOfRegistrationActive}
                      onChange={(event) => {
                        handleInputChange(
                          "dateOfRegistrationActive",
                          !medicalReportsStype.dateOfRegistrationActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <p>تفعيل رقم التسجيل </p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.numberOfRegistratonActive}
                      onChange={(event) => {
                        handleInputChange(
                          "numberOfRegistratonActive",
                          !medicalReportsStype.numberOfRegistratonActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <p>تفعيل رقم الهاتف </p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.phoneNumberActive}
                      onChange={(event) => {
                        handleInputChange(
                          "phoneNumberActive",
                          !medicalReportsStype.phoneNumberActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TextField
                label="العنوان"
                value={medicalReportsStype.address}
                onChange={(event) => {
                  handleInputChange("address", event.target.value);
                }}
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.dateOfRegistration}
                onChange={(event) => {
                  handleInputChange("dateOfRegistration", event.target.value);
                }}
                label="تاريخ التسجيل"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.numberOfRegistraton}
                onChange={(event) => {
                  handleInputChange("numberOfRegistraton", event.target.value);
                }}
                label="رقم التسجيل"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.phoneNumber}
                onChange={(event) => {
                  handleInputChange("phoneNumber", event.target.value);
                }}
                label="رقم الهاتف"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الخلفية</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p>صوره الخلفية</p>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div></div>
                  <div className="p-4 rounded-lg w-24 flex justify-center items-center h-4 bg-blue-500">
                    <button type="submit">رفع الصورة</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات التوقيع</p>
            </div>

            <div className="flex">
              <TextField
                value={medicalReportsStype.signature}
                onChange={(event) => {
                  handleInputChange("signature", event.target.value);
                }}
                label="التوقيع"
                size="small"
                sx={{ width: "60%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.signatureColor}
                onChange={(event) => {
                  handleInputChange("signatureColor", event.target.value);
                }}
                label="لون التوقيع"
                size="small"
                type="color"
                sx={{ width: "30%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.signatureSize}
                onChange={(event) => {
                  handleInputChange("signatureSize", event.target.value);
                }}
                label="حجم التوقيع"
                size="small"
                sx={{ width: "40%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.signatureX}
                onChange={(event) => {
                  handleInputChange("signatureX", event.target.value);
                }}
                label="X"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.signatureY}
                onChange={(event) => {
                  handleInputChange("signatureY", event.target.value);
                }}
                label="Y"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
            </div>
          </div>
          <div className="h-[100vh] w-[500px] bg-white">
            <PatientReport
              medicalReportsStype={medicalReportsStype}
              dataToPrint={data}
            ></PatientReport>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PrescriptionsDesign;
