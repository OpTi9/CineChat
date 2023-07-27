import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

/**
 * getCurrentUser - Async function to get the current user using the session information.
 *
 * This function first retrieves the session information using getSession function. It then uses the
 * email from the session data to retrieve the user from the database using prisma. If the user is found, it is returned,
 * otherwise, it returns null.
 *
 * Imports:
 * - prisma: Database client from prismadb.
 * - getSession: Function to get the session data.
 */
const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // check if currentUser exists
    if (!currentUser) return null;

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
