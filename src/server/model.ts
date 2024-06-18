import { type Address, type Location, type User } from "@prisma/client";

export type INewEvent = {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  timezone: string;
  image: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  address: {
    name?: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  maxParticipants?: number;
};


export type IEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  startTime: Date;
  endTime: Date;
  timezone: string;
  image: string;
  maxParticipants: number;
  isParticipationOpen: boolean;
  Location: Location;
  Address:Address;
  User: User;
}
