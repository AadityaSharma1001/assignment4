import { connectToDatabase } from "../../../../lib/db";
import Budget from "../../../../model/Budget";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, { params }: Params) {
  await connectToDatabase();
  const body = await req.json();

  // Normalize category casing
  if (body.category) {
    body.category =
      body.category.charAt(0).toUpperCase() +
      body.category.slice(1).toLowerCase();
  }

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedBudget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBudget);
  } catch (error: any) {
    console.error("PUT /api/budgets/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  await connectToDatabase();

  try {
    const deletedBudget = await Budget.findByIdAndDelete(params.id);

    if (!deletedBudget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/budgets/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
