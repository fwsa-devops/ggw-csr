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
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { type IEvent } from "@/server/model";
import { revalidatePath } from "next/cache";

type Props = {
  children: React.ReactNode;
  event: IEvent;
};

export default function EventNameDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      eventId: props.event.id,
      title: props.event.title,
    },
  });

  const handleSubmit = () => {
    logger.info("Event Name Dialog submitted");
    try {
      toast.success("Event name updated successfully", {
        duration: 5000,
        dismissible: true,
      });
      revalidatePath(`/${props.event.slug}`, 'page');
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
                <DialogTitle>Update Event Name</DialogTitle>
              </DialogHeader>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="sr-only">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" variant="default" className="ml-auto">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </>
  );
}
