import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  venue: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Validate future date
    const eventDate = new Date(validatedData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
      return NextResponse.json(
        { error: 'Event date must be in the future' },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    
    // For now, we'll just log the data
    console.log('Contact form submission:', validatedData);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, you might want to:
    // - Send email using services like SendGrid, Resend, or Nodemailer
    // - Save to database (Supabase, MongoDB, etc.)
    // - Send to CRM or marketing automation platform
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your inquiry. We will be in touch within 24 hours.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}