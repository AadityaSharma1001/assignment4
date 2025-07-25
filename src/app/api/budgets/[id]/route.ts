import { connectToDatabase } from "../../../../lib/db";
import Budget from "../../../../model/Budget";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  await connectToDatabase();
  const { id } = await params;
  const body = await req.json();

  // Normalize category casing
  if (body.category) {
    body.category =
      body.category.charAt(0).toUpperCase() +
      body.category.slice(1).toLowerCase();
  }


  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedBudget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBudget);
  } catch (error: unknown) {
    console.error("PUT /api/budgets/[id] error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);

    if (!deletedBudget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("DELETE /api/budgets/[id] error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
