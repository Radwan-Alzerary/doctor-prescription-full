import { FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PropertySetting(props) {
  const [property, setProperty] = useState({
    abortProssesMsg: "",
    openEditPrescriptionByClick: "",
    autoBackUp: "",
  });

  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    const getSettingApi = () => {
      axios
        .get(`${serverAddress}/setting/getdata`)
        .then((response) => {
          setProperty(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    getSettingApi();
  }, []);

  const handleInputChange = (name, value) => {
    const data = { [name]: value };
    console.log(data);
    axios
      .post(`${serverAddress}/setting/update`, {
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

    setProperty({
      ...property,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center">
          <div>تفعيل نافذة طلب الالغاء</div>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={property.abortProssesMsg}
                onChange={(event) => {
                  handleInputChange(
                    "abortProssesMsg",
                    !property.abortProssesMsg
                  );
                }}
                color="primary"
              />
            }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>تفعيل فتح الوصفه عند الضغط</div>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={property.openEditPrescriptionByClick}
                onChange={(event) => {
                  handleInputChange(
                    "openEditPrescriptionByClick",
                    !property.openEditPrescriptionByClick
                  );
                }}
                color="primary"
              />
            }
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>تفعيل النسخ الاحتياطي التلقائي</div>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={property.autoBackUp}
                onChange={(event) => {
                  handleInputChange(
                    "autoBackUp",
                    !property.autoBackUp
                  );
                }}
                color="primary"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PropertySetting;
