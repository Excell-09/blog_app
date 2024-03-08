import { User } from "@/types";
import { redirect } from "react-router-dom";

function loaderProtectRouter(user: User | null) {
  return () => {
    if (!user) {
      return redirect("/signin");
    }
    return null;
  };
}

export default loaderProtectRouter;
