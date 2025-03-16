//** IMPORTS */
import React, { useEffect, useState } from "react";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import AccountSetting from "components/toolbar components/AccountSetting";
import Settings from "components/toolbar components/Settings";
const Toolbar = () => {
  //** THEME */
  const { palette } = useTheme();
  //** TIME */
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //** ACCOUNT MENU */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //** SETTINGS MODAL */
  const [settingOpen, setSettingOpen] = useState(false);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: palette.primary.transparent,
      }}
    >
      {/** LEFT */}
      <Box>
        <IconButton>
          <ManageAccountsOutlinedIcon
            sx={{ color: "white" }}
            onClick={() => setSettingOpen(true)}
          />
        </IconButton>
        <Settings open={settingOpen} onClose={() => setSettingOpen(false)} />
      </Box>
      {/** MID */}
      <Box>
        <Typography
          fontWeight="bold"
          fontSize="14px"
          color="rgba(255, 255, 255, 1)"
          variant="p"
        >
          {time.format("hh:mm A")}
        </Typography>
      </Box>
      {/** RIGHT */}
      <Box>
        <IconButton onClick={handleClick} sx={{ textTransform: "none" }}>
          <Avatar sx={{ width: 22, height: 22 }} />
        </IconButton>
        <AccountSetting
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          setSettingOpen={setSettingOpen}
        />
      </Box>
    </Box>
  );
};

export default Toolbar;
