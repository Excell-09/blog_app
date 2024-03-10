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
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import config from "@/config/config";

export default function SignUp() {
  const [isShow, setIsShow] = React.useState(false);
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast({ title: "success", description: "Create Account Successfully" });
    },
    onError: (e) => {
      toast({
        title: "failed",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const directToGoogleSignIn = () =>
    window.location.replace(`${config.backendUrl}/auth/google`);

  const registerHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const user = {
      username: target.username.value,
      password: target.password.value,
    };

    mutation.mutate(user);
  };

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
            <form className="space-y-3" onSubmit={registerHandler}>
              <Input placeholder="username" name="username" />
              <div className="relative cursor-pointer">
                <Input
                  name="password"
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
              <Button className="w-full">
                {mutation.isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            <p className="text-center my-3">Or</p>
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => directToGoogleSignIn()}
            >
              <FcGoogle className="text-2xl mr-3" />
              SigIn With Google
            </Button>
          </CardContent>
          <CardFooter>
            <p className="mx-auto">
              Already Have An Account?{" "}
              <Link className="text-blue-600" to={"/signin"}>
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </article>
    </section>
  );
}
