/**
 * Prisma client configuration.
 *
 * This module exports a configured instance of the Prisma client.
 * This instance is either retrieved from the global context or
 * a new instance is created.
 *
 * If the application is not running in a production environment,
 * the Prisma client instance is saved to the global context to
 * potentially improve performance in development and testing
 * environments by reusing the existing connection across hot
 * reloads, rather than having to establish a new connection
 * for every request.
 *
 * @module prismadb
 */

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
