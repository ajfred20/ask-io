import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Notification from '@/app/models/Notification';

export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Build query
    const query: any = { userId };
    if (unreadOnly) {
      query.isRead = false;
    }
    
    // Find notifications
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch notifications: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Mark notifications as read
export async function POST(request: NextRequest) {
  try {
    const { userId, notificationIds } = await request.json();
    
    if (!userId || !notificationIds || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: 'User ID and notification IDs array are required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Update notifications
    await Notification.updateMany(
      { 
        userId, 
        _id: { $in: notificationIds } 
      },
      { 
        $set: { isRead: true } 
      }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notifications:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to update notifications: ${errorMessage}` },
      { status: 500 }
    );
  }
} 