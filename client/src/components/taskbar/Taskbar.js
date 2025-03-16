//** IMPORTS */
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { Notifications, Search } from "@mui/icons-material";


const Taskbar = () => {
  const { palette } = useTheme();
  return (
    <Box
      position="fixed"
      sx={{
        // top: "auto",
        bottom: 3,
        // background: "red",
        height: 50,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          //   backgroundColor: "pink",
          backgroundColor : "rgba(246, 243, 243, 0.43)",
          borderRadius:2,
          width: "50%",
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: "flex" }}>
          <IconButton>
            <AppsIcon />
          </IconButton>
          <IconButton>
            <Search />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Taskbar;
