import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlogId } from "../hooks";

const Blog = () => {
  const { id } = useParams<{ id: string }>(); // Type assertion for useParams
  const { loading, blogId } = useBlogId({ id: id || "" }); // Default id to empty string if undefined

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogId) {
    return <div>Blog not found</div>; 
  }

  return (
    <div>
      <FullBlog blog={blogId} />
    </div>
  );
};

export default Blog;
