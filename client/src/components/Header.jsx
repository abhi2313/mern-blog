import React, { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { authActions } from "../redux/store";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  let isLogin = useSelector((state) => state.isLogin);
  isLogin=isLogin || localStorage.getItem('userId')

  const handleLogout=()=>{
    dispatch(authActions.logout())
    alert('logged out successfully')
    localStorage.clear()
    navigate('/login')
   
  }

  const [value, setValue] = useState(0);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => {
                  setValue(val);
                }}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                {" "}
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>Logout</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
