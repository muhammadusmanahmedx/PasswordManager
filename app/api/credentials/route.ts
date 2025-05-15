import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import Credential from '@/models/credential';

export async function GET(request: Request) {
  await connectToDatabase();
  const token = request.headers.get('cookie')?.split('token=')[1];

  if (!token) {
    console.log('Credentials API: No token found');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    console.log('Credentials API: Token valid for userId:', decoded.userId);
    const credentials = await Credential.find({ userId: decoded.userId });
    return NextResponse.json(credentials);
  } catch (error) {
    console.error('Credentials API: Invalid token', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  await connectToDatabase();
  const token = request.headers.get('cookie')?.split('token=')[1];

  if (!token) {
    console.log('Credentials API: No token found');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    console.log('Credentials API: Token valid for userId:', decoded.userId);
    const { websiteUrl, username, password } = await request.json();
    const credential = new Credential({
      websiteUrl,
      username,
      password,
      userId: decoded.userId,
    });
    await credential.save();
    return NextResponse.json(credential, { status: 201 });
  } catch (error) {
    console.error('Credentials API: Error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}