import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../hooks";

interface Blog {
  id: number;
  title: string;
  content: string;
  user: {
    name: string;
  };
  publishedAt: string;
}

const Blogs = () => {
  const { loading, blog } = useBlog();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <AppBar />

      <div className=" flex justify-center">
        <div className=" max-w-xl">
          {blog.map((blogItem: Blog) => (
            <BlogCard
              id={blogItem.id}
              key={blogItem.id}
              authorName={blogItem.user.name}
              title={blogItem.title}
              content={blogItem.content}
              publishedDate={blogItem.publishedAt.slice(0, 10)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
