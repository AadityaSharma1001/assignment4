"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBudgets } from "@/lib/hooks/useBudget";
import { useEffect, useState } from "react";
// import { format } from "date-fns";
const format = (date : Date, formatStr: string) => {
  if (formatStr === "yyyy-MM") {
    return date.toISOString().slice(0, 7);
  }
  return date.toISOString().slice(0, 10);
};

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: {
    _id: string;
    month: string;
    category: string;
    limit: number;
  } | null;
}

export default function BudgetModal({ open, setOpen, budget }: Props) {
  const { addBudget, updateBudget } = useBudgets();

  const [form, setForm] = useState({
    month: format(new Date(), "yyyy-MM"),
    category: "food",
    limit: "",
  });

  useEffect(() => {
    console.log("BudgetModal useEffect", budget);
    if (budget) {
      setForm({
        month: budget.month,
        category: budget.category.toLowerCase(),
        limit: budget.limit.toString(),
      });
    } else {
      setForm({
        month: format(new Date(), "yyyy-MM"),
        category: "food",
        limit: "",
      });
    }
  }, [budget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.limit) return;

    const payload = {
      month: form.month,
      category: form.category,
      limit: parseFloat(form.limit),
    };

    try {
      if (budget) {
        await updateBudget(budget._id, payload);
      } else {
        await addBudget(payload);
      }

      // Reset and close
      setForm({
        month: format(new Date(), "yyyy-MM"),
        category: "food",
        limit: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to save budget:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          setForm({
            month: format(new Date(), "yyyy-MM"),
            category: "food",
            limit: "",
          });
        }
      }}
    >
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold">
            {budget ? "Edit Budget" : "Set Monthly Budget"}
          </DialogTitle>
        </DialogHeader>
        <div onSubmit={handleSubmit} className="space-y-6 mt-6">
          <Input
            type="month"
            value={form.month}
            onChange={(e) => setForm({ ...form, month: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            {["food", "transport", "entertainment", "utilities", "shopping", "health", "other"].map(
              (cat) => (
                <option key={cat} value={cat} className="bg-gray-800 text-white">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              )
            )}
          </select>
          <Input
            type="number"
            placeholder="Budget Limit"
            value={form.limit}
            onChange={(e) => setForm({ ...form, limit: e.target.value })}
            required
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {budget ? "Update" : "Save"} Budget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}