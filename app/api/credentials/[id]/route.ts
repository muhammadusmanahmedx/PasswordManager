import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import Credential from '@/models/credential';

// Define the type for the context parameter
interface Context {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Context) {
  try {
    const { id } = params;
    await connectToDatabase();
    const token = request.headers.get('cookie')?.split('token=')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const credential = await Credential.findOne({
      _id: id,
      userId: decoded.userId,
    });

    if (!credential) {
      return NextResponse.json({ message: 'Credential not found' }, { status: 404 });
    }

    return NextResponse.json(credential);
  } catch (error) {
    console.error('Credential API: Error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Context) {
  try {
    const { id } = params;
    await connectToDatabase();
    const token = request.headers.get('cookie')?.split('token=')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { websiteUrl, username, password } = await request.json();

    const credential = await Credential.findOneAndUpdate(
      { _id: id, userId: decoded.userId },
      { websiteUrl, username, password },
      { new: true }
    );

    if (!credential) {
      return NextResponse.json({ message: 'Credential not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(credential);
  } catch (error) {
    console.error('Credential API: Error updating', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    const { id } = params;
    await connectToDatabase();
    const token = request.headers.get('cookie')?.split('token=')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const credential = await Credential.findOneAndDelete({
      _id: id,
      userId: decoded.userId,
    });

    if (!credential) {
      return NextResponse.json({ message: 'Credential not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Credential deleted successfully' });
  } catch (error) {
    console.error('Credential API: Error deleting', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}