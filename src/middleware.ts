import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const OPEN_EDIT_ACCESS = ["ADMIN", "EDITOR"]

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/panel")) {
    const jwt = await getToken({
      req,
    })
    console.log(jwt)
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
