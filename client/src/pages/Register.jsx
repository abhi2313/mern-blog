import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const naviagte = useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post('/api/user/register',{
        username:inputs.name,
        email:inputs.email,
        password:inputs.password
      })

      if(data.success)
      {
        alert('user registered successfully')
        naviagte('/login')
      }

    }
    catch(err)
    {
      alert(err.response.data.message);
    }

  }
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
          Register
        </Typography>
        <TextField
          margin="normal"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          required
        />
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
          Register
        </Button>
        <Button
          onClick={() => {
            naviagte("/login");
          }}
        >
          Already registered ? Login
        </Button>
      </Box>
      </form>
    </>
  );
};

export default Register;
