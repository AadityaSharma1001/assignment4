'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/lib/hooks/useTransaction";
import { useEffect, useState } from "react";

const format = (date: Date, formatStr: string) => {
  if (formatStr === "yyyy-MM-dd") {
    return date.toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
};

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  transaction?: {
    _id: string;
    amount: number;
    description: string;
    category: string;
    date: string;
  } | null;
}

export default function TransactionModal({
  open,
  setOpen,
  transaction,
}: Props) {
  const { addTransaction, updateTransaction } = useTransactions();

  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "food",
    date: format(new Date(), "yyyy-MM-dd"),
  });

  // Pre-fill form for edit
  useEffect(() => {
    if (transaction) {
      setForm({
        amount: transaction.amount.toString(),
        description: transaction.description,
        category: transaction.category.toLowerCase(),
        date: format(new Date(transaction.date), "yyyy-MM-dd"),
      });
    } else {
      setForm({
        amount: "",
        description: "",
        category: "food",
        date: format(new Date(), "yyyy-MM-dd"),
      });
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.amount.trim() || !form.description.trim()) return;

    const payload = {
      amount: parseFloat(form.amount),
      description: form.description,
      category: form.category.toLowerCase(),
      date: new Date(form.date).toISOString(),
    };

    try {
      if (transaction) {
        await updateTransaction(transaction._id, payload);
      } else {
        await addTransaction(payload);
      }

      setForm({
        amount: "",
        description: "",
        category: "food",
        date: format(new Date(), "yyyy-MM-dd"),
      });
      setOpen(false);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold">
            {transaction ? "Edit" : "Add"} Transaction
          </DialogTitle>
        </DialogHeader>
        <div onSubmit={handleSubmit} className="space-y-6 mt-6">
          <Input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            {[
              "food",
              "transport",
              "entertainment",
              "utilities",
              "shopping",
              "health",
              "other",
            ].map((cat) => (
              <option key={cat} value={cat} className="bg-gray-800 text-white">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {transaction ? "Update" : "Add"} Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}