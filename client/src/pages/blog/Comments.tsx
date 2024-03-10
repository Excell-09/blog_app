import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Blog, Comment } from "@/types";
import ImageNoProfile from "@/assets/noProfileImage.jpg";
import { useSession } from "@/context/AuthContext";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "@/api/commentApi";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CommentCard from "./CommentCard";

interface Props {
  currentBlog: Blog;
  comments: Comment[];
}

export default function Comments(props: Props) {
  const { toast } = useToast();
  const { user } = useSession();
  const [commentText, setCommentText] = React.useState("");
  const [comments, setComments] = React.useState(props.comments);

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess() {
      toast({ description: "Comment Created!" });
      setCommentText("");
    },
    onError(e) {
      toast({
        description: e.message,
        variant: "destructive",
        title: "failed",
      });
    },
  });

  const handleStateComments = () => {
    const newComment: Comment = {
      id: new Date().getTime().toString(),
      author: user!,
      blog: props.currentBlog,
      comment: commentText,
    };

    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleStateEditComment = (
    commentId: string,
    updatedCommentText: string
  ) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, comment: updatedCommentText };
        }
        return comment;
      });

      return updatedComments;
    });
  };

  const handleStateDeleteComment = (commentId: string) => {
    setComments((prevComments) => {
      const currentComment = prevComments.filter(
        (comment) => comment.id !== commentId
      );

      return (prevComments = currentComment);
    });
  };

  const handlePostComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ commentText, blogId: props.currentBlog.id });
    handleStateComments();
  };

  return (
    <>
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="border-y border-black py-5">
          <h3 className="text-2xl font-bold">Comment ({comments.length})</h3>
          {user ? (
            <div className="flex mt-3 gap-3 items-start">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={ImageNoProfile}
                  alt={user?.username}
                  className="w-14 h-14 rounded-full"
                />
                <p className="font-bold">{user?.username}</p>
              </div>

              <form className="flex-1" onSubmit={handlePostComment}>
                <Label htmlFor="message">Your Comment</Label>
                <Textarea
                  placeholder="Type your comment here."
                  id="message"
                  className="min-h-28"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit" className="mt-3 block ml-auto">
                  {mutation.isPending ? (
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Comment"
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <h4 className="text-center text-lg my-3">
              You Need Login For Comment This Blog
            </h4>
          )}
        </div>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            {...comment}
            isOwnComment={user?.id === comment.author.id}
            handleStateEditComment={handleStateEditComment}
            handleStateDeleteComment={handleStateDeleteComment}
          />
        ))}
      </div>
    </>
  );
}
