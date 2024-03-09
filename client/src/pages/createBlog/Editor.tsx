import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBarEditor from "./MenubarEditor";
import Underline from "@tiptap/extension-underline";
import MenuBubble from "./MenuBubble";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-screen",
      },
    },
  });

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {editor ? <MenuBarEditor editor={editor} /> : null}
        <div className="p-3 bg-white">
          <EditorContent editor={editor} />
        </div>
        {editor ? <MenuBubble editor={editor} /> : null}
      </div>
    </>
  );
}
