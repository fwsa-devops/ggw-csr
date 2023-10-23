"use client"; // this registers <Editor> as a Client Component

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean
}

// Our <Editor> component we can reuse later
export default function BlockNote({
  onChange,
  editable,
  initialContent
}: EditorProps) {
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    editable: editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
    
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}