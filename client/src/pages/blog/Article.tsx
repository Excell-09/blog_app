import { Blog } from "@/types";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageNoProfile from "@/assets/noProfileImage.jpg";
import Underline from "@tiptap/extension-underline";
import Comment from "./Comments";

export default function Article(blog: Blog) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: JSON.parse(blog.article),
  });

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-5">{blog.title}</h1>
        <div className="flex items-center gap-3 mb-5">
          <img
            src={ImageNoProfile}
            alt={blog.author.username}
            className="w-14 h-14 rounded-full"
          />
          <div>
            <p className="font-bold">{blog.author.username}</p>
            <p>
              Create At : {new Date(blog.createdAt).getDate()}
              {"-"}
              {new Date(blog.createdAt).getMonth()}
              {"-"}
              {new Date(blog.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </div>
      <img
        src={blog.banner}
        alt={blog.title}
        className="w-full h-96 object-cover"
      />
      <div className="max-w-3xl mx-auto mt-5">
        <EditorContent editor={editor} />
      </div>

      <Comment comments={blog.Comment} currentBlog={blog} />
    </div>
  );
}
