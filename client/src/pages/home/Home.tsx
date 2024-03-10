import { getAllBlogs } from "@/api/blogApi";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cards from "./Cards";

function Loading() {
  return <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />;
}

export default function Home() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getAllBlogs,
  });

  return (
    <section className="container p-3">
      {query.isLoading ? <Loading /> : <Cards blogs={query.data?.blogs!} />}
    </section>
  );
}
