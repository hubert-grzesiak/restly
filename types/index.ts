import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export interface Address {
  streetAndNumber: string;
  place: string;
  region: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Suggestion {
  place_name: string;
  center: [number, number];
  context: Array<{
    id: string;
    text: string;
  }>;
}

export interface AutoCompleteInputProps {
  handleManualInputChange: (event: React.ChangeEvent<HTMLInputElement>, identifier: string) => void;
  setAddress: (address: Address) => void;
  streetAndNumber: string;
}
