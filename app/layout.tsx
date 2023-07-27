import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CinemaChat",
  description: "chat for cinema fans",
};

/**
 * RootLayout component.
 *
 * This is the root component of your application. It applies global styles,
 * sets the metadata for the application, and wraps all child components
 * with the required context providers: `AuthContext` and `ToasterContext`.
 * It also sets the "Inter" Google font.
 *
 * @param {Object} props The props that are passed to this component.
 * @param {React.ReactNode} props.children The child components of this RootLayout component.
 *
 * @returns {JSX.Element} Returns the RootLayout with context providers and children.
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
