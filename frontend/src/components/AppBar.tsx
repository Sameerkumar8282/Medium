import { Avatar } from "./BlogCard";

function AppBar() {
  return (
    <div className=" border-b flex justify-between px-10 py-4">
      <div>Medium</div>
      <div>
        <Avatar name="Sameer" />
      </div>
    </div>
  );
}

export default AppBar;
