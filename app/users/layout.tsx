import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

// https://youtu.be/PGPGcKBpAk8 02:13:00
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
