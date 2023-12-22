import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

function UserSetting(props) {
  const [formData, setFormData] = useState({
    userName: props.doctorData.userName,
    email: props.doctorData.user,
  });
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUserUbdateSubmit(formData);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit} // Step 4: Attach the submit handler
      className=""
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <TextField
          required
          id="outlined-required"
          size="small"
          value={formData.userName}
          onChange={(event) => {
            handleInputChange("userName", event.target.value);
          }} // Update the name state
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"doctor name"}
              defaultMessage="Hello, World!"
            />
          }
          // defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          size="small"
          value={formData.email}
          onChange={(event) => {
            handleInputChange("email", event.target.value);
          }} // Update the name state
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"email"} defaultMessage="Hello, World!" />
          }
          type="email"
        />
        <Button
          type="submit"
          variant="contained"
          className="w-full"
          color="success"
        >
          {
            <FormattedMessage
              id={"Information edit"}
              defaultMessage="Hello, World!"
            />
          }
        </Button>
      </div>
    </form>
  );
}

export default UserSetting;
