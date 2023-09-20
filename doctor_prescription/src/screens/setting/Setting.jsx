import React, { useEffect, useState } from "react";
import AddCashir from "../../components/setting/AddCashir";
import axios from "axios";
import { FormattedMessage } from "react-intl";

function Setting() {
  const [cashire, setCashire] = useState([]);

  useEffect(() => {
    getAllCashire();
  }, []);

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
        </div>
      </div>
    </div>
  );
}

export default Setting;
