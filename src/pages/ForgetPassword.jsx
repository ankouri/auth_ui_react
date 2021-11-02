import React ,{useState,useRef} from "react";
import { Snackbar, Alert,TextField, InputAdornment, Button, Box, Divider } from "@mui/material";
import styled from "styled-components";
import { ChevronLeft, Email } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ForgetPassword() {
    const history = useHistory();
    const emailRef = useRef();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", msg: "" });
  
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpen(false);
    };

    const handlePasswordReset = async(e) => {
      e.preventDefault();
      setLoading(true);

      const request = {
        email: emailRef.current.value
      };

      console.log(request);
      try {

        const result = await axios.post(
          "/api/auth/forgot",
          request
        );
        console.log(result.data);
        setStatus({ type: "success", msg: result.data });
        setOpen(true);
        
      } catch (err) {
        console.log(err.response.data);
        setStatus({ type: "error", msg: err.response.data });
        setOpen(true);
        
      }

      setLoading(false);
    }


    return (
    <ContainerForgot>
      <ForgotCard>
        <CardHeader>
          <ReturnToLogin
            onClick={() => {
              history.push("/");
            }}
          >
            <ChevronLeft />
          </ReturnToLogin>
          <div>Forgot Password</div>
        </CardHeader>
        <Divider style={{ marginBottom: "10px" }} />
        <form onSubmit={ handlePasswordReset } >
          <TextFieldInput
            type="email"
            id="outlined-basic"
            label="Email"
            autoComplete="off"
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

          <ForgotButton
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={ loading }
          >
            Send Email
          </ForgotButton>
        </form>
      </ForgotCard>
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
    </ContainerForgot>
  );
}

const ReturnToLogin = styled(Button)`
  width: 60px !important;
  padding: 1px !important;
  margin-right: 20px !important;
  && {
    text-align: center;
    color: #fff;
  }
  &:hover {
    color: #706efa;
  }
`;

const CardHeader = styled.div`
  padding: 2px;
  margin-bottom: 10px;
  text-align: center;
  div {
    font-size: 20px;
    letter-spacing: 0px;
    font-family: "Merriweather";
  }
  display: flex;
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
