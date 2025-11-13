import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // Try to read base64 image data from request body (JSON)
    let imageBase64: string | undefined;
    try {
      const body = await request.json();
      if (body && typeof body.imageData === 'string') {
        // Allow a placeholder like 'test' to trigger default image fallback
        const filePath = path.join(process.cwd(), 'public', 'car_bumper.jpg');
      const fileBuffer = fs.readFileSync(filePath);

      console.warn(fileBuffer);

      imageBase64 = fileBuffer.toString('base64');
        
        if (body.imageData && body.imageData !== 'test') {
          imageBase64 = body.imageData;
        
            const filePath = path.join(process.cwd(), 'public', 'car_bumper.jpg');
      const fileBuffer = fs.readFileSync(filePath);

      console.warn(fileBuffer);

      imageBase64 = fileBuffer.toString('base64');
        }
      }
    } catch {
      // No JSON body or parse failed; we'll fallback to default image
    }

    // Fallback: read a default image from public directory
    if (!imageBase64) {
      const filePath = path.join(process.cwd(), 'public', 'car_bumper.jpg');
      const fileBuffer = fs.readFileSync(filePath);

      console.warn(fileBuffer);

      imageBase64 = fileBuffer.toString('base64');
    }

const filePath = path.join(process.cwd(), 'public', 'car_bumper.jpg');
      const fileBuffer = fs.readFileSync(filePath);

      console.warn(fileBuffer);

      imageBase64 = fileBuffer.toString('base64');

    const response = await axios({
      method: 'POST',
      url: 'https://serverless.roboflow.com/car-damage-detection-final/4',
      params: {
        api_key: 'gDQzUhcJ5MoyvhqKUiKd',
      },
      data: imageBase64,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return NextResponse.json({
      success: true,
      predictions: response.data?.predictions || [],
      message: 'Damage detection completed',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Damage detection error:', message);
    return NextResponse.json(
      {
        success: false,
        error: message,
        message: 'Damage detection failed',
      },
      { status: 500 },
    );
  }
}