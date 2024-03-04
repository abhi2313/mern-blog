import React, { useState,useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from 'axios'

import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";



const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const navigate=useNavigate();
  const id = useParams().id;
    const [inputs, setInputs] = useState({ 
  });
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data.blog);
    setInputs({
        title:data.blog.title,
        description:data?.blog.description,
        
    })
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  useEffect(()=>{
    getBlogDetail()
    
  },[id])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
      
        user:localStorage.getItem('userId')
      });

      if (data?.success) {
        alert("blog updated");
        navigate("/my-blogs");
      }
    } catch (err) {
        console.log(err)
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
          <Typography variant="h2">Update a Blog</Typography>
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
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
