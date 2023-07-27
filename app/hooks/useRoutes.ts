import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

/**
 * useRoutes hook.
 *
 * This custom hook provides an array of routes for navigation
 * within the application. Each route object includes label, href,
 * icon, active state, and an optional onClick handler.
 *
 * It uses the `usePathname` hook from Next.js for route matching
 * and the `useConversation` hook to check if a conversation is active.
 * The array of routes is memoized for performance optimization.
 *
 * @returns {Array} Returns an array of route objects.
 */
const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathName === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathName === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathName, conversationId],
  );

  return routes;
};

export default useRoutes;
