import { useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Publish = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const sendData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/news`,
        {
          title: title,
          content: content
        },
        {
          headers: {
            Authorization: `${token}`, 
          },
        }
      );
      
      console.log("Post successfully created:", response.data);
      setLoading(false);
      navigate("/blogs");
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, key)) {
            toast.error(errors[key]);
          }
        }
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar />
      <form className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            id="default-search"
            className="mt-6 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Enter Title"
            value={title}
            onChange={handleChangeTitle}
            required
          />
        </div>
      </form>

      <textarea
        className="mt-6 w-5/6 block mx-auto p-2.5 text-sm text-gray-900 border-2 rounded-lg resize-y h-40"
        rows={8}
        value={content}
        onChange={handleChangeContent}
        placeholder="Write your thoughts here..."
      ></textarea>

      <div className="flex justify-center">
        <button
          onClick={sendData}
          type="button"
          className={`mt-6 border-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default Publish;
