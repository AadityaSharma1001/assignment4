import { useEffect, useState } from 'react';

export interface Budget {
  _id: string;
  month: string;    // "2025-07"
  category: string;
  limit: number;
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    setLoading(true);
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data);
    setLoading(false);
  };

  const addBudget = async (budget: Omit<Budget, "_id"> & { limit: number }) => {
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...budget,
        limit: budget.limit,
      }),
    });
    await fetchBudgets();
  };

  const updateBudget = async (id: string, budget: Omit<Budget, "_id"> & { limit: number }) => {
    await fetch(`/api/budgets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...budget,
        limit: budget.limit,
      }),
    });
    await fetchBudgets();
  };

  const deleteBudget = async (id: string) => {
    await fetch(`/api/budgets/${id}`, { method: "DELETE" });
    await fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return {
    budgets,
    loading,
    fetchBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
  };
}
