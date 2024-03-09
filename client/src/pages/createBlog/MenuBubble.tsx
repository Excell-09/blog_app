import { BubbleMenu, Editor } from "@tiptap/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

interface Props {
  editor: Editor;
}
export default function MenuBubble({ editor }: Props) {
  return (
    <BubbleMenu editor={editor}>
      <ToggleGroup type="multiple" className="bg-slate-100 rounded-md">
        <ToggleGroupItem
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <FaBold />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <FaItalic />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <FaUnderline />
        </ToggleGroupItem>
      </ToggleGroup>
    </BubbleMenu>
  );
}
