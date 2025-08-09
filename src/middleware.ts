import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect admin app pages and admin APIs; everything else remains public
const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
  }
});

// Run middleware on all routes except Next.js internals and static assets
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
