import * as React from "react";
import { Button, Menu, MenuItem, Switch } from "@mui/material";
import { useEffect } from "react";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    document.documentElement.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          src={require("../assets/Menu.png")}
          style={{ height: "50px", width: "50px" }}
          alt="menu"
        ></img>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        <MenuItem>
          {" "}
          <div className="flex items-center space-x-2">
            <span>Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>{" "}
        </MenuItem>
      </Menu>
    </div>
  );
}
