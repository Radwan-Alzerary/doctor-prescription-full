import { Button } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

function BackUp(props) {
  return (
    <div className="flex gap-6">
      <Button
        variant="contained"
        className="w-full"
        color="success"
        onClick={()=>props.backUpclickHandle()}

      >
        {
          <FormattedMessage
            id={"backup data"}
            defaultMessage="Hello, World!"
          />
        }
      </Button>
      <Button
        variant="contained"
        className="w-full"
        color="success"
        onClick={()=>props.restorClickHandle()}
      >
        {
          <FormattedMessage
            id={"restor data"}
            defaultMessage="Hello, World!"
          />
        }
      </Button>

    </div>
  );
}

export default BackUp;
