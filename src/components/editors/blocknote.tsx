'use client'; // this registers <Editor> as a Client Component

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

interface EditorProps {
  onChange: (value: any) => void;
  initialContent?: string;
  editable?: boolean;
}

// Our <Editor> component we can reuse later
export default function BlockNote({
  onChange,
  editable,
  initialContent,
}: EditorProps) {
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    editable: editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      // const saveBlocksAsMarkdown = async () => {
      //   const markdown: string =
      //     await editor.blocksToMarkdown(editor.topLevelBlocks);
      //   useContent(markdown);
      //   console.log(markdown);
      // };
      // saveBlocksAsMarkdown();

      // const saveBlocksAsHTML = async () => {
      //   const markdown: string =
      //     await editor.blocksToHTML(editor.topLevelBlocks);
      //   useContent(markdown);
      //   console.log(markdown);
      // };
      // saveBlocksAsHTML();

      onChange(editor);
    },
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={'light'} />;
}
