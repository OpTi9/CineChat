"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "@/app/components/sidebar/MobileItem";

/**
 * MobileFooter - A footer component for mobile view.
 *
 * This component fetches route data using the `useRoutes` hook and conversation state using the `useConversation` hook.
 * Each route is rendered as a `MobileItem`. If the conversation state `isOpen` is true, the MobileFooter does not render.
 *
 * Imports:
 * - useRoutes: Hook that fetches the route data.
 * - useConversation: Hook that fetches the conversation state.
 * - MobileItem: Component used to display each individual route in the footer.
 */

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  // If the conversation is open, don't render the mobile footer
  if (isOpen) return null;

  return (
    <div
      className="
    fixed
    justify-between
    bottom-0
    w-full
    z-40
    flex
    items-center
    bg-white
    border-t-[1px]
    lg:hidden
  "
    >
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
