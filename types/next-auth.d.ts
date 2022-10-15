import type { DefaultUser } from "next-auth"
import type { Role } from "@prisma/client"
import type { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string
  }

  interface Session {
    user?: DefaultUser & {
      id: string
      role: string
    }
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    role?: string
  }
}
