'use client'; // this registers <Editor> as a Client Component

import React from 'react';
import ReactPlayer from 'react-player';
import {
  BlockNoteEditor,
  PartialBlock,
  BlockSchema,
  defaultBlockSchema,
  defaultProps,
} from '@blocknote/core';
import {
  BlockNoteView,
  useBlockNote,
  createReactBlockSpec,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import '@blocknote/core/style.css';
import { Video } from 'lucide-react';

interface EditorProps {
  editable?: boolean;
  initialContent?: string;
  onChange?: (value: any) => void;
}

// Our <Editor> component we can reuse later
export default function BlockNote({
  editable,
  onChange,
  initialContent,
}: EditorProps) {
  const VideoPlayerSchema = createReactBlockSpec({
    type: 'video',
    propSchema: {
      ...defaultProps,
      src: {
        default: 'https://via.placeholder.com/1000',
      },
      alt: {
        default: 'Video',
      },
      textAlignment: {
        default: 'left',
        values: ['left', 'center', 'right', 'justify'],
      },
      width: {
        default: 512,
      },
      backgroundColor: {
        default: 'default',
      },
    },
    containsInlineContent: false,
    render: ({ block }) => (
      <div className="aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={block.props.src}
          style={{ margin: 'auto', maxWidth: '100%' }}
        />
        {/* <video src={block.props.src} controls /> */}
      </div>
    ),
  });

  const customSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the custom image block.
    video: VideoPlayerSchema,
  } satisfies BlockSchema;

  const insertVideo: ReactSlashMenuItem<typeof customSchema> = {
    name: 'Video',
    execute(editor) {
      const src: string | null = prompt('Enter video URL');
      const alt: string | null = prompt('Enter video alt text');

      editor.insertBlocks(
        [
          {
            type: 'video',
            props: {
              src: src || 'https://via.placeholder.com/1000',
              alt: alt || 'image',
            },
          },
        ],
        editor.getTextCursorPosition().block,
        'before',
      );
    },
    aliases: ['video', 'img', 'picture', 'media'],
    group: 'Media',
    icon: <Video size={16} />,
    hint: 'Insert an image',
  };

  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    editable: editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      // console.log(editor);

      // const saveBlocksAsMarkdown = async () => {
      //   const markdown: string =
      //     await editor.blocksToMarkdown(editor.topLevelBlocks);
      //   useContent(markdown);
      //   // console.log(markdown);
      // };
      // saveBlocksAsMarkdown();

      // const saveBlocksAsHTML = async () => {
      //   const markdown: string =
      //     await editor.blocksToHTML(editor.topLevelBlocks);
      //   useContent(markdown);
      //   // console.log(markdown);
      // };
      // saveBlocksAsHTML();

      onChange?.(editor);
    },
    blockSchema: customSchema,
    slashMenuItems: [...getDefaultReactSlashMenuItems(), insertVideo],
  });

  return <BlockNoteView editor={editor} theme={'light'} />;
}
