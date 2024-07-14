import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
  author: {
    name:string
  };
  title: string;
  content: string;
  id: number;
}

export const useBlogId = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState<Blog | null>();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/news/${id}`, {
          headers: {
            Authorization: `${token}`, // Assuming token needs 'Bearer ' prefix
          },
        });
        setBlogId(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Removed blogId from dependency array

  return {
    loading,
    blogId,
  };
};

export const useBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');       

      if (!token) {
        console.error("No token found in local storage");
        setLoading(false);
        return;
      }
      
      
      try {
        const response = await axios.get(`${BACKEND_URL}/news?page=1&limit=10`, {
          headers: {
            Authorization: `${token}` 
          }
        });
        setBlog(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    blog
  }
};
