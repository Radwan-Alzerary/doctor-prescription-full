import React from "react";
import AddCashir from "../../components/setting/AddCashir";
import axios from "axios";

function Setting() {
  const onCashireFormSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/users/addcashire", data)
      .then((response) => {
        // Handle the response if needed
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
          <div className=" text-lg">اضافة  سكرتير جديد</div>
          <AddCashir onCashireFormSubmit={onCashireFormSubmit}></AddCashir>
        </div>
      </div>
    </div>
  );
}

export default Setting;
