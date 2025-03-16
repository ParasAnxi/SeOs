//** IMPORT */
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "features/user/userSlice";
import AccountSetting from "./AccountSetting";
import ChangePassword from "./ChangePassword";

const Settings = ({ open, onClose }) => {
  const [selected, setSelected] = useState("Account");

  //** MENU */
  const menuItems = ["Account", "Personalization", "About"];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const mode = useSelector((state) => state.user.theme);
  const { palette } = useTheme();
  const [changePassOpen, setChangePassOpen] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: 2,
          borderRadius: 2,
        }}
      >
        {/** CLOSE */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Settings
        </Typography>

        <Box sx={{ display: "flex", height: "60vh" }}>
          {/** LEFT MENU */}
          <Box sx={{ width: "35%", borderRight: 1, borderColor: "divider" }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton
                    selected={selected === item}
                    onClick={() => setSelected(item)}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: palette.background.alt,
                        "&:hover": {
                          backgroundColor: palette.background.alt,
                        },
                      },
                    }}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/** RIGHT FEATURE */}
          <Box sx={{ flex: 1, padding: 2 }}>
            <Typography variant="h6">{selected}</Typography>
            <Divider sx={{ my: 1 }} />
            {selected === "Account" && (
              <>
                <Typography sx={{ padding: "0.5rem" }}>
                  Manage your profile details here.
                </Typography>
                <Divider />
                <Box
                  sx={{
                    padding: "0.7rem",
                    // bgcolor: ,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "600" }}>User Name</Typography>
                  <Typography>{user.userName}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    padding: "0.7rem",
                    // bgcolor: ,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    Change password
                  </Typography>
                  <Button
                    onClick={()=>setChangePassOpen(true)}
                    sx={{
                      backgroundColor: palette.background.alt,
                      color: "red",
                    }}
                  >
                    Change Password
                  </Button>
                  <ChangePassword open = {changePassOpen} setChangePassOpen={setChangePassOpen}/>
                </Box>
                <Divider />
              </>
            )}
            {selected === "Personalization" && (
              <>
                <Box
                  sx={{
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography onClick={() => dispatch(setTheme())}>
                    {mode !== "dark" ? "Dark Mode" : "Light Mode"}
                  </Typography>
                  <IconButton onClick={() => dispatch(setTheme())}>
                    {mode === "dark" ? <LightMode /> : <DarkMode />}
                  </IconButton>
                </Box>
                <Divider />
              </>
            )}
            {selected === "About" && (
              <Typography sx={{
                padding:"0.5rem"
              }}>
                SeOs is a web-based OS <br />
                GITHUB:{" "}
                <a
                  href="https://github.com/ParasAnxi/SeOs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  To Go to git hub repo click here
                </a>
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Settings;
