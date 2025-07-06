import { connectToDatabase } from '../../../../lib/db';
import Transaction from '../../../../model/Transaction';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();

  if(body.category) {
    // Normalize category casing
    body.category = body.category.charAt(0).toUpperCase() + body.category.slice(1).toLowerCase();
  }

  try {
    const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const {
      params: { id },
    } = context;

    await Transaction.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
