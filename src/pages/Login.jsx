import React,{ useState, useRef, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import styled from "styled-components";
import { Visibility, Email, Lock, VisibilityOff } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";




export default function Login() {
  const history = useHistory();
  const { username, ac_status } = useParams();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [password, setPassword] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async(e) => {
      e.preventDefault();
      setLoading(true);

      const request = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      console.log(request);
      try {

        const result = await axios.post(
          "https://nodeauth-app.herokuapp.com/api/auth/login",
          request
        );
        console.log(result.data);
        setStatus({ type: "success", msg: `Welcome : ${result.data.email}` });
        setOpen(true);
        
      } catch (err) {
        console.log(err.response.data);
        setStatus({ type: "error", msg: err.response.data });
        setOpen(true);
        
      }

      setLoading(false);
  }


  useEffect(() => {
    if( username && ac_status ){
      setStatus({ type: "success", msg: `${username} : Your Account Activated successfully` });
      setOpen(true);
    }
  },[username, ac_status]);
  return (
    <ContainerLogin>
    
      <LoginCard>
        <CardHeader>
          <div>Login App</div>
        </CardHeader>
        <Divider style={{ marginBottom: "10px" }} />
        <form onSubmit={ handleLogin }>
          <TextFieldInput
            type="email"
            autoComplete="off"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            inputRef={ emailRef }
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
            type={ password ? "password" : "text" }
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            required
            autoComplete="off"
            inputRef={ passwordRef }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="togglePassword" onClick={ () => { setPassword(!password) }}>
                    {
                        password ? <Visibility /> : <VisibilityOff />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoginButton
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={ loading }
          >
            Login
          </LoginButton>
        </form>

        <LoginForgetPassword
          onClick={() => {
            history.push("/forgot");
          }}
        >
          Forgot Password ?
        </LoginForgetPassword>
        <Divider />
        <CreateAccount>
          You don't have account.{" "}
          <span
            onClick={() => {
              history.push("/register");
            }}
          >
            Create one!
          </span>
        </CreateAccount>
      </LoginCard>
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
    </ContainerLogin>
  );
}

const LoginForgetPassword = styled.p`
  && {
    text-align: center !important;
    color: #fff;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 18px;
  }
  &:hover {
    color: #706efa;
  }
`;

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

const LoginButton = styled(Button)`
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

const LoginCard = styled(Box)`
  background: #1e1d2b;
  width: 400px;
  padding: 30px;
  border-radius: 8px;
`;

const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4c4f64;
`;
