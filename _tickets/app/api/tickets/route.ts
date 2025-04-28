import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://data.dave.io/TICKETS.csv');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`);
    }
    
    const csvData = await response.text();
    
    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    console.error('Error fetching CSV:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch CSV data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}