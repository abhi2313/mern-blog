import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const[loading,setLoading]=useState(false)

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      
      const { data } = await axios.get(`/api/blog/user-blog/${id}`);
      if (data?.success) {
        
        setBlogs(data?.userBlogs.blogs);
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  useEffect(() => {
    setLoading(true)
    getUserBlogs();
    setLoading(false)
  }, []);
  
  return (
    <div>
      {blogs &&  blogs.length > 0 && (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            time={new Date(blog.createdAt).toLocaleDateString()}
          />
        ))
      )} 
    
    </div>
  );
};

export default UserBlogs;