"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

/**
 * DesktopItem - Navigation item for a desktop view.
 *
 * Props:
 * - href: URL to navigate to when clicked.
 * - label: Text for the item, hidden from view but available to screen readers.
 * - icon: React component for the icon.
 * - active (optional): Whether the item is currently active.
 * - onClick (optional): Handler for when the item is clicked.
 */

const DesktopItem: React.FC<DesktopItemProps> = ({
  href,
  label,
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
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
            group
            flex
            gap-x-3
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-gray-black
            hover:bg-gray-100
            `,
          active && "bg-gray-100 text-black",
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        {/* "sr-only" is used to hide the text from the user screen but leave it for SEO purposes */}
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
