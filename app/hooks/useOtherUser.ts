import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";

/**
This hook takes a conversation object (with a users array) as input, uses the useSession hook to retrieve the
 current user's email, and then uses the useMemo hook to filter out the current user from the conversation's
 users array. The result is an array of other users in the conversation.
 */
const useOtherUser = (
  conversation: FullConversationType | { users: User[] },
) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail,
    );
    return otherUser[0];
  }, [conversation.users, session?.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
