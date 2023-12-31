"use client";

import { Conversation } from "@prisma/client";
import React from "react";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "@/app/conversations/components/ConversationBox";

interface ConversationsListProps {
  initialItems: FullConversationType[];
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  initialItems,
}) => {
  const [items, setItems] =
    React.useState<FullConversationType[]>(initialItems);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
    fixed
    inset-y-0
    pb-20
    lg:pb-0
    lg:left-20
    lg:w-80
    lg:block
    overflow-y-auto
    border-r
    border-gray-200
    `,
        isOpen ? "hidden" : "block w-full left-0",
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800 select-none">
            Conversations
          </div>
          <div
            className="
            rounded-full
            bg-gray-100
            p-2
            text-gray-600
            cursor-pointer
            hover:opacity-75
            transition
          "
          >
            <MdOutlineGroupAdd size={25} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationsList;
