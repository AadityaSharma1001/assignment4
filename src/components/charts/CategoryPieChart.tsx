'use client';

import { useTransactions } from "../../lib/hooks/useTransaction";
import {
  PieChart,
  Pie,
  Cell,
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
import { PieChart as PieChartIcon, DollarSign } from "lucide-react";

// Category color palette
const CATEGORY_COLORS: Record<string, string> = {
  food: "#f97316",
  transport: "#10b981",
  entertainment: "#6366f1",
  utilities: "#ec4899",
  shopping: "#8b5cf6",
  health: "#ef4444",
  other: "#9ca3af",
};

interface ChartData {
  name: string;
  value: number;
  category: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: ChartData;
  }>;
}

export default function CategoryPieChart() {
  const { transactions } = useTransactions();

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  // Filter current month's transactions
  const filtered = transactions.filter((txn) =>
    isWithinInterval(parseISO(txn.date), { start, end })
  );

  // Aggregate by category
  const categoryTotals: Record<string, number> = {};
  filtered.forEach((txn) => {
    categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + txn.amount;
  });

  // Prepare data for PieChart
  const data: ChartData[] = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
    category,
  }));

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalAmount) * 100).toFixed(1);

      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">Amount: ₹{data.value.toFixed(2)}</p>
            <p className="text-gray-300">Percentage: {percentage}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Label inside slices
  const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null ||
    percent < 0.05
  ) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <PieChartIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Category Breakdown</h3>
            <p className="text-gray-400 text-sm">Monthly spending by category</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-gray-300">Total: ₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={30}
              labelLine={false}
              label={CustomLabel}
              stroke="#374151"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.category}`}
                  fill={CATEGORY_COLORS[entry.category] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip content={(props) => <CustomTooltip {...props} />} />
            <Legend wrapperStyle={{ color: "#9ca3af" }} iconType="rect" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
