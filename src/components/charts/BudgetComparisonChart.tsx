'use client';

import { useTransactions } from "../../lib/hooks/useTransaction";
import { useBudgets } from "../../lib/hooks/useBudget";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
} from "date-fns";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export default function BudgetComparisonChart() {
  const { transactions } = useTransactions();
  const { budgets } = useBudgets();

  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // e.g. 2025-07
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  // Filter current month transactions
  const monthlyTxns = transactions.filter(txn =>
    isWithinInterval(parseISO(txn.date), { start, end })
  );

  // Sum actual expenses per category
  const actuals: Record<string, number> = {};
  monthlyTxns.forEach(txn => {
    actuals[txn.category] = (actuals[txn.category] || 0) + txn.amount;
  });

  // Get all categories in use (from budgets and transactions)
  const categories = Array.from(
    new Set([
      ...budgets.map(b => b.category),
      ...Object.keys(actuals)
    ])
  );

  // Build comparison data
  const data = categories.map(category => {
    const budgeted = budgets.find(b => b.category === category && b.month === currentMonth)?.limit || 0;
    const spent = actuals[category] || 0;

    return {
      category: category.charAt(0).toUpperCase() + category.slice(1),
      Budgeted: budgeted,
      Spent: spent,
    };
  });

  // Calculate summary stats
  const totalBudgeted = data.reduce((sum, item) => sum + item.Budgeted, 0);
  const totalSpent = data.reduce((sum, item) => sum + item.Spent, 0);
  const overBudgetCategories = data.filter(item => item.Spent > item.Budgeted).length;

  const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any; label: string }) => {
    if (active && payload && payload.length) {
      const budgeted = payload.find((p: { dataKey: string; value: number }) => p.dataKey === 'Budgeted')?.value || 0;
      const spent = payload.find((p: { dataKey: string; value: number }) => p.dataKey === 'Spent')?.value || 0;
      const percentage = budgeted > 0 ? ((spent / budgeted) * 100).toFixed(1) : 0;
      
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-green-400">Budgeted: ₹{budgeted}</p>
            <p className="text-red-400">Spent: ₹{spent}</p>
            <p className="text-gray-300">Usage: {percentage}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Budget vs Actual</h3>
            <p className="text-gray-400 text-sm">Monthly spending comparison</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">₹{totalBudgeted} budgeted</span>
          </div>
          {overBudgetCategories > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400">{overBudgetCategories} over budget</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
              tickLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
              tickLine={{ stroke: '#374151' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#9ca3af' }}
              iconType="rect"
            />
            <Bar 
              dataKey="Budgeted" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Budgeted"
            />
            <Bar 
              dataKey="Spent" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              name="Spent"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}