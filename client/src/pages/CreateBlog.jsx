import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",

    
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
     
        user:localStorage.getItem('userId')
      });

      if (data?.success) {
        alert("blog created");
        navigate("/my-blogs");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"40%"}
          border={1}
          borderRadius={5}
          padding={3}
          margin={"auto"}
          marginTop={3}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h2">Create a Blog</Typography>
          <InputLabel sx={{ mb: 1, mt: 2 }}>Title</InputLabel>
          <TextField
            name="title"
            margin="normal"
            variant="outlined"
            value={inputs.title}
            onChange={handleChange}
            required
          ></TextField>
          <InputLabel sx={{ mb: 1, mt: 2 }}>Desciption</InputLabel>
          <TextField
            name="description"
            margin="normal"
            variant="outlined"
            value={inputs.description}
            onChange={handleChange}
            required
          ></TextField>
        
          <Button type="submit" variant="contained">
            submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
