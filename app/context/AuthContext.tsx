"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

/**
 * AuthContext component.
 *
 * This is a context component that utilizes the `SessionProvider` from
 * `next-auth/react` to provide session state to all child components.
 * By wrapping the children with `SessionProvider`, it allows any
 * child components to have access to the session context, enabling
 * them to know about the current authentication state.
 *
 * @param {Object} props The props that are passed to this component.
 * @param {React.ReactNode} props.children The child components of this AuthContext component.
 *
 * @returns {JSX.Element} Returns a `SessionProvider` context provider that wraps the child components.
 */
export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
