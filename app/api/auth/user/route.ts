import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/Users';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const token = request.headers.get('cookie')?.split('token=')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId).select('username email');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}