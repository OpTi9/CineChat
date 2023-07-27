import { useParams } from "next/navigation";
import { useMemo } from "react";

/**
 * Custom hook useConversation.
 *
 * This hook retrieves and manages the `conversationId` from the URL parameters. It utilizes
 * two main hooks, `useParams` for extracting URL parameters, and `useMemo` for memoizing
 * computed values to optimize performance. The hook returns an object containing the
 * `conversationId` and a boolean `isOpen` that indicates whether a conversation is open.
 *
 * @returns {Object} Contains `conversationId` (string) and `isOpen` (boolean).
 */
const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      conversationId,
      isOpen,
    }),
    [conversationId, isOpen],
  );
};

export default useConversation;
