
// file: app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  // Create the response first
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Set the token cookie to expire immediately
  response.cookies.set('token', '', { 
    httpOnly: true, 
    expires: new Date(0),
    path: '/'  // Adding path ensures the cookie is removed properly
  });
  
  return response;
}