import { connectToDatabase } from '../../../lib/db';
import Budget from '../../../model/Budget';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const normalizedCategory =
      body.category.charAt(0).toUpperCase() + body.category.slice(1).toLowerCase();

    const limit = Number(body.limit);

    if (isNaN(limit)) {
      return NextResponse.json({ error: "Invalid limit" }, { status: 400 });
    }

    const existingBudget = await Budget.findOne({
      month: body.month,
      category: normalizedCategory,
    });

    let result;

    if (existingBudget) {
      existingBudget.limit += limit;
      result = await existingBudget.save();
    } else {
      result = await Budget.create({
        category: normalizedCategory,
        month: body.month,
        limit: limit,
      });
    }

    console.log("Budget created/updated successfully:", result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error creating/updating budget:", error);
    return NextResponse.json({ error: "Failed to create or update budget" }, { status: 400 });
  }
}