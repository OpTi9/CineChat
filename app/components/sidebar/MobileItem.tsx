"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

/**
 MobileItem - Navigation item for mobile view.
 This component displays a navigation item with an icon and a clickable area that leads to a specified URL.
 It accepts props for the href, icon, an optional active status, and an optional onClick handler.
 When the item is active, additional CSS classes are applied for visual distinction.

 Props:
 href: URL to navigate to when clicked.
 icon: React component for the icon.
 active (optional): Whether the item is currently active.
 onClick (optional): Handler for when the item is clicked.
 */

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
        `,
        active && "bg-gray-100 text-black",
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
