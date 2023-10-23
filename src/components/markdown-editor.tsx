'use client';

import ReactQuill from 'react-quill';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import 'react-quill/dist/quill.snow.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


export const Editor = forwardRef<
  React.ElementRef<typeof ReactQuill>,
  React.ComponentPropsWithoutRef<typeof ReactQuill>
>(({ className, ...props }, forwardedRef) => (
  <ReactQuill
    className={twMerge(className, inter.className)}
    ref={forwardedRef}
    theme="snow"
    {...props}
  />
));

Editor.displayName = 'Editor';