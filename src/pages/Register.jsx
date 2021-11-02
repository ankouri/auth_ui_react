import React, { useState, useRef } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import styled from "styled-components";
import {
  Visibility,
  Email,
  Lock,
  Person,
  VisibilityOff,
  Close,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const history = useHistory();
  const [password, setPassword] = useState(true);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRegisterAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    const request = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value,
      password: passwordRef.current.value,
      verifyPassword: confirmPasswordRef.current.value,
    };


    try {

      const result = await axios.post(
        "http://localhost:5000/api/auth/register",
        request
      );
      console.log(result.data);
      setStatus({ type: "success", msg: result.data });
      setOpen(true);
      
    } catch (err) {

      setStatus({ type: "error", msg: err.response.data });
      setOpen(true);
      
    }

    setLoading(false);
  };

  return (
    <ContainerRegister>
      <RegisterCard>
        <CardHeader>
          <div>Register Account</div>
        </CardHeader>
        <Divider style={{ marginBottom: "10px" }} />

        <form onSubmit={handleRegisterAccount}>
          <TextFieldInput
            type="text"
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            inputRef={usernameRef}
            required
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldInput
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            autoComplete="off"
            inputRef={emailRef}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextFieldInput
            type={password ? "password" : "text"}
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            required
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
                    onClick={() => {
                      setPassword(!password);
                    }}
                    aria-label="toggle password visibility"
                  >
                    {password ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextFieldInput
            type={password ? "password" : "text"}
            id="confirmPassword"
            label="Confirme Password"
            variant="outlined"
            fullWidth
            required
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
                    aria-label="toggle password visibility"
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

          <RegisterButton
            fullWidth
            disabled={ loading }
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </RegisterButton>
        </form>

        <Divider />
        <CreateAccount>
          You already have an account.{" "}
          <span
            onClick={() => {
              history.push("/");
            }}
          >
            Login !
          </span>
        </CreateAccount>
      </RegisterCard>
      {status && (
        <Snackbar
        anchorOrigin={
         { "horizontal":"center",
          "vertical":"top"
        }
        }
        open={open} autoHideDuration={5000} onClose={handleClose}>
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
    </ContainerRegister>
  );
}

const CreateAccount = styled.p`
  text-align: center !important;
  color: #fff;
  margin-top: 10px;
  span {
    cursor: pointer;
    &:hover {
      color: #706efa;
    }
  }
`;

const CardHeader = styled.div`
  padding: 2px;
  margin-bottom: 10px;
  text-align: center;
  div {
    font-size: 20px;
    letter-spacing: 2px;
    font-family: "Merriweather";
  }
`;

const RegisterButton = styled(Button)`
  && {
    background: #706efa !important;
    margin-top: 6px;
    margin-bottom: 10px;
    font-family: "Merriweather";
    text-transform: capitalize;
  }
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

const RegisterCard = styled(Box)`
  background: #1e1d2b;
  width: 400px;
  padding: 30px;
  border-radius: 8px;
`;

const ContainerRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4c4f64;
  flex-direction: column;
`;
