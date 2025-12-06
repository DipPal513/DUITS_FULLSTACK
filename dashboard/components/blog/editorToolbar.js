"use client";

import React, { useCallback } from "react";

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  // Helper to add an image via URL
  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // Helper to set a link
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) return;

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  // Base classes for buttons
  const btnBase = "p-2 rounded hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors";
  const btnActive = "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300";

  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      
      {/* --- HISTORY --- */}
      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${btnBase} disabled:opacity-30`}
          title="Undo"
        >
          ↩
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${btnBase} disabled:opacity-30`}
          title="Redo"
        >
          ↪
        </button>
      </div>

      {/* --- TEXT STYLE --- */}
      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btnBase} ${editor.isActive("bold") ? btnActive : ""} font-bold`}
          title="Bold"
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btnBase} ${editor.isActive("italic") ? btnActive : ""} italic`}
          title="Italic"
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btnBase} ${editor.isActive("underline") ? btnActive : ""} underline`}
          title="Underline"
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btnBase} ${editor.isActive("strike") ? btnActive : ""} line-through`}
          title="Strikethrough"
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${btnBase} ${editor.isActive("code") ? btnActive : ""} font-mono text-sm`}
          title="Inline Code"
        >
          &lt;/&gt;
        </button>
      </div>

      {/* --- HEADINGS --- */}
      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${btnBase} ${editor.isActive("heading", { level: 1 }) ? btnActive : ""} font-bold text-lg`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnBase} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""} font-bold text-md`}
        >
          H2
        </button>
      </div>

      {/* --- ALIGNMENT --- */}
      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${btnBase} ${editor.isActive({ textAlign: "left" }) ? btnActive : ""}`}
          title="Align Left"
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${btnBase} ${editor.isActive({ textAlign: "center" }) ? btnActive : ""}`}
          title="Align Center"
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${btnBase} ${editor.isActive({ textAlign: "right" }) ? btnActive : ""}`}
          title="Align Right"
        >
          Right
        </button>
      </div>

      {/* --- LISTS & BLOCKS --- */}
      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btnBase} ${editor.isActive("bulletList") ? btnActive : ""}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnBase} ${editor.isActive("orderedList") ? btnActive : ""}`}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${btnBase} ${editor.isActive("blockquote") ? btnActive : ""}`}
          title="Quote"
        >
          ""
        </button>
      </div>

      {/* --- INSERTS --- */}
      <div className="flex gap-1">
        <button onClick={setLink} className={`${btnBase} ${editor.isActive("link") ? btnActive : ""}`} title="Link">
          🔗
        </button>
        <button onClick={addImage} className={btnBase} title="Image">
          🖼️
        </button>
      </div>

    </div>
  );
};

export default EditorToolbar;