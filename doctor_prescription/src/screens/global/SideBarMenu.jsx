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
import { useEffect, useState } from "react";
import Sidebaritems from "../../components/Sidebar/Sidebaritems";
import LanguageSelector from "./lanquageSelector";
import { Home, Paragliding, Surfing } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import logo from "../../logo.png"; // Tell webpack this JS file uses this image
import AirlineSeatFlatAngledIcon from "@mui/icons-material/AirlineSeatFlatAngled";

function SideBarMenu(props) {
  const [collapsedMode, setCollapsedMode] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("main");
  console.log(props.currentUser);

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
          <img className="w-20" src={logo} alt="Logo" />
        </MenuItem>

        {props.currentUser ? (
          new Date(props.currentUser.expireDate) > new Date() ? (
            <>
              <Sidebaritems
                title="home"
                active={activeSubmenu === "dashboard"}
                icon={<Home style={{ fontSize: "28px" }} />}
                router="/dashboard"
                onClick={() => setActiveSubmenu("dashboard")}
              ></Sidebaritems>
              <Sidebaritems
                active={activeSubmenu === "patients"}
                title="patients"
                icon={<AssignmentIndIcon style={{ fontSize: "28px" }} />}
                router="/patients"
                onClick={() => setActiveSubmenu("patients")}
              ></Sidebaritems>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {props.currentUser ? (
          props.currentUser.role === "doctor" &&
          new Date(props.currentUser.expireDate) > new Date() ? (
            <>
              <SubMenu
                active={activeSubmenu === "medications"}
                icon={<VaccinesIcon style={{ fontSize: "28px" }} />}
                label={
                  <FormattedMessage
                    id={"medications"}
                    defaultMessage="Hello, World!"
                  />
                }
                className=" py-3"
              >
                <Sidebaritems
                  title="medications"
                  router="/pharmaceutical"
                  onClick={() => setActiveSubmenu("medications")}
                ></Sidebaritems>
                <Sidebaritems
                  title="categories"
                  // icon={<CategoryIcon style={{ fontSize: "28px" }} />}
                  router="/category"
                  onClick={() => setActiveSubmenu("medications")}
                ></Sidebaritems>
              </SubMenu>
              <SubMenu
                active={activeSubmenu === "PrescriptionDesign"}
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
                  title="PrescriptionDesign"
                  router="/Prescriptiondesign"
                  onClick={() => setActiveSubmenu("PrescriptionDesign")}
                ></Sidebaritems>
              </SubMenu>

              <SubMenu
                active={activeSubmenu === "surgery"}
                icon={
                  <AirlineSeatFlatAngledIcon style={{ fontSize: "28px" }} />
                }
                label={
                  <FormattedMessage
                    id={"surgery"}
                    defaultMessage="Hello, World!"
                  />
                }
                className=" py-3"
              >
                {/* <Sidebaritems
                  title="Partients Surgery list"
                  router="/surgen/list"
                  onClick={() => setActiveSubmenu("surgery")}
                ></Sidebaritems>
                <Sidebaritems
                  title="Surgery name list"
                  router="/surgen/type"
                  onClick={() => setActiveSubmenu("surgery")}
                ></Sidebaritems>
                <Sidebaritems
                  title="takder list"
                  router="/surgen/Narcosis"
                  onClick={() => setActiveSubmenu("surgery")}
                ></Sidebaritems>

                <Sidebaritems
                  title="Device list"
                  router="/surgen/device"
                  onClick={() => setActiveSubmenu("surgery")}
                ></Sidebaritems> */}
              </SubMenu>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {props.currentUser ? (
          new Date(props.currentUser.expireDate) > new Date() ? (
            <Sidebaritems
              active={activeSubmenu === "messaging"}
              title="messaging"
              icon={<MailOutlineIcon style={{ fontSize: "28px" }} />}
              router="/chats"
              onClick={() => setActiveSubmenu("messaging")}
            ></Sidebaritems>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {props.currentUser ? (
          props.currentUser.role === "doctor" ? (
            <>
              {new Date(props.currentUser.expireDate) > new Date() ? (
                <Sidebaritems
                  active={activeSubmenu === "account"}
                  title="account"
                  icon={<AccountCircleIcon style={{ fontSize: "28px" }} />}
                  router="/doctorprofile"
                  onClick={() => setActiveSubmenu("account")}
                ></Sidebaritems>
              ) : (
                ""
              )}
              <Sidebaritems
                active={activeSubmenu === "settings"}
                title="settings"
                icon={<SettingsIcon style={{ fontSize: "28px" }} />}
                router="/setting"
                onClick={() => setActiveSubmenu("settings")}
              ></Sidebaritems>
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <LanguageSelector onLanguageChange={props.onLanguageChange} />
      </Menu>
    </Sidebar>
  );
}

export default SideBarMenu;
