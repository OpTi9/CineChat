import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

/**
 * POST API endpoint to register a new user.
 *
 * @module
 *
 * @requires bcrypt - For hashing passwords.
 * @requires prismadb - Prisma database client.
 * @requires next/server - For handling Next.js server responses.
 *
 * @function POST
 * - Receives user info from request.
 * - Validates the provided user data.
 * - Hashes the user password and stores the new user in the database.
 *
 * @throws Returns 400 if provided user info is invalid.
 * @throws Returns 500 for internal server errors and logs the error with "Register error" tag.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Invalid info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "Register error");
    return new NextResponse("Internal error", { status: 500 });
  }
}
