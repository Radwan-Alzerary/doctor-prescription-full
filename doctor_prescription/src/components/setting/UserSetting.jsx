import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

function UserSetting(props) {
  const [formData, setFormData] = useState({
    userName: props.doctorData.userName,
    email: props.doctorData.user,
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
      className="h-full"
    >
      <div>
        <TextField
          dir="rtl" // Set the direction to RTL
          required
          id="outlined-required"
          size="small"
          value={formData.userName}
          onChange={(event) => {
            handleInputChange("userName", event.target.value);
          }} // Update the name state
          sx={{
            width: "30%",
            direction: "rtl",
            textAlign: "right",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"doctor name"}
              defaultMessage="Hello, World!"
            />
          }
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
    </form>
  );
}

export default UserSetting;
