import { getBlog } from "@/api/blogApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Article from "./Article";

function Loading() {
  return <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />;
}

export default function Blog() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ["blog", id],
    queryFn: getBlog,
  });

  return (
    <section className="container p-3">
      {query.isLoading ? <Loading /> : <Article {...query.data?.blog!} />}
    </section>
  );
}
