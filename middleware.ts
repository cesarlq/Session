import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  
  const userApiUrl = `${process.env.NEXT_PUBLIC_PATH_PROD}/session/user`;
  const url = req.nextUrl.clone();
  try {
    const res = await fetch(userApiUrl, {
      method: 'GET',
      headers: {
        Cookie: req.headers.get('cookie') || '',  // Pasar las cookies en la solicitud
        credentials: 'include',
      },
    });

    console.log('cookie', req.headers.get('cookie'))
    if(res.status == 401){
      const isPageRequest = !url.pathname.includes('.') && url.pathname !== '/' && url.pathname !== '/Register';

      if (isPageRequest) {
        console.log('entro')
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
    const userData = await res.json();
    console.log('User Data:', userData);


    return NextResponse.next();
  }catch(error){
    
  }
  
 
  
}

export const config = {
    matcher: [
      '/:path*',   
    ]
  };