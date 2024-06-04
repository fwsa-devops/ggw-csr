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
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  maxParticipants?: number;
};
