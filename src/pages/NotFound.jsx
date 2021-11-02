import React from 'react';
import {
    Box
  } from "@mui/material";
  import styled from "styled-components";
  import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <NotFoundContainer>
            <NotFoundCard>
                <p>404</p>
                <h2>Page Nout Found</h2>
                <Link to="/" >Home Page</Link>
            </NotFoundCard>
           
        </NotFoundContainer>
    )
}

const NotFoundCard = styled(Box)`
  background: #1e1d2b;
  width: 400px;
  padding: 30px;
  border-radius: 8px;
  text-align:center;
    p{
        font-size:120px;
    }
    h2{
        font-size:30px;
        margin-top:20px;
        margin-bottom:20px;
    }
    a{
        font-size:20px;
        color:white;
    }
`;

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #4c4f64;
`;