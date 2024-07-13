import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  return (
    <div>
      <AppBar />

      <div className=" flex justify-center">
        <div className=" max-w-xl">
          <BlogCard
            authorName={"Sameer"}
            title={"firt Blog"}
            content={
              "jsdnhhhhhhhef djssssssssssssssssssssf d fdfd fkjd fjd suf fi dsufbusdbfubshhhhhh"
            }
            publishedDate={"10/10/2024"}
          />
          <BlogCard
            authorName={"Sameer"}
            title={"firt Blog"}
            content={
              "jsdnhhhhhhhef djssssssssssssssssssssf d fdfd fkjd fjd suf fi dsufbusdbfubshhhhhh"
            }
            publishedDate={"10/10/2024"}
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
