import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { redirect, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { authActions } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";

const Login = () => {
  const isLogin=useSelector(store=>store.isLogin)
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);

        dispatch(authActions.login());

        alert("user login successfully");

        navigate('/');
      
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
 
  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={10}
          boxShadow={"10px 10px 20px grey"}
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            Login
          </Typography>

          <TextField
            margin="normal"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            required
          />
          <TextField
            margin="normal"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            required
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Not a user ? Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
