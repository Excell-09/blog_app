import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import * as React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function SignUp() {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <section className="container">
      <article className="max-w-xl mx-auto p-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">SignUp</CardTitle>
            <CardDescription className="text-center">
              Sign Up Now and Start Creating with Your Blog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3">
              <Input placeholder="username" />
              <div className="relative cursor-pointer">
                <Input
                  placeholder="password"
                  type={`${isShow ? "text" : "password"}`}
                />
                <span
                  className="absolute right-3 top-3"
                  onClick={() => setIsShow((prevValue) => !prevValue)}
                >
                  {isShow ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <Button className="w-full">Sign Up</Button>
            </form>
            <p className="text-center my-3">Or</p>
            <Button variant={"outline"} className="w-full">
              <FcGoogle className="text-2xl mr-3" />
              SigIn With Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="mx-auto">
              Already Have An Account?{" "}
              <Link className="text-blue-600" to={"/signin"}>
                SignIn
              </Link>
            </p>
          </CardFooter>
        </Card>
      </article>
    </section>
  );
}
