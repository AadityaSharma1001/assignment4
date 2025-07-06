import { connectToDatabase } from '../../../lib/db';
import Transaction from '../../../model/Transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  console.log("Received body:", body);
  body.category = body.category.charAt(0).toUpperCase() + body.category.slice(1).toLowerCase();  

  try {
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
