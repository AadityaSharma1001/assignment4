"use client";

import { useTransactions } from "@/lib/hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/lib/hooks/useTransaction";
import { Edit2, Trash2, TrendingUp, TrendingDown, Calendar, Tag } from "lucide-react";

interface Props {
  onEdit: (txn: Transaction) => void;
}

export default function TransactionList({ onEdit }: Props) {
  const { transactions, deleteTransaction, loading } = useTransactions();

  if (loading)
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p className="text-gray-400">Loading transactions...</p>
      </div>
    );

  if (transactions.length === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">No Transactions Yet</h3>
        <p className="text-gray-500">Start by adding your first transaction to track your finances!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          Recent Transactions
        </h2>
        <div className="text-sm text-gray-400">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="space-y-3">
        {transactions.map((txn) => (
          <div
            key={txn._id}
            className="group bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600 rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    txn.amount >= 0 ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                  }`}>
                    {txn.amount >= 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-lg truncate">{txn.description}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-xl font-bold ${
                        txn.amount >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {txn.amount >= 0 ? '+' : ''}₹{Math.abs(txn.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 ml-13">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs font-medium">
                      {txn.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(txn.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onEdit(txn)}
                  className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300 hover:text-white h-8 px-3"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteTransaction(txn._id)}
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