import React, { useEffect, useState } from "react";
import AddCashir from "../../components/setting/AddCashir";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";
import UserSetting from "../../components/setting/UserSetting";
import ProgramActive from "../../components/setting/ProgramActive";
import BackUp from "../../components/setting/BackUp";
import Loading from "../../components/pageCompond/Loading";
import PropertySetting from "../../components/setting/PropertySetting";

function Setting(props) {
  const [cashire, setCashire] = useState([]);
  const [drugImported, setDrugImported] = useState(false);
  const [settingData, setsettingData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  useEffect(() => {
    getAllCashire();
    checkDrugImported();
  }, []);

  const checkDrugImported = () => {
    axios
      .get(`${serverAddress}/setting/getdata`)
      .then((response) => {
        console.log(response.data);
        setsettingData(response.data);
        setDrugImported(response.data.pharmaceuticalLoded);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const getAllCashire = () => {
    axios
      .get(`${serverAddress}/users/allUsers`)
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
      .post(`${serverAddress}/users/addcashire`, data)
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
      .post(`${serverAddress}/users/edit`, data)
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
    setLoading(true);
    try {
      const response = await axios.post(
        "http://95.179.178.183:4000/checkToken",
        { token: SerialNumber }
      );
      console.log(response);

      if (response.data.result) {
        setLoading(false);

        console.log("POST request successful:", response.data);
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + response.data.dayNum);
        const data = { expireDate: futureDate, id: props.currentUser.userId };
        axios
          .post(`${serverAddress}/users/edit`, data)
          .then((response) => {
            // Handle the response if needed
            window.location.href = "/";

            console.log("POST request successful:", response.data);
          })
          .catch((error) => {
            // Handle errors if the request fails
            console.error("Error making POST request:", error);
          });
      } else {
        setLoading(false);

        console.log("accessDone");
      }
    } catch (error) {
      setLoading(false);

      setErrorMsg("التوكين غير صالح او منتهي الصلاحية");
      console.error("Error making POST request:", error);
    }
  };

  const backUpclickHandle = () => {
    setLoading(true);

    axios
      .get(`${serverAddress}/setting/exportdata`)
      .then((response) => {
        setLoading(false);

        if (response.data.message === "Import completed.") {
          setDrugImported(true);
        }
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error fetching categories:", error);
      });
  };
  const restorClickHandle = () => {
    setLoading(true);

    axios
      .get(`${serverAddress}/setting/importdata`)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error fetching categories:", error);
      });
  };

  const import3000Drag = () => {
    setLoading(true);
    axios
      .get(`${serverAddress}/pharmaceutical/import`)
      .then((response) => {
        setDrugImported(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <div>
      {loading ? <Loading></Loading> : ""}
      <div className="p-4">
        <div className="">
          <div className=" text-lg">
            <FormattedMessage
              id={"Add new secretary"}
              defaultMessage="Hello, World!"
            />
          </div>
          <div className="flex justify-between w-full">
            <AddCashir
              cashireData={cashire}
              onCashireFormSubmit={onCashireFormSubmit}
            ></AddCashir>
            <div>
              <FormattedMessage
                id={"account info"}
                defaultMessage="Hello, World!"
              />
              <UserSetting
                doctorData={props.currentUser}
                onUserUbdateSubmit={onUserUbdateSubmit}
              ></UserSetting>
            </div>
          </div>
          <div>
            <div>النسخ الاحتياطي</div>
            <BackUp
              settingData={settingData}
              backUpclickHandle={backUpclickHandle}
              restorClickHandle={restorClickHandle}
            ></BackUp>
          </div>
          <div className="my-5">
            <div>تخصيصات النضام</div>
            <PropertySetting></PropertySetting>
          </div>
          <div>
            <div>تفعيل النسخة</div>
            <ProgramActive onActiveSubmit={onActiveSubmit}></ProgramActive>
          </div>
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
