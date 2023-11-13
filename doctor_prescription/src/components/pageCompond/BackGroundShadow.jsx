import React from "react";

function BackGroundShadow(props) {
  const handleItemClick = () => {
    if (props.onClick) {
      props.onClick(); // Call the onClick prop if provided
    }
  };

  return (
    <div
      onClick={handleItemClick}
      className=" fixed  right-0 w-screen h-screen top-0 bg-black opacity-10 z-30"
    ></div>
  );
}

export default BackGroundShadow;
