import AppBar from "./AppBar";

interface Blog {
  title: string;
  content: string;
  updatedAt: string;
  author: {
    name: string;
  };
}

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-4 max-w-screen-2xl pt-8 px-8">
          <div className="col-span-9">
            <div className="text-3xl font-extrabold mb-4">{blog.title}</div>
            <div className="text-xl font-light mb-4">{blog.content}</div>
            <div className="text-sm text-gray-500">Published on: {blog.updatedAt.slice(0,10)}</div>
          </div>
          <div className="col-span-3 bg-green-100 p-4">
          <div className="text-sm text-gray-500">Author: {blog.author.name}</div>

            <div className="text-lg font-semibold">Catch Phrases about author</div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
