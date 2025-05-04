import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { Link } from "@tiptap/extension-link";
import "./tiptap.css";

export default function TiptapEditor({ onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      Link,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className="editor-wrapper dark-silver-bg">
      <div className="toolbar">
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive("bold") ? "active" : ""}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive("italic") ? "active" : ""}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
        >
          H1
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
        >
          H2
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive("bulletList") ? "active" : ""}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().toggleLink().run();
          }}
          className={editor.isActive("link") ? "active" : ""}
        >
          Link
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().undo().run();
          }}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={(event) => {
            handleButtonClick(event);
            editor.chain().focus().redo().run();
          }}
        >
          Redo
        </button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}
