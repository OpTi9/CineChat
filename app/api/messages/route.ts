import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

/**
 * POST API endpoint to send a message within a chat conversation.
 *
 * @module
 *
 * @requires next/server - For handling Next.js server responses.
 * @requires getCurrentUser - Fetches the current authenticated user.
 * @requires prismadb - Prisma database client.
 *
 * @function POST
 * - Authenticates the user.
 * - Creates a new message in the specified conversation.
 * - Updates the conversation's `lastMessageAt` timestamp.
 *
 * @throws Returns 401 if the user is unauthorized.
 * @throws Returns 500 for internal server errors and logs the error with "ERROR_MESSAGE" tag.
 */

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
