"use client";

import React from "react";
import NewEventForm from "./components/new-event-form";
import { useLoadScript } from "@react-google-maps/api";
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
    language: "en",
  });

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    void signIn("google", { callbackUrl: "/new" });
  }

  if (!isLoaded) return null;

  return <NewEventForm />;
}
