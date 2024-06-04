import { getServerAuthSession } from "./../auth";
import { db } from "./../db";

import { Exception } from "./../exceptions/exception";

export class SessionValidator {
  public static async validateSession() {
    const session = await getServerAuthSession();
    if (!session?.user?.email) {
      throw Exception.NOT_AUTHENTICATED("User not authenticated");
    }
    const _user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!_user) {
      throw Exception.USER_NOT_FOUND("User not found");
    }

    const user = { ...session.user, ..._user };
    return user;
  }
}
