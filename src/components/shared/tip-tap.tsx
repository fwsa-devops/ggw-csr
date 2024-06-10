"use client";

import { useEditor, EditorContent, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

type TiptapProps = {
  value: Content;
  onChange: (value: { html: string; text: string }) => void;
};

const Tiptap = (props: TiptapProps) => {
  const editor = useEditor({
    editable: true,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "prose prose-md dark:prose-invert",
      },
    },
    extensions: [StarterKit],
    content: props.value,
    onUpdate: ({ editor }) => {
      props.onChange({
        html: editor.getHTML(),
        text: editor.getText(),
      });
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
