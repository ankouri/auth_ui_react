import React, { useState, useRef } from "react";
import {
  IconButton,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Button,
  Box,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import {
  ChevronLeft,
  Visibility,
  Lock,
  VisibilityOff,
} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function ResetForm() {
  const history = useHistory();
  const { resetId } = useParams();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [password, setPassword] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    //CHECK PASSWORD LENGTH
    if(passwordRef.current.value.length < 8 ) {
        setStatus({ type: "error", msg: "Passwords must be at least 8 characters long." });
        setOpen(true);
        setLoading(false);
        return;
    }

    //CHECK PASSWORD MATCH
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setStatus({ type: "error", msg: "Passwords do not match." });
      setOpen(true);
      setLoading(false);
      return;
    }

    //CREATE REQUEST OBJECT
  
    console.log(``);
    try {
      const result = await axios.get(
        `http://localhost:5000/api/auth/reset/${resetId}`,
        { params: {password:passwordRef.current.value}}
        
      );
      console.log(result);
      setStatus({ type: "success", msg: result.data });
      setOpen(true);
      history.push('/')
    } catch (err) {
      console.log(err);
      setStatus({ type: "error", msg: err.response.data });
      setOpen(true);
    }

    setLoading(false);
  };
  return (
    <ContainerForgot>
      <ForgotCard>
        <CardHeader>
          <div>Reset Password</div>
        </CardHeader>
        <Divider style={{ marginBottom: "10px" }} />
        <form onSubmit={handleResetPassword}>
          <TextFieldInput
            type={password ? "password" : "text"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            required
            autoComplete="off"
            inputRef={passwordRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="togglePassword"
                    onClick={() => {
                      setPassword(!password);
                    }}
                  >
                    {password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextFieldInput
            type={password ? "password" : "text"}
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            required
            autoComplete="off"
            inputRef={confirmPasswordRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="togglePassword"
                    onClick={() => {
                      setPassword(!password);
                    }}
                  >
                    {password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <ForgotButton
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={ loading }
          >
            Reset Password
          </ForgotButton>
        </form>
      </ForgotCard>
      {status && (
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={status.type}
            sx={{ width: "100%" }}
          >
            {status.msg}
          </Alert>
        </Snackbar>
      )}
    </ContainerForgot>
  );
}

const CardHeader = styled.div`
  padding: 2px;
  margin-bottom: 10px;
  text-align: center;
  div {
    font-size: 20px;
    letter-spacing: 0px;
    font-family: "Merriweather";
  }
`;

const ForgotButton = styled(Button)`
  background: #706efa !important;
  margin-top: 6px !important;
  margin-bottom: 10px !important;
  font-family: "Merriweather" !important;
  text-transform: capitalize !important;
`;

const TextFieldInput = styled(TextField)`
  && {
    margin: 12px auto;
    color: #ffffff;
  }
  input {
    color: #ffffff;
    font-family: "Merriweather";
    background: #222433;
  }
  fieldset {
    color: #ffffff;
    border: 1px solid #ddd !important;
  }
  label,
  button {
    color: #ffffff !important;
    font-family: "Merriweather";
  }
  div {
    color: #ffffff !important;
    background: #222433;
  }
`;

const ForgotCard = styled(Box)`
  background: #1e1d2b;
  width: 400px;
  padding: 30px;
  border-radius: 8px;
`;

const ContainerForgot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4c4f64;
`;
