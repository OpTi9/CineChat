"use client";

import { FullMessageType } from "@/app/types";
import { useRef, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  return (
    <div
      className="
        flex-1
        overflow-y-auto
  "
    >
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
