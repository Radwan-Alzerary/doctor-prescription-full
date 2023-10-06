import React, { useEffect, useState } from "react";
import AddCashir from "../../components/setting/AddCashir";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";
import UserSetting from "../../components/setting/UserSetting";
import ProgramActive from "../../components/setting/ProgramActive";

function Setting(props) {
  const [cashire, setCashire] = useState([]);
  const [drugImported, setDrugImported] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    data.id = props.currentUser.userId;
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
  const onActiveSubmit = async (SerialNumber) => {
    try {
      const response = await axios.post(
        "http://95.179.178.183:4000/checkToken",
        { token: SerialNumber }
      );
      console.log(response);

      if (response.data.result) {
        console.log("POST request successful:", response.data);
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + response.data.dayNum);
        const data = { expireDate: futureDate, id: props.currentUser.userId };
        axios
          .post("http://localhost:5000/users/edit", data)
          .then((response) => {
            // Handle the response if needed
            window.location.reload(false);

            console.log("POST request successful:", response.data);
          })
          .catch((error) => {
            // Handle errors if the request fails
            console.error("Error making POST request:", error);
          });
      } else {
        console.log("accessDone");
      }
    } catch (error) {
      setErrorMsg("التوكين غير صالح او منتهي الصلاحية");
      console.error("Error making POST request:", error);
    }
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
          <UserSetting
            doctorData={props.currentUser}
            onUserUbdateSubmit={onUserUbdateSubmit}
          ></UserSetting>
          <ProgramActive onActiveSubmit={onActiveSubmit}></ProgramActive>
          <div>
            <Button
              disabled={drugImported ? true : false}
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
