import { NextResponse } from "next/server";

/**
 * The file containing the middlware exmaple.
 */
export function middleware(request) {
    let redirectTarget = undefined;

    console.log(request);

    if (redirectTarget) {
        console.log(`Redirecting to ${redirectTarget}`);
        return NextResponse.redirect(redirectTarget);
    }

    // Continue to the next middleware.
    return NextResponse.next();
}

/**
 * The configuration of the middleware.
 * - Limits the middlware to "/news" page only.
 */
export const config = {
    matcher: '/news'
}