import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simplified middleware for demonstration purposes
// In a real application, you would verify a JWT token or session cookie
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Only apply middleware to responder routes, excluding the login page
  if (path.startsWith("/responder") && !path.startsWith("/responder/login")) {
    // In a real application, you would check for a valid session or token
    // For demo purposes, we'll just redirect to the login page
    // In production, you would verify authentication here

    // For development purposes, we're bypassing authentication
    // In a real application, you would check for a development environment
    const isDevelopmentMode = true // This would be process.env.NODE_ENV === 'development'

    // This is a placeholder for demonstration - in a real app, check for a valid auth token
    const isAuthenticated = isDevelopmentMode || false

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/responder/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/responder/:path*"],
}

