"use client";

import { useBudgets } from "@/lib/hooks/useBudget";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Target, Calendar, DollarSign, PieChart } from "lucide-react";

interface Props {
  onEdit: (budget: any) => void;
}

export default function BudgetList({ onEdit }: Props) {
  const { budgets, deleteBudget, loading } = useBudgets();

  if (loading)
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
        <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p className="text-gray-400">Loading budgets...</p>
      </div>
    );

  if (budgets.length === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">No Budgets Set</h3>
        <p className="text-gray-500">Create your first budget to start managing your spending!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <PieChart className="w-4 h-4 text-white" />
          </div>
          Budget Overview
        </h2>
        <div className="text-sm text-gray-400">
          {budgets.length} budget{budgets.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="space-y-3">
        {budgets.map((budget) => (
          <div
            key={budget._id}
            className="group bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600 rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-lg truncate">{budget.category}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-xl font-bold text-green-400">
                        ₹{budget.limit.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400">limit</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 ml-13">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs font-medium">
                      {budget.month}
                    </span>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">65% used</span>
                </div>
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(budget)}
                  className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300 hover:text-white h-8 px-3"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteBudget(budget._id)}
                  className="bg-red-600/20 hover:bg-red-600 border-red-600/50 text-red-400 hover:text-white h-8 px-3"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}