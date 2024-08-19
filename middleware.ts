import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('jwt');
    const url = req.nextUrl.clone();
    
  if (token) {
    console.log('Si tiene Token')
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token.value, secret);
      req.headers.set('x-user-data', JSON.stringify(payload)); // Guardar la info del usuario en un header
  } catch (error) {
      console.error('Invalid JWT:', error);
    }
  }else{
    console.log('No Encontro Token.')
    const isPageRequest = !url.pathname.includes('.') && url.pathname !== '/' && url.pathname !== '/Register';
    if (isPageRequest ) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/:path*',   
    ],
  };