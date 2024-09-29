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
      className=" fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50
overflow-y-auto"
    ></div>
  );
}

export default BackGroundShadow;
