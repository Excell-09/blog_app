import { Blog } from "@/types";
import ImageNoProfile from "@/assets/noProfileImage.jpg";
import { useNavigate } from "react-router-dom";

export default function Card(blog: Blog) {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/blog/${blog.id}`);

  return (
    <div
      className="flex border-2 border-r-4 border-b-4 border-black rounded-md group cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        src={blog.banner}
        alt={blog.title}
        className="lg:w-52 object-cover lg:h-44 md:w-64 md:h-52 w-44 h-36"
      />
      <div className="flex flex-col gap-3 p-3">
        <h4 className="font-semibold md:text-xl text-lg group-hover:underline">
          {blog.title}
        </h4>
        <div className="flex gap-3 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={ImageNoProfile}
            alt={blog.author.username}
          />
          <p className="group-hover:underline">{blog.author.username}</p>
        </div>
      </div>
    </div>
  );
}
