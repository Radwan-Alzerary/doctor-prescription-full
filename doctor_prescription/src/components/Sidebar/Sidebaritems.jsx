import React from "react";
import { FormattedMessage } from "react-intl";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function Sidebaritems(props) {
  const handleItemClick = () => {
    if (props.onClick) {
      props.onClick(); // Call the onClick prop if provided
    }
  };

  return (
    <Link
      to={props.router}
      onClick={handleItemClick}
      style={{ textDecoration: "none" }}
    >
      <MenuItem icon={props.icon} className="z-50">
        <FormattedMessage id={props.title} defaultMessage="Hello, World!" />
      </MenuItem>
    </Link>
  );
}

export default Sidebaritems;
