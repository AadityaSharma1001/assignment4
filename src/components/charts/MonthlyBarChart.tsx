'use client';

import { useTransactions } from "../../lib/hooks/useTransaction";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { eachDayOfInterval, format, isSameDay, parseISO, startOfMonth, endOfMonth } from "date-fns";
import { Calendar, TrendingUp, Activity } from "lucide-react";

export default function MonthlyBarChart() {
  const { transactions } = useTransactions();

  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  // Build list of all days this month
  const days = eachDayOfInterval({ start, end });

  // Prepare daily expense totals
  const data = days.map((day) => {
    const total = transactions
      .filter((txn) => isSameDay(parseISO(txn.date), day))
      .reduce((sum, txn) => sum + txn.amount, 0);

    return {
      date: format(day, "d MMM"), // e.g. 6 Jul
      amount: total,
      fullDate: format(day, "MMMM d, yyyy"),
    };
  });

  // Calculate summary stats
  const totalSpent = data.reduce((sum, item) => sum + item.amount, 0);
  const avgDaily = totalSpent / data.length;
  const maxDay = data.reduce((max, item) => item.amount > max.amount ? item : max, data[0]);
  const activeDays = data.filter(item => item.amount > 0).length;

  const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{data.fullDate}</p>
          <div className="space-y-1">
            <p className="text-blue-400">Amount: ₹{data.amount}</p>
            {data.amount > avgDaily && (
              <p className="text-yellow-400 text-xs">Above average</p>
            )}
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
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Daily Spending</h3>
            <p className="text-gray-400 text-sm">Daily expenses this month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Total Spent</span>
          </div>
          <p className="text-xl font-bold text-white">₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Daily Average</span>
          </div>
          <p className="text-xl font-bold text-white">₹{avgDaily.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Active Days</span>
          </div>
          <p className="text-xl font-bold text-white">{activeDays}</p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
              tickLine={{ stroke: '#374151' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={{ stroke: '#374151' }}
              tickLine={{ stroke: '#374151' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="#4f46e5" 
              radius={[4, 4, 0, 0]}
              stroke="#6366f1"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}