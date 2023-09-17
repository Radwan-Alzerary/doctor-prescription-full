import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BiotechIcon from "@mui/icons-material/Biotech";
import CategoryIcon from "@mui/icons-material/Category";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import Sidebaritems from "../../components/Sidebar/Sidebaritems";
import LanguageSelector from "./lanquageSelector";
import { Home } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";

import logo from "../../../public/logo.png"; // Tell webpack this JS file uses this image

function SideBarMenu(props) {
  const [collapsedMode, setCollapsedMode] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("main");

  return (
    <Sidebar
      // backgroundColor="#081F4B"
      rtl
      collapsed={collapsedMode}
      style={{ height: "100vh" }}
    >
      <Menu
        className=" bg-white h-full"
        closeOnClick
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? "#f5d9ff" : "#211E83",
                backgroundColor: active ? "#eecef9" : undefined,
              };
          },
        }}
      >
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setCollapsedMode(!collapsedMode);
          }}
          style={{ textAlign: "center" }}
          className="pt-1 pb-4"
        >
          <img src={logo} alt="Logo" />;<h2>نضام راجيتة</h2>
        </MenuItem>
        <Sidebaritems
          title="home"
          active={activeSubmenu === "home"}
          icon={<Home style={{ fontSize: "28px" }} />}
          router="/dashboard"
          onClick={() => setActiveSubmenu("home")}
        ></Sidebaritems>

        <Sidebaritems
          title="patients"
          icon={<AssignmentIndIcon style={{ fontSize: "28px" }} />}
          router="/patients"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <Sidebaritems
          title="medications"
          icon={<VaccinesIcon style={{ fontSize: "28px" }} />}
          router="/pharmaceutical"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <Sidebaritems
          title="categories"
          icon={<CategoryIcon style={{ fontSize: "28px" }} />}
          router="/category"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <Sidebaritems
          title="tests"
          icon={<BiotechIcon style={{ fontSize: "28px" }} />}
          router="/dashboard/purchasestable"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <SubMenu
          // active={activeSubmenu === "main"}
          icon={<AssignmentIcon style={{ fontSize: "28px" }} />}
          label={
            <FormattedMessage
              id={"prescription"}
              defaultMessage="Hello, World!"
            />
          }
          className=" py-3"
        >
          <Sidebaritems
            title="prescriptions"
            router="/prescriptions"
            onClick={() => setActiveSubmenu("main")}
          ></Sidebaritems>
          <Sidebaritems
            title="PrescriptionReady"
            router="/dashboard/purchasestable"
            onClick={() => setActiveSubmenu("main")}
          ></Sidebaritems>
        </SubMenu>

        <Sidebaritems
          title="messaging"
          icon={<MailOutlineIcon style={{ fontSize: "28px" }} />}
          router="/dashboard/purchasestable"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <Sidebaritems
          title="medical_reports"
          icon={<ReceiptIcon style={{ fontSize: "28px" }} />}
          router="/dashboard/purchasestable"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <Sidebaritems
          title="account"
          icon={<AccountCircleIcon style={{ fontSize: "28px" }} />}
          router="/account"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <Sidebaritems
          title="settings"
          icon={<SettingsIcon style={{ fontSize: "28px" }} />}
          router="/dashboard/purchasestable"
          onClick={() => setActiveSubmenu("main")}
        ></Sidebaritems>
        <LanguageSelector onLanguageChange={props.onLanguageChange} />
      </Menu>
    </Sidebar>
  );
}

export default SideBarMenu;
