import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

import { blue, red } from "@mui/material/colors";
import { Button, IconButton } from "@mui/material";
import { useSignOut } from "react-auth-kit";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/users",
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
  return (
    <header className="flex h-14 bg-white w-full justify-between items-center px-4">
      <div>
        <Button onClick={logOut} variant="contained" color="error">
          تسجيل الخروج
        </Button>
      </div>
      <div className="flex">
        <IconButton aria-label="fingerprint" color="secondary">
          <FullscreenOutlinedIcon
            sx={{ color: blue[500] }}
            style={{ fontSize: "32px" }}
          ></FullscreenOutlinedIcon>
        </IconButton>
        <IconButton aria-label="fingerprint" color="success">
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
