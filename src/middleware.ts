import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { OPEN_EDIT_ACCESS } from "@/constants"

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/panel")) {
    const jwt = await getToken({
      req,
    })

    if (!jwt) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url))
    }
    if (!OPEN_EDIT_ACCESS.includes(jwt.role)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/panel/:path*"],
}
