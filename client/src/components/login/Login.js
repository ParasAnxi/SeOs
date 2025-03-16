import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import bg from "../../assets/bg.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { userLogin,userAccount } from "features/user/userSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

const Login = () => {
  //** THEME */
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //** CHECK USERNAME EXISTS */
  const getName = async (checkName) => {
    const sendData = {
      userName: checkName,
    };
    const response = await fetch("http://localhost:3001/find/user-name-exist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const data = await response.json();
    return data.value;
  };
  //** ACCOUNT SCHEMA */
  const registerSchema = yup.object().shape({
    userName: yup
      .string()
      .required("User Name is Required!")
      .test(
        "unique-userName",
        "UserName already Exists!",
        async (checkName) => {
          const data = await getName(checkName);
          return !data;
        }
      ),
    password: yup.string().min(5).required("Please enter your password"),
  });
  //** LOGIN SCHEMA */
  const loginSchema = yup.object().shape({
    userName: yup.string().required("User name is Required!"),
    password: yup.string().required("Please enter your password"),
  });

  const initialValuesRegister = {
    userName: "",
    password: "",
  };

  const initialValuesLogin = {
    userName: "",
    password: "",
  };

  //** FORM TYPE */
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  //** PASSWORD VISIBILITY */
  const [showPassword, setShowPassword] = useState(false);

  //** FORM DATA */
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) dispatch(userLogin(values));
    if (isRegister){
      dispatch(userAccount(values));
      setPageType("login");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        width="30%"
        backgroundColor={palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        borderRadius="1.5rem"
        sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "32px",
            color: palette.primary.dark,
          }}
        >
          SeOs
        </Typography>
      </Box>

      <Box
        width="30%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
        sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: palette.primary.dark,
            mb: 2,
          }}
        >
          {isRegister ? "CREATE ACCOUNT" : "LOGIN"}
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              >
                {isRegister ? (
                  <>
                    <TextField
                      label="UserName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userName}
                      name="userName"
                      error={
                        Boolean(touched.userName) && Boolean(errors.userName)
                      }
                      helperText={touched.userName && errors.userName}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      label="UserName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userName}
                      name="userName"
                      error={
                        Boolean(touched.userName) && Boolean(errors.userName)
                      }
                      helperText={touched.userName && errors.userName}
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 3" }}
                    />
                  </>
                )}
              </Box>

              {/* BUTTONS */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.light,
                    color: palette.background.default,
                    fontWeight: "bold",
                    "&:hover": {
                      color: "black",
                      backgroundColor: palette.background.alt,
                    },
                  }}
                >
                  {isLogin ? "LOGIN" : "SIGN UP"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.background.default,
                    "&:hover": {
                      cursor: "pointer",
                      color: "black",
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Create Account."
                    : "Already have an account? Login here."}
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
