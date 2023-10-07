import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

const DateRangePickerComp = (props) => {
  // date state

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <Button className="w-40" onClick={() => setOpen((open) => !open)}>
        {" "}
        <FormattedMessage id={"dateSort"} defaultMessage="Hello, World!" />
      </Button>
      <div
        style={{
          direction: "ltr",
        }}
        className="fixed flex flex-col justify-center left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] gap-5 items-center w-3/5 bg-white rounded-xl z-50 ltr:mr-0"
        ref={refOne}
      >
        {open && (
          <DateRangePicker
            onChange={(item) => props.setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={props.range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangePickerComp;
