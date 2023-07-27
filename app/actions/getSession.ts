import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * getSession - Function to get the server session using next-auth.
 *
 * This function retrieves the server session by calling getServerSession function from next-auth.
 * It uses the authOptions exported from the route file of the auth API.
 */
export default async function getSession() {
  return await getServerSession(authOptions);
}
