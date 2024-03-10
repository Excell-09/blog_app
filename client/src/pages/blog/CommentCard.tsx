import { Comment } from "@/types";
import ImageNoProfile from "@/assets/noProfileImage.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { deleteComment, editComment } from "@/api/commentApi";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Props extends Comment {
  isOwnComment: boolean;
  handleStateEditComment: (
    commentId: string,
    updatedCommentText: string
  ) => void;
  handleStateDeleteComment: (commentId: string) => void;
}

export default function CommentCard(comment: Props) {
  const { toast } = useToast();
  const mutationEditComment = useMutation({
    mutationFn: editComment,
    onSuccess() {
      toast({ description: "Comment Updated" });
    },
    onError(e) {
      toast({
        description: e.message,
        title: "failed",
        variant: "destructive",
      });
    },
  });

  const mutationDeleteComment = useMutation({
    mutationFn: deleteComment,
    onSuccess() {
      toast({ description: "Comment deleted" });
      setIsEditAble(false);
    },
    onError(e) {
      toast({
        description: e.message,
        title: "failed",
        variant: "destructive",
      });
    },
  });
  const [isEditAble, setIsEditAble] = React.useState(false);
  const [commentText, setCommentText] = React.useState(comment.comment);

  const switchEditMode = () => setIsEditAble(true);
  const handleGetValueTextArea: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => setCommentText(e.target.value);

  const handleEditCommet: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    comment.handleStateEditComment(comment.id, commentText);
    setIsEditAble(false);
    mutationEditComment.mutate({
      commentId: comment.id,
      commentText: commentText,
    });
  };

  const handleDeleteComment = () => {
    comment.handleStateDeleteComment(comment.id);
    mutationDeleteComment.mutate({ commentId: comment.id });
  };

  return (
    <div className="flex my-8 gap-3">
      <img
        src={ImageNoProfile}
        alt={comment.author?.username}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <p className="font-bold">{comment.author?.username}</p>
        {isEditAble ? (
          <form onSubmit={handleEditCommet} className="mt-2">
            <Textarea
              value={commentText}
              placeholder="Type Your Comment Here"
              onChange={handleGetValueTextArea}
            />
            <Button type="submit" className="mt-2 block ml-auto">
              {mutationEditComment.isPending ? "Loading..." : "Edit"}
            </Button>
          </form>
        ) : (
          <p className="font-light">{comment.comment}</p>
        )}
      </div>
      {comment.isOwnComment ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"} className="rounded-full">
                <BsThreeDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={switchEditMode}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteComment}>
                delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : null}
    </div>
  );
}
