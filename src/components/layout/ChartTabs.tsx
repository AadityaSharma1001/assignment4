'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import BudgetComparisonChart from "@/components/charts/BudgetComparisonChart";

export default function ChartTabs() {
  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="mb-8 bg-gray-800 p-1 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-lg">
          <TabsTrigger 
            value="monthly" 
            className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:shadow-gray-900/50 data-[state=active]:text-white data-[state=active]:scale-105 text-gray-400 hover:text-white hover:bg-gray-700/50 hover:scale-102"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger 
            value="category" 
            className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:shadow-gray-900/50 data-[state=active]:text-white data-[state=active]:scale-105 text-gray-400 hover:text-white hover:bg-gray-700/50 hover:scale-102"
          >
            By Category
          </TabsTrigger>
          <TabsTrigger 
            value="budget" 
            className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg data-[state=active]:shadow-gray-900/50 data-[state=active]:text-white data-[state=active]:scale-105 text-gray-400 hover:text-white hover:bg-gray-700/50 hover:scale-102"
          >
            Budget vs Actual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="animate-in fade-in-50 duration-300">
          <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 p-8 rounded-2xl border border-blue-800/50 shadow-lg">
            <MonthlyBarChart />
          </div>
        </TabsContent>

        <TabsContent value="category" className="animate-in fade-in-50 duration-300">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-2xl border border-purple-800/50 shadow-lg">
            <CategoryPieChart />
          </div>
        </TabsContent>

        <TabsContent value="budget" className="animate-in fade-in-50 duration-300">
          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-8 rounded-2xl border border-green-800/50 shadow-lg">
            <BudgetComparisonChart />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}