//** IMPORTSF */
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "features/user/userSlice";

const ChangePassword = ({ open, setChangePassOpen }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  //** PASS VISIBILITY */
  const [showPassword, setShowPassword] = useState({ old: false, new: false });

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  //** VALIDATION */
  const passwordSchema = yup.object().shape({
    password: yup.string().required("Old password is required"),
    newPassword: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required("New password is required"),
  });

  //** INITIAL VALUES */
  const initialValues = {
    password: "",
    newPassword: "",
  };

  //** HANDLE FORM */
  const handleFormSubmit = (values, { resetForm }) => {
    const data = {
      userName: user.userName,
      password: values.password,
      newPassword: values.newPassword,
    };
    dispatch(changePassword(data));
    resetForm();
    setChangePassOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setChangePassOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={passwordSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* OLD PASS */}
              <TextField
                fullWidth
                margin="normal"
                label="Old Password"
                type={showPassword.old ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword("old")}
                        edge="end"
                      >
                        {showPassword.old ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* NEW PASS */}
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword("new")}
                        edge="end"
                      >
                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Buttons */}
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                  Change Password
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setChangePassOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ChangePassword;
