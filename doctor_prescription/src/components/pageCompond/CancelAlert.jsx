import { Button } from "@mui/material";
import React from "react";

function CancelAlert(props) {
  return (
    <div className=" fixed right-0 w-screen h-screen top-0 z-[900] flex justify-center items-center">
      <div className=" absolute right-0 top-0 w-full h-full opacity-20 z-10 bg-black"></div>
      <div className="w-1/2 h-64 bg-white z-50 flex flex-col  justify-center items-center gap-5">
        <p className="text-xl">هل انت متاكد من الغاء العملية ؟</p>
        <div className="flex w-full justify-between gap-4 px-4 ">
          <Button
            onClick={() => {
              props.onCancelHande();
            }}
            type="submit"
            variant="contained"
            className="w-full"
            color="success"
          >
            نعم
          </Button>
          <Button
            onClick={() => {
              props.onCancelAborteHande();
            }}
            type="submit"
            variant="contained"
            className="w-full"
            color="error"
          >
            لا
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CancelAlert;
