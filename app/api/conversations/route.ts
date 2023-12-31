import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

/**
 * POST API endpoint to create or fetch chat conversations.
 *
 * @module
 *
 * @requires getCurrentUser - Fetches current authenticated user.
 * @requires next/server - For handling Next.js server responses.
 * @requires prismadb - Prisma database client.
 *
 * @function POST
 * - Validates user credentials and request body.
 * - If creating a group chat, checks for necessary group info.
 * - For group chats, creates a new conversation with members.
 * - For direct chats, fetches or creates a new conversation between users.
 *
 * @throws Returns 401 if the user is unauthorized.
 * @throws Returns 400 if the group chat request is invalid.
 * @throws Returns 500 for internal server errors.
 */

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    // group chat logic
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              // add members to the group
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              // add current user to the group
              { id: currentUser.id },
            ],
          },
        },
        // populate the users when we fetch the conversation
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    // direct chat logic
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // create new conversation if it doesn't exist
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
