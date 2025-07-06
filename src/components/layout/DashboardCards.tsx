'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useTransactions } from "@/lib/hooks/useTransaction";
import { useBudgets } from "@/lib/hooks/useBudget";
import { TrendingDown, PieChart, DollarSign } from "lucide-react";

export default function DashboardCards() {
  const { transactions } = useTransactions();
  const { budgets } = useBudgets();

  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  
  // Calculate monthly totals
  const monthlyTxns = transactions.filter(txn => txn.date.startsWith(currentMonth));
  const totalThisMonth = monthlyTxns.reduce((sum, txn) => sum + txn.amount, 0);

  // Calculate top category
  const categoryTotals: Record<string, number> = {};
  monthlyTxns.forEach(txn => {
    categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + txn.amount;
  });
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  // Calculate budget comparison
  const monthlyBudgets = budgets.filter(b => b.month === currentMonth);
  const totalBudget = monthlyBudgets.reduce((sum, b) => sum + b.limit, 0);
  const budgetLeft = totalBudget - totalThisMonth;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs text-gray-400 font-medium">THIS MONTH</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Total Expenses</p>
          <p className="text-3xl font-bold text-red-400">₹{totalThisMonth.toLocaleString()}</p>
          <div className="mt-3 text-xs text-gray-500">
            {monthlyTxns.length} transactions
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <PieChart className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-gray-400 font-medium">CATEGORY</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Top Spending</p>
          <p className="text-2xl font-bold text-blue-400 capitalize">
            {topCategory === "-" ? "No data" : topCategory}
          </p>
          <div className="mt-3 text-xs text-gray-500">
            ₹{categoryTotals[topCategory]?.toLocaleString() || 0}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-xs text-gray-400 font-medium">BUDGET</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Remaining Budget</p>
          <p className={`text-3xl font-bold ${budgetLeft >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ₹{budgetLeft.toLocaleString()}
          </p>
          <div className="mt-3 text-xs text-gray-500">
            {totalBudget > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (totalThisMonth / totalBudget) > 1 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((totalThisMonth / totalBudget) * 100, 100)}%` }}
                  />
                </div>
                <span>{Math.round((totalThisMonth / totalBudget) * 100)}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}