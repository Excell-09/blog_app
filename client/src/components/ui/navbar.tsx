import { useSession } from "@/context/AuthContext";
import { Button } from "./button";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useSession();
  const navigate = useNavigate();

  return (
    <nav className="bg-white flex border-b-2 border-black p-3 container items-center justify-between">
      <h3
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        My Blog
      </h3>
      {user ? (
        <Button
          className="rounded-full border border-b-2 border-r-2 border-black"
          variant={"ghost"}
          onClick={() => navigate("/blog/create")}
        >
          <IoAddOutline className="text-xl" />
        </Button>
      ) : (
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      )}
    </nav>
  );
}
