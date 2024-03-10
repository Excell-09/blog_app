import { Comment } from "@/types";
import ImageNoProfile from "@/assets/noProfileImage.jpg";

export default function CommentCard(comment: Comment) {
  return (
    <div className="flex my-5 gap-3">
      <img
        src={ImageNoProfile}
        alt={comment.author?.username}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-bold">{comment.author?.username}</p>
        <p className="font-light">{comment.comment}</p>
      </div>
    </div>
  );
}
