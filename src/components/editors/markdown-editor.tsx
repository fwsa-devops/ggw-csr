'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import 'react-quill/dist/quill.snow.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const Editor = forwardRef<
  React.ElementRef<typeof ReactQuill>,
  React.ComponentPropsWithoutRef<typeof ReactQuill>
>(({ className, ...props }, forwardedRef) => (
  <ReactQuill
    className={twMerge(className, inter.className)}
    // ref={forwardedRef}
    theme="snow"
    {...props}
  />
));

Editor.displayName = 'Editor';
