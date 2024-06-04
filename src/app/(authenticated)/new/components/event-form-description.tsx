/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/shared/tip-tap";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import logger from "@/lib/logger";

export default function EventFormDescription() {
  const form = useFormContext();

  const [description, setDescription] = React.useState<string | null>(null);

  const handleChange = (e: { html: string; text: string }) => {
    logger.info("description changed");
    form.setValue("description", e.html);
    setDescription(e.text);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "h-fit w-full justify-start text-left font-normal items-start py-5",
              !(description ?? description == "") && "text-muted-foreground",
            )}
          >
            <FileText className="mr-4 h-5 w-5" />
            <span className="w-full overflow-auto text-wrap truncate line-clamp-6">
              {description ?? "Add a description"}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Description</DialogTitle>
            <DialogDescription>
              Add a description to your event to let people know what it's
              about.
            </DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Description</FormLabel> */}
                <FormControl>
                  <Tiptap value={field.value} onChange={handleChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="default">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
