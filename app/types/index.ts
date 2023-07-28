import { Conversation, Message, User } from "@prisma/client";

// include sender details and an array of users who have seen the message
export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

// include users involved and array of messages exchanged in the conversation
export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
