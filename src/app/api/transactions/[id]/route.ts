import { connectToDatabase } from '../../../../lib/db';
import Transaction from '../../../../model/Transaction';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, context: { params: Record<string, string> }) {
  await connectToDatabase();
  const body = await req.json();

  if(body.category) {
    // Normalize category casing
    body.category = body.category.charAt(0).toUpperCase() + body.category.slice(1).toLowerCase();
  }

  try {
    const updated = await Transaction.findByIdAndUpdate(context.params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }

}

export async function DELETE(req: Request, context: { params: Record<string, string> }) {
  try {
    await connectToDatabase();

    await Transaction.findByIdAndDelete(context.params.id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
