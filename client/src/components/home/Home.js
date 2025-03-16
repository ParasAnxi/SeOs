//** IMPORTS */
import React from 'react'
import { Box } from '@mui/material'
import Toolbar from 'components/toolbar/Toolbar'
import Taskbar from 'components/taskbar/Taskbar'
import bg from "../../assets/bg.jpg"
import Settings from 'components/toolbar components/Settings'
const Home = () => {
  
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/** TOOLBAR */}
      <Toolbar />
      {/** MAIN */}
        <Settings/>
      {/** TASKBAR */}
      <Taskbar />
    </Box>
  );
}

export default Home