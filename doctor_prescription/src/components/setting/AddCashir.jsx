import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

function AddCashir(props) {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onCashireFormSubmit(formData);
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
      className="mb-8"
      style={{
        direction: locale === "en" ? "ltr" : "rtl",
      }}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          size="small"
          value={formData.userName}
          onChange={(event) => {
            handleInputChange("userName", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"Secretary name"}
              defaultMessage="Hello, World!"
            />
          }
          // defaultValue="Hello World"
        />
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.email}
          onChange={(event) => {
            handleInputChange("email", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label={
            <FormattedMessage id={"email"} defaultMessage="Hello, World!" />
          }
          type="email"
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.password}
          onChange={(event) => {
            handleInputChange("password", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          type="password"
          label={
            <FormattedMessage id={"Password"} defaultMessage="Hello, World!" />
          }
          // defaultValue="Hello World"
          InputProps={{
            style: { textAlign: "right" }, // Apply CSS style to right-align placeholder
          }}
        />
      </div>

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

      <div className="flex justify-between px-6 items-center w-full h-12 rounded-xl bg-white">
        <div>
          {" "}
          {
            <FormattedMessage
              id={"Secretary name"}
              defaultMessage="Hello, World!"
            />
          }
        </div>
        <div>
          {" "}
          {<FormattedMessage id={"email"} defaultMessage="Hello, World!" />}
        </div>
      </div>
      {props.cashireData.map((cashire, index) => (
        <div className="flex justify-between px-6 items-center w-full h-12 rounded-xl my-2 bg-white">
          <div>{cashire.userName}</div>
          <div>{cashire.email}</div>
        </div>
      ))}
    </form>
  );
}

export default AddCashir;
