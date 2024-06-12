/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { type Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import logger from "@/lib/logger";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Dropzone from "react-dropzone";
import { useEdgeStore } from "@/components/layout/providers";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  event: Event;
};

export default function EventImageDialog(props: Props) {
  const [open, setOpen] = useState(false);
  const { edgestore } = useEdgeStore();
  const [uploading, setUploading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      eventId: props.event.id,
      image: "",
    },
  });

  const uploadFile = async (_file: File[]) => {
    const file = _file[0];
    logger.debug("uploadFile", { _file });
    if (!file) return;
    // single file upload
    const res = await edgestore.publicFiles.upload({
      file,
      onProgressChange: (progress) => {
        logger.debug("uploadFile", { progress });
        setUploading(true);
        if (progress === 100) {
          setUploading(false);
        }
      },
    });
    form.setValue("image", res.url);
  };

  const handleSubmit = () => {
    logger.info("Event Name Dialog submitted");
    logger.debug(form.getValues());
    try {
      toast.success("Event name updated successfully", {
        duration: 5000,
        dismissible: true,
      });
    } catch (error) {
      logger.error("Event Name Dialog error", error);
      toast.error("An error occurred. Please try again later.", {
        duration: 5000,
        dismissible: true,
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{props.children}</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Event Image</DialogTitle>
              </DialogHeader>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel htmlFor="dropzone-file">
                      <Dropzone
                        autoFocus
                        onDrop={(acceptedFiles) =>
                          uploadFile(acceptedFiles as File[])
                        }
                        multiple={false}
                        maxSize={10000000}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section {...getRootProps()}>
                            <div className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:border-gray-500">
                              <div className="h-full w-full">
                                {!field.value && !uploading && (
                                  <div className="flex h-full flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      SVG, PNG, JPG up to 10MB
                                    </p>
                                  </div>
                                )}

                                {uploading && (
                                  <div className="flex h-full flex-col items-center justify-center pb-6 pt-5">
                                    <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
                                    <span>Uploading...</span>
                                  </div>
                                )}

                                {field.value && !uploading && (
                                  <Image
                                    src={field.value}
                                    width={720}
                                    height={720}
                                    alt="uploaded"
                                    className="h-full w-full rounded-lg object-cover object-center"
                                  />
                                )}
                              </div>

                              <Input
                                {...getInputProps()}
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                              />
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="image"
                        className="sr-only"
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="m-0">
                <DialogClose asChild>
                  <Button type="button" variant={"outline"}>
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={uploading} onClick={handleSubmit}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </>
  );
}
