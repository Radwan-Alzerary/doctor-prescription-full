import React, { useEffect, useState } from "react";
import PatientReport from "../global/PatientReport";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  ToggleButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ImageInput from "../../components/Partients/ImageInput";

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
    pharmaceutical: [
      {
        id: { name: "اسم الدواء", tradeName: "الاسم العلمي" },
        dose: "الجرعة",
        doseNum: "عدد الجرع",
        inTakeTime: { name: "وقت التناول" },
        description:"This code provides a complete and functional `PrescriptionsDesign` "
      },
      {
        id: { name: "اسم الدواء", tradeName: "الاسم العلمي" },
        dose: "الجرعة",
        doseNum: "عدد الجرع",
        inTakeTime: { name: "وقت التناول" },
      },
    ],
  },
};

function PrescriptionsDesign() {
  const [medicalReportsStype, setMedicalReportsStype] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shapeArray, setShapeArray] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);

  const [medicalMiddleTextReportsStype, setMedicalTextMiddleReportsStype] =
    useState([]);
  const [medicalLeftTextReportsStype, setMedicalTextLeftReportsStype] =
    useState([]);
  const [medicalRightTextReportsStype, setMedicalTextRightReportsStype] =
    useState([]);
  const [textRandom, setTextRandom] = useState([]);

  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    getMedicalReportsStyle();
  }, []); // The empty array [] means this effect runs only once, like componentDidMount

  const getMedicalReportsStyle = () => {
    ubdateStyle();
  };

  const ubdateStyle = () => {
    axios
      .get(`${serverAddress}/medicaleeportstyle/getmedicalreportstype`)
      .then((response) => {
        setMedicalReportsStype(response.data[0]); // Update the categories state with the fetched data
        setShapeArray(response.data[0].shape);
        setImagesArray(response.data[0].images);

        setMedicalTextMiddleReportsStype(response.data[0].HeaderMidleText);
        setMedicalTextLeftReportsStype(response.data[0].HeaderLeftText);
        setMedicalTextRightReportsStype(response.data[0].HeaderRightText);
        setTextRandom(response.data[0].textRandom);
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
      .post(`${serverAddress}/medicaleeportstyle/update`, {
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
      .post(`${serverAddress}/medicaleeportstyle/removeline`, {
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
      .post(`${serverAddress}/medicaleeportstyle/updatemiddle`, {
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

  const onShapeInputChange = (text, data, index) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/updateshape`, {
        id: medicalReportsStype._id,
        text: text,
        data: data,
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
  const onImagesInputChange = (text, data, index) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/updateimages`, {
        id: medicalReportsStype._id,
        text: text,
        data: data,
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

  const onRandomTextInput = (text, data, index) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/updatetextRandom`, {
        id: medicalReportsStype._id,
        text: text,
        data: data,
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

  const addNewShape = () => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/newShape`, {
        id: medicalReportsStype._id,
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

  const addNewImages = () => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/newImages`, {
        id: medicalReportsStype._id,
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

  const addNewCenterText = (type) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/newmiddleline`, {
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
  const addNewRandomText = (type) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/textRandom`, {
        id: medicalReportsStype._id,
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
  const removeImages = (elementId) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/deleteImages`, {
        id: medicalReportsStype._id,
        elementId: elementId,
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
  const removeShape = (elementId) => {
    axios
      .post(`${serverAddress}/medicaleeportstyle/deleteShape`, {
        id: medicalReportsStype._id,
        elementId: elementId,
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
  const handleImagesFilesChange = async (file, index) => {
    const selectedFile = file;
    setFile(selectedFile);
    console.log(file);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("index", index);
    formData.append("id", medicalReportsStype._id);
    try {
      const response = await fetch(
        `${serverAddress}/medicaleeportstyle/importImages/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setFile(null);
        console.log("xx");
      } else {
        // alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        `${serverAddress}/medicaleeportstyle/backgroundImage`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        ubdateStyle();
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
          <div className="w-[50%]">
            <div className="flex w-full mt-4 font-bold">
              <p>معلومات الكنية</p>
            </div>
            <div className="flex justify-between items-center gap-10">
              <TextField
                value={medicalReportsStype.mainNameHeaderknia}
                label="الكنية"
                size="small"
                onChange={(event) => {
                  handleInputChange("mainNameHeaderknia", event.target.value);
                }}
              ></TextField>
              <TextField
                value={medicalReportsStype.mainNameHeaderkniaMarginY}
                label="ازاحة سفلية"
                type="number"
                size="small"
                onChange={(event) => {
                  handleInputChange(
                    "mainNameHeaderkniaMarginY",
                    event.target.value
                  );
                }}
              ></TextField>

              <TextField
                value={medicalReportsStype.mainNameHeaderkniaSize}
                onChange={(event) => {
                  handleInputChange(
                    "mainNameHeaderkniaSize",
                    event.target.value
                  );
                }}
                type="number"
                label="حجم الخط"
                size="small"
              ></TextField>
              <div className="flex flex-col justify-center items-center">
                <p>اللون</p>
                <input
                  value={medicalReportsStype.mainNameHeaderkniaColor}
                  onChange={(event) => {
                    handleInputChange(
                      "mainNameHeaderkniaColor",
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
                    checked={medicalReportsStype.mainNameHeaderkniaActive}
                    onChange={(event) => {
                      handleInputChange(
                        "mainNameHeaderkniaActive",
                        !medicalReportsStype.mainNameHeaderkniaActive
                      );
                    }}
                    color="primary"
                  />
                }
              />
            </div>
            <hr></hr>
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
                value={medicalReportsStype.mainNameHeaderMarginY}
                label="ازاحة سفلية"
                type="number"
                size="small"
                onChange={(event) => {
                  handleInputChange(
                    "mainNameHeaderMarginY",
                    event.target.value
                  );
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
              <p>الاشكال</p>
            </div>
            <div>
              {shapeArray.map((shape, index) => (
                <>
                  <div>الشكل {index + 1}</div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-2">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          نوع الشكل{" "}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={medicalReportsStype.shape[index].shapetype}
                          label="Age"
                          size="small"
                          onChange={(event) => {
                            onShapeInputChange(
                              "shapetype",
                              event.target.value,
                              index
                            );
                            console.log(event.target.value);
                          }}
                        >
                          <MenuItem value={"rectangle"}>مستطيل</MenuItem>
                          <MenuItem value={"circle"}>دائري</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        type="number"
                        label="اولوية"
                        size="small"
                        value={medicalReportsStype.shape[index].zindex}
                        onChange={(event) => {
                          onShapeInputChange(
                            "zindex",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex flex-col gap-2">
                      <TextField
                        type="number"
                        label="العرض"
                        size="small"
                        value={medicalReportsStype.shape[index].width}
                        onChange={(event) => {
                          onShapeInputChange(
                            "width",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="الارتفاع"
                        size="small"
                        value={medicalReportsStype.shape[index].height}
                        onChange={(event) => {
                          onShapeInputChange(
                            "height",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex flex-col gap-2">
                      <TextField
                        type="number"
                        label="x"
                        size="small"
                        value={medicalReportsStype.shape[index].placeX}
                        onChange={(event) => {
                          onShapeInputChange(
                            "placeX",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="y"
                        size="small"
                        value={medicalReportsStype.shape[index].placeY}
                        onChange={(event) => {
                          onShapeInputChange(
                            "placeY",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex flex-col gap-2">
                      <TextField
                        type="number"
                        label="التكوير"
                        size="small"
                        value={medicalReportsStype.shape[index].borderRadius}
                        onChange={(event) => {
                          onShapeInputChange(
                            "borderRadius",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="حجم الاطار"
                        size="small"
                        value={medicalReportsStype.shape[index].borderWidth}
                        onChange={(event) => {
                          onShapeInputChange(
                            "borderWidth",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <p>لون الداخل</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.shape[index].color}
                        onChange={(event) => {
                          onShapeInputChange(
                            "color",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p>لون الاطار</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.shape[index].borderColor}
                        onChange={(event) => {
                          onShapeInputChange(
                            "borderColor",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      />
                    </div>

                    <IconButton
                      onClick={() => {
                        removeShape(shape._id);
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
                          checked={medicalReportsStype.shape[index].active}
                          onChange={(event) => {
                            onShapeInputChange(
                              "active",
                              !medicalReportsStype.shape[index].active,
                              index
                            );
                            console.log(event.target.value);
                          }}
                          color="primary"
                        />
                      }
                    />
                  </div>
                </>
              ))}
              <div
                onClick={() => {
                  addNewShape();
                }}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة شكل
              </div>
            </div>
            <div className="flex w-full  mt-4 font-bold">
              <p>الصور</p>
            </div>
            <div>
              {imagesArray.map((images, index) => (
                <>
                  <div>الصورة {index + 1}</div>
                  <div className="flex justify-center items-center w-full">
                    <div></div>
                    <ImageInput
                      handleFileChange={handleImagesFilesChange}
                      index={index}
                    ></ImageInput>
                    <div className="flex w-full flex-col gap-2">
                      <TextField
                        type="number"
                        label="الارتفاع"
                        size="small"
                        value={medicalReportsStype.images[index].height}
                        onChange={(event) => {
                          onImagesInputChange(
                            "height",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="العرض"
                        size="small"
                        value={medicalReportsStype.images[index].width}
                        onChange={(event) => {
                          onImagesInputChange(
                            "width",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex w-full flex-col gap-2">
                      <TextField
                        type="number"
                        label="x"
                        size="small"
                        value={medicalReportsStype.images[index].placeX}
                        onChange={(event) => {
                          onImagesInputChange(
                            "placeX",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="y"
                        size="small"
                        value={medicalReportsStype.images[index].placeY}
                        onChange={(event) => {
                          onImagesInputChange(
                            "placeY",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <TextField
                        type="number"
                        label="الشفافية"
                        size="small"
                        value={medicalReportsStype.images[index].opacity}
                        onChange={(event) => {
                          onImagesInputChange(
                            "opacity",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="الاولوية"
                        size="small"
                        value={medicalReportsStype.images[index].zindex}
                        onChange={(event) => {
                          onImagesInputChange(
                            "zindex",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex w-full flex-col gap-2">
                      <TextField
                        type="number"
                        label="التكوير"
                        size="small"
                        value={medicalReportsStype.images[index].borderRadius}
                        onChange={(event) => {
                          onImagesInputChange(
                            "borderRadius",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                      <TextField
                        type="number"
                        label="حجم الاطار"
                        size="small"
                        value={medicalReportsStype.images[index].borderWidth}
                        onChange={(event) => {
                          onImagesInputChange(
                            "borderWidth",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      ></TextField>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <p>لون الاطار</p>
                      <input
                        type="color"
                        className=" border-none rounded-full"
                        value={medicalReportsStype.images[index].borderColor}
                        onChange={(event) => {
                          onImagesInputChange(
                            "borderColor",
                            event.target.value,
                            index
                          );
                          console.log(event.target.value);
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <IconButton
                        onClick={() => {
                          removeImages(images._id);
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
                            checked={medicalReportsStype.images[index].active}
                            onChange={(event) => {
                              onImagesInputChange(
                                "active",
                                !medicalReportsStype.images[index].active,
                                index
                              );
                              console.log(event.target.value);
                            }}
                            color="primary"
                          />
                        }
                      />
                    </div>
                  </div>
                </>
              ))}
              <div
                onClick={() => {
                  addNewImages();
                }}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة صورة
              </div>
            </div>

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
                      sx={{ width: "100%" }}
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
                    <div>
                      <TextField
                        type="number"
                        sx={{ width: "100%" }}
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
                    </div>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          وزن الخط
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={
                            medicalReportsStype.HeaderMidleText[index]
                              .textWeight
                          }
                          label="Age"
                          size="small"
                          onChange={(event) => {
                            onMiddleLineInput(
                              "textWeight",
                              event.target.value,
                              index,
                              "middle"
                            );
                            console.log(event.target.value);
                          }}
                        >
                          <MenuItem value={"normal"}>اعتيادي</MenuItem>
                          <MenuItem value={"bold"}>بولد</MenuItem>
                          <MenuItem value={"lighter"}>لايت</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <TextField
                      type="number"
                      label="ازاحة سفلية"
                      size="small"
                      value={medicalReportsStype.HeaderMidleText[index].marginB}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "marginB",
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
                          checked={
                            medicalReportsStype.HeaderMidleText[index].active
                          }
                          onChange={(event) => {
                            onMiddleLineInput(
                              "active",
                              !medicalReportsStype.HeaderMidleText[index]
                                .active,
                              index,
                              "middle"
                            );

                            console.log(event.target.value);
                          }}
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        وزن الخط
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          medicalReportsStype.HeaderRightText[index].textWeight
                        }
                        label="Age"
                        size="small"
                        onChange={(event) => {
                          onMiddleLineInput(
                            "textWeight",
                            event.target.value,
                            index,
                            "right"
                          );
                          console.log(event.target.value);
                        }}
                      >
                        <MenuItem value={"normal"}>اعتيادي</MenuItem>
                        <MenuItem value={"bold"}>بولد</MenuItem>
                        <MenuItem value={"lighter"}>لايت</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      type="number"
                      label="ازاحة سفلية"
                      size="small"
                      value={medicalReportsStype.HeaderRightText[index].marginB}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "marginB",
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        وزن الخط
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          medicalReportsStype.HeaderLeftText[index].textWeight
                        }
                        label="Age"
                        size="small"
                        onChange={(event) => {
                          onMiddleLineInput(
                            "textWeight",
                            event.target.value,
                            index,
                            "left"
                          );
                          console.log(event.target.value);
                        }}
                      >
                        <MenuItem value={"normal"}>اعتيادي</MenuItem>
                        <MenuItem value={"bold"}>بولد</MenuItem>
                        <MenuItem value={"lighter"}>لايت</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      type="number"
                      label="ازاحة سفلية"
                      size="small"
                      value={medicalReportsStype.HeaderLeftText[index].marginB}
                      onChange={(event) => {
                        onMiddleLineInput(
                          "marginB",
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
            {/* معلومات المريض */}
            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات المريض</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center flex-col">
                <p>تفعيل العوان الرئيسي</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.patientsTitleActive}
                      onChange={(event) => {
                        handleInputChange(
                          "patientsTitleActive",
                          !medicalReportsStype.patientsTitleActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
              </div>
              <div className="  flex justify-center items-center flex-col">
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
                <p> تفعيل العنوان</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.ageMainTitleActive}
                      onChange={(event) => {
                        handleInputChange(
                          "ageMainTitleActive",
                          !medicalReportsStype.ageMainTitleActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <p>تفعيل الاحداثي</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.ageAbsoulateActive}
                      onChange={(event) => {
                        handleInputChange(
                          "ageAbsoulateActive",
                          !medicalReportsStype.ageAbsoulateActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <div className="flex justify-center items-center flex-col gap-2">
                  <TextField
                    type="number"
                    label="x"
                    size="small"
                    value={medicalReportsStype.ageX}
                    onChange={(event) => {
                      handleInputChange("ageX", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="y"
                    size="small"
                    value={medicalReportsStype.ageY}
                    onChange={(event) => {
                      handleInputChange("ageY", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="الحجم"
                    size="small"
                    value={medicalReportsStype.ageSize}
                    onChange={(event) => {
                      handleInputChange("ageSize", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>

                  <p>اللون</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.ageColor}
                    onChange={(event) => {
                      handleInputChange("ageColor", event.target.value);
                    }}
                  />

                  <p>اللون العنوان</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.ageMainTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "ageMainTitleColor",
                        event.target.value
                      );
                    }}
                  />
                </div>
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
                <p> تفعيل العنوان</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.nameMainTitleActive}
                      onChange={(event) => {
                        handleInputChange(
                          "nameMainTitleActive",
                          !medicalReportsStype.nameMainTitleActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <p>تفعيل الاحداثي</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.nameAbsoulateActive}
                      onChange={(event) => {
                        handleInputChange(
                          "nameAbsoulateActive",
                          !medicalReportsStype.nameAbsoulateActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <div className="flex justify-center items-center flex-col gap-2">
                  <TextField
                    type="number"
                    label="x"
                    size="small"
                    value={medicalReportsStype.nameX}
                    onChange={(event) => {
                      handleInputChange("nameX", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="y"
                    size="small"
                    value={medicalReportsStype.nameY}
                    onChange={(event) => {
                      handleInputChange("nameY", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="الحجم"
                    size="small"
                    value={medicalReportsStype.nameSize}
                    onChange={(event) => {
                      handleInputChange("nameSize", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>

                  <p>اللون</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.nameColor}
                    onChange={(event) => {
                      handleInputChange("nameColor", event.target.value);
                    }}
                  />

                  <p>لون العنوان</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.nameMainTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "nameMainTitleColor",
                        event.target.value
                      );
                    }}
                  />
                </div>
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
                <p> تفعيل العنوان</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.dateMainTitleActive}
                      onChange={(event) => {
                        handleInputChange(
                          "dateMainTitleActive",
                          !medicalReportsStype.dateMainTitleActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <p>تفعيل الاحداثي</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.dateAbsoulateActive}
                      onChange={(event) => {
                        handleInputChange(
                          "dateAbsoulateActive",
                          !medicalReportsStype.dateAbsoulateActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
                <div className="flex justify-center items-center flex-col gap-2">
                  <TextField
                    type="number"
                    label="x"
                    size="small"
                    value={medicalReportsStype.dateX}
                    onChange={(event) => {
                      handleInputChange("dateX", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="y"
                    size="small"
                    value={medicalReportsStype.dateY}
                    onChange={(event) => {
                      handleInputChange("dateY", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="الحجم"
                    size="small"
                    value={medicalReportsStype.dateSize}
                    onChange={(event) => {
                      handleInputChange("dateSize", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>

                  <p>اللون</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.dateColor}
                    onChange={(event) => {
                      handleInputChange("dateColor", event.target.value);
                    }}
                  />

                  <p>لون العنوان</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.dateMainTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "dateMainTitleColor",
                        event.target.value
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <p> تفعيل الوزن</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.weightActive}
                      onChange={(event) => {
                        handleInputChange(
                          "weightActive",
                          !medicalReportsStype.weightActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
                <p> تفعيل العنوان</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.weightMainTitleActive}
                      onChange={(event) => {
                        handleInputChange(
                          "weightMainTitleActive",
                          !medicalReportsStype.weightMainTitleActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <p>تفعيل الاحداثي</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.weightAbsoulateActive}
                      onChange={(event) => {
                        handleInputChange(
                          "weightAbsoulateActive",
                          !medicalReportsStype.weightAbsoulateActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
                <div className="flex justify-center items-center flex-col gap-2">
                  <TextField
                    type="number"
                    label="x"
                    size="small"
                    value={medicalReportsStype.weightX}
                    onChange={(event) => {
                      handleInputChange("weightX", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="y"
                    size="small"
                    value={medicalReportsStype.weightY}
                    onChange={(event) => {
                      handleInputChange("weightY", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="الحجم"
                    size="small"
                    value={medicalReportsStype.weightSize}
                    onChange={(event) => {
                      handleInputChange("weightSize", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>

                  <p>اللون</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.weightColor}
                    onChange={(event) => {
                      handleInputChange("weightColor", event.target.value);
                    }}
                  />

                  <p>لون العنوان</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.weightMainTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "weightMainTitleColor",
                        event.target.value
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <p> تفعيل الجنس</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.genderActive}
                      onChange={(event) => {
                        handleInputChange(
                          "genderActive",
                          !medicalReportsStype.genderActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
                <p> تفعيل العنوان</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.genderMainTitleActive}
                      onChange={(event) => {
                        handleInputChange(
                          "genderMainTitleActive",
                          !medicalReportsStype.genderMainTitleActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />

                <p>تفعيل الاحداثي</p>
                <FormControlLabel
                  sx={{
                    display: "block",
                  }}
                  control={
                    <Switch
                      checked={medicalReportsStype.genderAbsoulateActive}
                      onChange={(event) => {
                        handleInputChange(
                          "genderAbsoulateActive",
                          !medicalReportsStype.genderAbsoulateActive
                        );
                      }}
                      color="primary"
                    />
                  }
                />
                <div className="flex justify-center items-center flex-col gap-2">
                  <TextField
                    type="number"
                    label="x"
                    size="small"
                    value={medicalReportsStype.genderX}
                    onChange={(event) => {
                      handleInputChange("genderX", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="y"
                    size="small"
                    value={medicalReportsStype.genderY}
                    onChange={(event) => {
                      handleInputChange("genderY", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>
                  <TextField
                    type="number"
                    label="الحجم"
                    size="small"
                    value={medicalReportsStype.genderSize}
                    onChange={(event) => {
                      handleInputChange("genderSize", event.target.value);
                    }}
                    inputProps={{ min: "0", max: "100" }}
                  ></TextField>

                  <p>اللون</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.genderColor}
                    onChange={(event) => {
                      handleInputChange("genderColor", event.target.value);
                    }}
                  />

                  <p>لون العنوان</p>
                  <input
                    type="color"
                    className=" border-none rounded-full"
                    value={medicalReportsStype.genderMainTitleColor}
                    onChange={(event) => {
                      handleInputChange(
                        "genderMainTitleColor",
                        event.target.value
                      );
                    }}
                  />
                </div>
              </div>

              {/* <div>
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
              </div> */}
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الجدول</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <div>
                  <TextField
                    label=" حجم خط العناوين"
                    size="small"
                    value={medicalReportsStype.tableHeaderTextSize}
                    onChange={(event) => {
                      handleInputChange(
                        "tableHeaderTextSize",
                        event.target.value
                      );
                    }}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    label=" حجم خط المحتوى"
                    size="small"
                    value={medicalReportsStype.tableContentTextSize}
                    onChange={(event) => {
                      handleInputChange(
                        "tableContentTextSize",
                        event.target.value
                      );
                    }}
                  ></TextField>
                </div>
              </div>

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

            <div>
              <div className="flex w-full  mt-4 font-bold">
                <p>معلومات اسم الدواء</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <div>
                    <TextField
                      label=" حجم خط اسم الدواء"
                      size="small"
                      value={medicalReportsStype.tableHeaderTextSize}
                      onChange={(event) => {
                        handleInputChange(
                          "tableHeaderTextSize",
                          event.target.value
                        );
                      }}
                    ></TextField>
                  </div>
                  <div>
                    <TextField
                      label=" حجم خط المحتوى"
                      size="small"
                      value={medicalReportsStype.tableContentTextSize}
                      onChange={(event) => {
                        handleInputChange(
                          "tableContentTextSize",
                          event.target.value
                        );
                      }}
                    ></TextField>
                  </div>
                </div>
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

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الباركود</p>
            </div>

            <div className="flex">
              <TextField
                value={medicalReportsStype.barcodeSize}
                onChange={(event) => {
                  handleInputChange("barcodeSize", event.target.value);
                }}
                label="حجم الباركود"
                size="small"
                sx={{ width: "40%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.barcodeX}
                onChange={(event) => {
                  handleInputChange("barcodeX", event.target.value);
                }}
                label="X"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.barcodeY}
                onChange={(event) => {
                  handleInputChange("barcodeY", event.target.value);
                }}
                label="Y"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={medicalReportsStype.barcodeActive}
                    onChange={(event) => {
                      handleInputChange(
                        "barcodeActive",
                        !medicalReportsStype.barcodeActive
                      );
                    }}
                    color="primary"
                  />
                }
              />
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الزيارة القادمة</p>
            </div>
            


            <div className="flex">
              <TextField
                value={medicalReportsStype.patientsNextVisitSize}
                onChange={(event) => {
                  handleInputChange("patientsNextVisitSize", event.target.value);
                }}
                label="حجم الكتابة"
                size="small"
                sx={{ width: "40%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.patientsNextVisitX}
                onChange={(event) => {
                  handleInputChange("patientsNextVisitX", event.target.value);
                }}
                label="X"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.patientsNextVisitY}
                onChange={(event) => {
                  handleInputChange("patientsNextVisitY", event.target.value);
                }}
                label="Y"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={medicalReportsStype.patientsNextVisitActive}
                    onChange={(event) => {
                      handleInputChange(
                        "patientsNextVisitActive",
                        !medicalReportsStype.patientsNextVisitActive
                      );
                    }}
                    color="primary"
                  />
                }
              />
            </div>


            <div className="flex w-full  mt-4 font-bold">
              <p>معلومات الصفحة</p>
            </div>
            <div className="flex">
              <TextField
                value={medicalReportsStype.backgroundColor}
                onChange={(event) => {
                  handleInputChange("backgroundColor", event.target.value);
                }}
                label="لون الصفحة"
                size="small"
                type="color"
                sx={{ width: "30%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.xPading}
                onChange={(event) => {
                  handleInputChange("xPading", event.target.value);
                }}
                label="تقليص الجوانب"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.rightPading}
                onChange={(event) => {
                  handleInputChange("rightPading", event.target.value);
                }}
                label="تقليص ايمن"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
              <TextField
                value={medicalReportsStype.leftPading}
                onChange={(event) => {
                  handleInputChange("leftPading", event.target.value);
                }}
                label="تقليص ايسر"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>

              <TextField
                value={medicalReportsStype.topPading}
                onChange={(event) => {
                  handleInputChange("topPading", event.target.value);
                }}
                label="تقليص علوي"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>

              <TextField
                value={medicalReportsStype.bottomPading}
                onChange={(event) => {
                  handleInputChange("bottomPading", event.target.value);
                }}
                label="تقليص سفلي"
                size="small"
                sx={{ width: "20%" }}
              ></TextField>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>تفعيل الخطوط </p>
              <FormControlLabel
                sx={{
                  display: "block",
                }}
                control={
                  <Switch
                    checked={medicalReportsStype.linesActive}
                    onChange={(event) => {
                      handleInputChange(
                        "linesActive",
                        !medicalReportsStype.linesActive
                      );
                    }}
                    color="primary"
                  />
                }
              />
            </div>

            <div className="flex w-full  mt-4 font-bold">
              <p>اضافة كتابات اضافية</p>
            </div>
            <div>
              {textRandom
                ? textRandom.map((textData, index) => (
                    <>
                      <div>السطر {index + 1}</div>
                      <div className="flex justify-between items-center w-full">
                        <TextField
                          value={medicalReportsStype.textRandom[index].title}
                          onChange={(event) => {
                            onRandomTextInput(
                              "title",
                              event.target.value,
                              index
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
                          value={medicalReportsStype.textRandom[index].size}
                          onChange={(event) => {
                            onRandomTextInput(
                              "size",
                              event.target.value,
                              index
                            );
                            console.log(event.target.value);
                          }}
                        ></TextField>
                        <TextField
                          type="number"
                          label="x"
                          size="small"
                          value={medicalReportsStype.textRandom[index].x}
                          onChange={(event) => {
                            onRandomTextInput(
                              "x",
                              event.target.value,
                              index,
                              onRandomTextInput
                            );

                            console.log(event.target.value);
                          }}
                          inputProps={{ min: "0", max: "100" }}
                        ></TextField>
                        <TextField
                          type="number"
                          label="y"
                          size="small"
                          value={medicalReportsStype.textRandom[index].y}
                          onChange={(event) => {
                            onRandomTextInput("y", event.target.value, index);
                            console.log(event.target.value);
                          }}
                          inputProps={{ min: "0", max: "100" }}
                        ></TextField>

                        <div className="flex flex-col justify-center items-center">
                          <p>اللون</p>
                          <input
                            type="color"
                            className=" border-none rounded-full"
                            value={medicalReportsStype.textRandom[index].color}
                            onChange={(event) => {
                              onRandomTextInput(
                                "color",
                                event.target.value,
                                index
                              );
                              console.log(event.target.value);
                            }}
                          />
                        </div>
                        <IconButton
                          onClick={() => {
                            HandleOnTextRemove("randomText", textData._id);
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
                          control={<Switch color="primary" />}
                        />
                      </div>
                    </>
                  ))
                : ""}
              <div
                onClick={() => {
                  addNewRandomText("right");
                }}
                className="w-full bg-blue-300 h-8 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-400"
              >
                اضافة نص جديد
              </div>
              <TextField
                value={medicalReportsStype.reportTextDistance}
                onChange={(event) => {
                  handleInputChange("reportTextDistance", event.target.value);
                }}
                label="المسافة بين الكلمات في التقرير"
                size="small"
                type="number"
                sx={{ width: "60%" }}
              ></TextField>
              <FormControl className=" w-1/3 bg-whiteh" size="small">
                <InputLabel id="demo-simple-select-helper-label">
                  محاذاه التقرير
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={medicalReportsStype.reportAligne}
                  onChange={(event) =>
                    handleInputChange("reportAligne", event.target.value)
                  } // Update the name state
                  label="المسافة بين الكلمات في التقرير"
                >
                  <MenuItem value={"right"}>يمين</MenuItem>
                  <MenuItem value={"left"}>يسار </MenuItem>
                  <MenuItem value={"center"}>وسط </MenuItem>
                </Select>
              </FormControl>
              <TextField
                value={medicalReportsStype.reportTextSize}
                onChange={(event) => {
                  handleInputChange("reportTextSize", event.target.value);
                }}
                label="حجم خط التقرير"
                size="small"
                type="number"
                sx={{ width: "60%" }}
              ></TextField>
            </div>
          </div>

          <div className="h-[210mm] sticky left-0 w-[148mm] bg-white">
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
