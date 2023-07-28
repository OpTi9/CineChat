import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

/**
 * getUsers - Async function to get all users except the current user from the database.
 *
 * Imports:
 * - prisma: Database client from prismadb.
 * - getSession: Function to get the session data.
 */

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email as string,
        },
      },
    });
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
