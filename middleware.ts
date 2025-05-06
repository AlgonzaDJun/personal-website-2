import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Periksa apakah URL dimulai dengan /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Ambil session cookie
    const session = request.cookies.get("session");

    // Jika tidak ada session atau tidak authenticated, redirect ke login
    if (!session || session.value !== "authenticated") {
      // Redirect ke halaman login
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Lanjutkan ke request berikutnya jika sudah authenticated atau bukan path /admin
  return NextResponse.next();
}

// Konfigurasi matcher untuk middleware
export const config = {
  matcher: [
    /*
     * Match semua request paths kecuali untuk:
     * 1. api (API routes)
     * 2. _next/static (static files)
     * 3. _next/image (image optimization files)
     * 4. favicon.ico (favicon file)
     * 5. public folder
     */
    "/admin/:path*",
  ],
};
