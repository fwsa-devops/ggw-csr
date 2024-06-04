import { create } from "zustand";

import {
  type User,
  type Location,
  type Address,
  type EventParticipant,
  type Event,
} from "@prisma/client";
import { eventDetails } from "@/server/service/event.service";
import { create as add, remove } from "@/server/service/participant.service";
import { StatusCodes } from "http-status-codes";

type EventStore = {
  event: Event | null;
  location: Location | null;
  Address: Address | null;
  participants: EventParticipant[] | null;
  createdBy: User | null;
  isParticipant: boolean;
  fetch: (eventId: string) => Promise<void>;
  setIsParticipant: (userId: string) => Promise<void>;
};

const useEventStore = create<EventStore>((set, get) => ({
  event: null,
  location: null,
  Address: null,
  participants: [],
  createdBy: null,
  isParticipant: false,

  fetch: async (slug: string) => {
    const response = await eventDetails(slug);
    if (response.status !== StatusCodes.OK) {
      return;
    }
    const data = response.data;
    set({
      event: data?.event,
      location: data?.location,
      Address: data?.Address,
      participants: (data?.participants as unknown as EventParticipant[]) ?? [],
      createdBy: data?.createdBy,
      isParticipant: data?.isParticipant ? true : false,
    });
  },

  setIsParticipant: async (userId: string) => {
    const event = get().event;
    if (!event) return;
    const { id } = event;
    if (get().isParticipant) {
      await remove(id, userId);
      set({ isParticipant: false });
    } else {
      await add(id, userId);
      set({ isParticipant: true });
    }
  },
}));

export default useEventStore;
