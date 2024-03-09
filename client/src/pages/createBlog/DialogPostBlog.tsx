import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { postBlog, uploadBanner } from "@/api/blogApi";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { BlogBody } from "@/types";
import { useNavigate } from "react-router-dom";

interface Props {
  editor: Editor;
}

export default function DialogPostBlog(props: Props) {
  const { toast } = useToast();
  const [title, setTitle] = React.useState("");
  const [bannerURL, setBannerURL] = React.useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postBlog,
    onSuccess() {
      toast({ description: "Blog Uploaded" });
      navigate("/");
    },
    onError(err) {
      toast({
        title: "Failed",
        variant: "destructive",
        description: err.message,
      });
    },
  });

  const bannerMutation = useMutation({
    mutationFn: uploadBanner,
    onSuccess(e) {
      setBannerURL(e.data.url);
      toast({ description: "Banner Uploaded" });
    },
    onError(err) {
      setBannerURL("");
      toast({
        title: "Failed",
        variant: "destructive",
        description: err.message,
      });
    },
  });

  const handlePostBlog: React.MouseEventHandler<HTMLButtonElement> = () => {
    const blogData: BlogBody = {
      article: JSON.stringify(props.editor.getJSON()),
      banner: bannerURL,
      title,
    };
    mutation.mutate(blogData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">Upload Blog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Blogs</DialogTitle>
          <DialogDescription>
            Masukan Informasi Sesuai Blog kamu.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder="Title Blog"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
            value={title}
          />
          <Input
            placeholder="Banner Blog"
            type="file"
            onChange={(e) => bannerMutation.mutate(e.target.files)}
          />
          <p className="text-slate-500 text-sm">
            Make Sure : Type File Is Image And Size under 5Mb.
          </p>
        </div>
        <DialogFooter>
          <Button className="mt-3" onClick={handlePostBlog}>
            {mutation.isPending ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />{" "}
                Please wait
              </>
            ) : (
              "Post Blog"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
