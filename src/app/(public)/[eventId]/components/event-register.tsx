"use client";

import React from "react";
import { Hand, Send } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Button } from "@/components/ui/button";

export default function EventRegister() {
  return (
    <>
      <div
        className={cn("flex flex-row items-center gap-3 text-muted-foreground")}
      >
        <Button
          variant={"default"}
          size={"lg"}
          type="button"
          className="group py-6 lg:w-2/3"
        >
          <Hand size={24} className="group-hover:animate-shake mr-3" />
          Register
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          type="button"
          className="group py-6 lg:w-1/3"
        >
          <Send size={24} className="group-hover:animate-shake mr-3" />
          Share
        </Button>
      </div>
    </>
  );
}
