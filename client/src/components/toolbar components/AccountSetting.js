//** IMPORTS */
import React, { useState } from "react";
import { Menu, MenuItem, Divider, Box, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogOut } from "features/user/userSlice";
import { useNavigate } from "react-router-dom";

const AccountSetting = ({ open, anchorEl, handleClose, setSettingOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (action) => {
    switch (action) {
      case "account":
        setSettingOpen(true);
        break;
      case "settings":
        setSettingOpen(true);
        break;
      case "logout":
        dispatch(setLogOut());
        navigate("/", { replace: true });
        break;
      default:
        break;
    }
    handleClose();
  };
  return (
    <Box>
      <Menu
        PaperProps={{
          sx: {
            width: "200px",
            maxWidth: "none",
            "& .MuiMenuItem-root": {
              pl: 4,
              fontSize: "14px",
            },
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleClick("account")}>Profile</MenuItem>
        <MenuItem onClick={() => handleClick("settings")}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClick("logout")}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default AccountSetting;
