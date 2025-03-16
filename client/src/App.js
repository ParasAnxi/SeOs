//** IMPORTS */
import { useEffect, useMemo } from "react";
import "./App.css";
import Home from "components/home/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//** MUI */
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme/theme";
import { useSelector } from "react-redux";
import Login from "components/login/Login";

function App() {
  //** THEME */
  const mode = useSelector((state) => state.user.theme);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  //** REMOVE DEFAULT MENU */
  useEffect(() => {
    const disableDefaultMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableDefaultMenu);
    return () => {
      document.removeEventListener("contextmenu", disableDefaultMenu);
    };
  }, []);

  const user = useSelector((state)=>state.user.user);
  const token = useSelector((state)=>state.user.token);
  const auth = Boolean(token);
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                auth ? <Home/> : <Login/>
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
