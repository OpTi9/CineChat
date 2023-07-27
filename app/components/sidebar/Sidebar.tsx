import React from "react";
import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";

/**
 * Sidebar component.
 *
 * This component renders a sidebar for desktop view along with
 * its child components. The sidebar is from the `DesktopSidebar`
 * component, and the children render in the main area.
 *
 * @param {Object} props The props that are passed to this component.
 * @param {React.ReactNode} props.children The child components of this Sidebar component.
 *
 * @returns {JSX.Element} Returns a div with `DesktopSidebar` and main content area.
 */

async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
