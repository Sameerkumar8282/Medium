import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}
const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className=" p-4 border-b border-slate-200 pb-4 cursor-pointer">
        <div className=" flex">
          <Avatar name={authorName} />
          <div className=" font-extralight pl-2 text-sm flex justify-center">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2  ">.</div>
          <div className=" pl-2  font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className=" text-xl font-semibold pt-2">{title}</div>
        <div className=" text-lg font-thin">
          {content.length > 100 ? content.slice(0, 100) + "...." : content}
        </div>
        <div className=" to-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        <div className=" border-b-1 border-slate-200"></div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-semibold text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

export default BlogCard;
