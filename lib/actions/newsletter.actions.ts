"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/db/prisma";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email");

  if (typeof email !== "string" || !email) {
    throw new Error("Invalid email");
  }

  try {
    await prisma.newsletterSubscriber.create({
      data: { email: email },
    });
  } catch (err: unknown) {
    // Typowane sprawdzenie błędu Prisma
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 = unique constraint failed
      if (err.code === "P2002") {
        throw new Error("This email is already subscribed!");
      }
    }
    // throw err;
  }
}
