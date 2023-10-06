import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

function ProgramActive(props) {
const [serialNumber,setSerialNumber]= useState("")

  const [locale, setLocale] = useState(() => {
    return Cookies.get("locale") || "ar";
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onActiveSubmit(serialNumber)
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
          value={serialNumber}
          onChange={(event)=>{setSerialNumber(event.target.value)}}
          sx={{
            width: "100%",
            color: "#fff",
          }}
          label={
            <FormattedMessage
              id={"serial number"}
              defaultMessage="Hello, World!"
            />
          }
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
            id={"active"}
            defaultMessage="Hello, World!"
          />
        }
      </Button>
    </form>
  );
}

export default ProgramActive;
