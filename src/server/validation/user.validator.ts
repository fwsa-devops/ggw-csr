import prisma from "@/lib/prisma";

export class UserValidator {

  public static async checkUserExistsById(userId: string) {
    if (!userId || userId.trim().length < 1) {
      throw new Error("User id is undefined");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true
      }
    })

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

 
  public static async checkUserExistsByEmail(email: string | undefined | null) {
    if (!email || email.trim().length < 1) {
      throw new Error("User id is undefined");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
        isActive: true
      }
    })

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

}