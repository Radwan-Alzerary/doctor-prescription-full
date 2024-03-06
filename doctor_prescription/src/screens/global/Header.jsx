import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

import { blue, green, red } from "@mui/material/colors";
import { Button, IconButton } from "@mui/material";
import { useSignOut } from "react-auth-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Refresh } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    // Update the state to reflect the current fullscreen status
    setIsFullscreen(!isFullscreen);
  };
  const handleClose = () => {
    const shouldClose = window.confirm("Do you want to close this window/tab?");
    if (shouldClose) {
      window.close();
    }
  };

  useEffect(() => {
    const currentURL = window.location.origin; // Get the current URL
    const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          `${serverAddress}/users`,
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const handleIconButtonClick = () => {
    // Close the current window or tab
    window.close();
  };
  
  return (
    <header className="flex h-14 bg-[white] w-full justify-between items-center px-4 z-30">
      <div>
        <Button onClick={logOut} variant="contained" color="error">
          <FormattedMessage id={"signOut"} defaultMessage="Hello, World!" />
        </Button>
      </div>
      <div className="flex">
        <IconButton
          onClick={() => {
            window.location.reload();
          }}
          aria-label="fingerprint"
          color="secondary"
        >
          <Refresh
            sx={{ color: green[500] }}
            style={{ fontSize: "32px" }}
          ></Refresh>
        </IconButton>

        <IconButton
          onClick={toggleFullscreen}
          aria-label="fingerprint"
          color="secondary"
        >
          <FullscreenOutlinedIcon
            sx={{ color: blue[500] }}
            style={{ fontSize: "32px" }}
          ></FullscreenOutlinedIcon>
        </IconButton>
        <IconButton
          onClick={handleIconButtonClick}
          aria-label="fingerprint"
          color="success"
        >
          <PowerSettingsNewOutlinedIcon
            sx={{ color: red[500] }}
            style={{ fontSize: "32px" }}
          ></PowerSettingsNewOutlinedIcon>
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
