import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

/**
 * POST API endpoint to mark the last message of a specified conversation as seen.
 *
 * @function
 * @param {Request} request - The incoming request object.
 * @param {Object} params - Parameters with an optional conversationId.
 * @returns {NextResponse}
 * - 401 Unauthorized if the user is invalid.
 * - 404 Not Found if the conversation doesn't exist.
 * - 500 Internal Server Error for any errors.
 * - Otherwise, returns the updated message or the conversation.
 *
 * @throws Logs errors with tag "ERROR_MESSAGES_SEEN_ROUTE_POST".
 */

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Not found", { status: 404 });
    }

    // find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // update seen of the last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES_SEEN_ROUTE_POST");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
