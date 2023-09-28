import React, { useEffect, useState } from "react";
import AddCashir from "../../components/setting/AddCashir";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";
import UserSetting from "../../components/setting/UserSetting";

function Setting(props) {
  const [cashire, setCashire] = useState([]);
  const [drugImported, setDrugImported] = useState(false);

  useEffect(() => {
    getAllCashire();
    checkDrugImported();
  }, []);

  const checkDrugImported = () => {
    axios
      .get("http://localhost:5000/setting/getdata")
      .then((response) => {
        console.log(response.data);
        setDrugImported(response.data.pharmaceuticalLoded);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const getAllCashire = () => {
    axios
      .get("http://localhost:5000/users/allUsers")
      .then((response) => {
        setCashire(response.data); // Update the categories state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const onCashireFormSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/users/addcashire", data)
      .then((response) => {
        // Handle the response if needed
        getAllCashire();
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };


  const onUserUbdateSubmit = (data) => {
    data.id=props.currentUser.userId
    axios
      .post("http://localhost:5000/users/edit", data)
      .then((response) => {
        // Handle the response if needed
        // getAllCashire();
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };


  const import3000Drag = () => {
    axios
      .get("http://localhost:5000/pharmaceutical/import")
      .then((response) => {
        if (response.data.message === "Import completed.") {
          setDrugImported(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  return (
    <div>
      <div className="flex p-4">
        <div className="w-1/2">
          <div className=" text-lg">
            {" "}
            <FormattedMessage
              id={"Add new secretary"}
              defaultMessage="Hello, World!"
            />
          </div>
          <AddCashir
            cashireData={cashire}
            onCashireFormSubmit={onCashireFormSubmit}
          ></AddCashir>
            <FormattedMessage
              id={"account info"}
              defaultMessage="Hello, World!"
            />
          <UserSetting doctorData={props.currentUser} onUserUbdateSubmit={onUserUbdateSubmit}></UserSetting>
          <div>
            <Button
              disabled =  {drugImported ? true : false}
              variant="contained"
              className="w-full"
              onClick={import3000Drag}
              color="success"
            >
              {
                <FormattedMessage
                  id={"import 3000 pharmaceutical"}
                  defaultMessage="Hello, World!"
                />
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
