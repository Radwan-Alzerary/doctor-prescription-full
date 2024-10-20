import { Button } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

function BackUp(props) {
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <div className="gap-2 flex flex-col justify-center items-center">
      <Button
        variant="contained"
        className="w-1/2"
        color="success"
        onClick={() => props.backUpclickHandle()}
      >
        {<FormattedMessage id={"backup data"} defaultMessage="Hello, World!" />}
      </Button>
      {props.settingData ? (
        <div className="gap-2 w-full flex flex-col justify-center items-center">
          {/* <Button
            variant="contained"
            className="w-1/2"
            // color="success"
            onClick={() => props.restorClickHandle()}
          >
            {
              <FormattedMessage
                id={"restor data"}
                defaultMessage="Hello, World!"
              />
            }
          </Button> */}
          <div>اخر نسخ احتياطي {formatDate(props.settingData.lastBackup)} </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BackUp;
