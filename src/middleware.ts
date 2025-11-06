// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Normaliza /catalogo/page -> /catalogo
  if (pathname === '/catalogo/page') {
    const url = req.nextUrl.clone();
    url.pathname = '/catalogo';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 👉 Importante: no matchear /catalogo/:path* porque también toma /catalogo/[id]
export const config = {
  matcher: ['/catalogo/page'],
};
