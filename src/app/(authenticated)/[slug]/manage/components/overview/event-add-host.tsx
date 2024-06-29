"use client";

import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import logger from "@/lib/logger";
import { addHost } from "@/server/service/event.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";
import { PlusIcon, UserPlus2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type Props = {
  eventSlug: string;
};

export default function EventAddHost(props: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    try {
      logger.debug("handleSubmit", form.getValues());
      logger.debug("handleSubmit", props.eventSlug);
      const response = await addHost(props.eventSlug, form.getValues().email);
      logger.debug("handleSubmit", response);

      if (response.status === StatusCodes.OK) {
        setOpen(false);
        toast.success("Host added");
        router.refresh();
        return;
      }

      toast.error("Failed to add host");
    } catch (error) {
      logger.error("handleSubmit", error);
      toast.error("Failed to add host");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger onClick={() => setOpen(true)} asChild>
          <Button
            type="button"
            variant={"secondary"}
            size={"sm"}
            className="text-sm"
          >
            <PlusIcon size={16} className="mr-2" />
            Add Host
          </Button>
        </DialogTrigger>
        <DialogContent className="text-left sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="text-left">
                <DialogTitle className="">
                  <UserPlus2
                    size={24}
                    className="mb-4 h-fit w-fit rounded-full bg-muted p-2"
                  />
                  Add Host
                </DialogTitle>
                <DialogDescription>
                  Add a host to highlight them on the event page or to get help
                  managing the event.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-3 flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" size={"sm"}>
                    Close
                  </Button>
                </DialogClose>
                <Button variant={"default"} size={"sm"}>
                  Add Host
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
