import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState, useMemo, useCallback } from "react";
import Sidebaritems from "../../components/Sidebar/Sidebaritems";
import LanguageSelector from "./lanquageSelector";
import { Abc, CalendarMonth, Home, Medication, MonitorHeart, PriceCheck } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import logo from "../../logo.png";
import AirlineSeatFlatAngledIcon from "@mui/icons-material/AirlineSeatFlatAngled";

const SideBarMenu = (props) => {
  const [collapsedMode, setCollapsedMode] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("main");

  const handleMenuToggle = useCallback(() => {
    setCollapsedMode(!collapsedMode);
  }, [collapsedMode]);

  const handleSubmenuChange = useCallback((submenu) => {
    setActiveSubmenu(submenu);
  }, []);

  const isUserValid = useMemo(
    () =>
      props.currentUser && new Date(props.currentUser.expireDate) > new Date(),
    [props.currentUser]
  );

  const isDoctor = useMemo(
    () => isUserValid && props.currentUser.role === "doctor",
    [isUserValid, props.currentUser]
  );

  return (
    <Sidebar rtl collapsed={collapsedMode} style={{ height: "100vh" }}>
      <Menu
        className="bg-white h-full"
        closeOnClick
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
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
          onClick={handleMenuToggle}
          style={{ textAlign: "center" }}
          className="pt-1 pb-4"
        >
          <img className="w-20" src={logo} alt="Logo" />
        </MenuItem>

        {isUserValid && (
          <>
            <Sidebaritems
              title="home"
              active={activeSubmenu === "dashboard"}
              icon={<Home style={{ fontSize: "28px" }} />}
              router="/dashboard"
              onClick={() => handleSubmenuChange("dashboard")}
            />
            <Sidebaritems
              active={activeSubmenu === "patients"}
              title="patients"
              icon={<AssignmentIndIcon style={{ fontSize: "28px" }} />}
              router="/patients"
              onClick={() => handleSubmenuChange("patients")}
            />
          </>
        )}

        {isDoctor && (
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
              className="py-3"
            >
              <Sidebaritems
                title="medications"
                router="/pharmaceutical"
                onClick={() => handleSubmenuChange("medications")}
              />
              <Sidebaritems
                title="categories"
                router="/category"
                onClick={() => handleSubmenuChange("medications")}
              />
              <Sidebaritems
                title="group"
                router="/group"
                onClick={() => handleSubmenuChange("group")}
              />
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
              className="py-3"
            >
              <Sidebaritems
                title="PrescriptionDesign"
                router="/Prescriptiondesign"
                onClick={() => handleSubmenuChange("PrescriptionDesign")}
              />
            </SubMenu>

            <SubMenu
              active={activeSubmenu === "surgery"}
              icon={<AirlineSeatFlatAngledIcon style={{ fontSize: "28px" }} />}
              label={
                <FormattedMessage
                  id={"surgery"}
                  defaultMessage="Hello, World!"
                />
              }
              className="py-3"
            >
              <Sidebaritems
                title="Partients Surgery list"
                router="/surgen/list"
                onClick={() => handleSubmenuChange("surgery")}
              />
              <Sidebaritems
                title="Surgery name list"
                router="/surgen/type"
                onClick={() => handleSubmenuChange("surgery")}
              />
              <Sidebaritems
                title="takder list"
                router="/surgen/Narcosis"
                onClick={() => handleSubmenuChange("surgery")}
              />
              <Sidebaritems
                title="Device list"
                router="/surgen/device"
                onClick={() => handleSubmenuChange("surgery")}
              />
              <Sidebaritems
                title="surgeryCalender"
                router="/surgen/calender"
                onClick={() => handleSubmenuChange("surgeryCalender")}
              />
            </SubMenu>
            <Sidebaritems
              active={activeSubmenu === "NextVisitCalender"}
              title="NextVisitCalender"
              icon={<CalendarMonth style={{ fontSize: "28px" }} />}
              router="/NextVisitCalender"
              onClick={() => handleSubmenuChange("NextVisitCalender")}
            />

            <Sidebaritems
              active={activeSubmenu === "ECO"}
              title="ECO"
              icon={<MonitorHeart style={{ fontSize: "28px" }} />}
              router="/eco"
              onClick={() => handleSubmenuChange("ECO")}
            />
            <Sidebaritems
              active={activeSubmenu === "constDisease"}
              title="constDisease"
              icon={<Medication style={{ fontSize: "28px" }} />}
              router="/constdisease"
              onClick={() => handleSubmenuChange("constDisease")}
            />

            <Sidebaritems
              active={activeSubmenu === "AutoComplete"}
              title="AutoComplete"
              icon={<Abc style={{ fontSize: "28px" }} />}
              router="/AutoComplete"
              onClick={() => handleSubmenuChange("AutoComplete")}
            />
            <Sidebaritems
              active={activeSubmenu === "PriceCheck"}
              title="PriceCheck"
              icon={<PriceCheck style={{ fontSize: "28px" }} />}
              router="/PriceCheck"
              onClick={() => handleSubmenuChange("PriceCheck")}
            />

          </>
        )}

        {isUserValid && (
          <Sidebaritems
            active={activeSubmenu === "messaging"}
            title="messaging"
            icon={<MailOutlineIcon style={{ fontSize: "28px" }} />}
            router="/chats"
            onClick={() => handleSubmenuChange("messaging")}
          />
        )}

        {isDoctor && (
          <>
            {isUserValid && (
              <Sidebaritems
                active={activeSubmenu === "account"}
                title="account"
                icon={<AccountCircleIcon style={{ fontSize: "28px" }} />}
                router="/doctorprofile"
                onClick={() => handleSubmenuChange("account")}
              />
            )}
            <Sidebaritems
              active={activeSubmenu === "settings"}
              title="settings"
              icon={<SettingsIcon style={{ fontSize: "28px" }} />}
              router="/setting"
              onClick={() => handleSubmenuChange("settings")}
            />
          </>
        )}

        <LanguageSelector onLanguageChange={props.onLanguageChange} />
      </Menu>
    </Sidebar>
  );
};

export default SideBarMenu;
