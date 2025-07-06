"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardCards from "@/components/layout/DashboardCards";
import TransactionList from "@/components/TransactionList";
import BudgetList from "@/components/BudgetList";
import TransactionModal from "@/components/modals/TransactionalModal";
import BudgetModal from "@/components/modals/BudgetModal";
import ChartTabs from "@/components/layout/ChartTabs";
import { Transaction } from "@/lib/hooks/useTransaction";
import { Budget } from "@/lib/hooks/useBudget";
import { Plus, Calendar } from "lucide-react";

export default function Home() {
  const [showTxnModal, setShowTxnModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [txnToEdit, setTxnToEdit] = useState<Transaction | null>(null);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
        <main className="p-6 space-y-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
              💰 Personal Finance Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Track your expenses and manage your budget efficiently</p>
          </div>

          {/* Summary Cards */}
          <DashboardCards />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => {
                setTxnToEdit(null);
                setShowTxnModal(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Transaction
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setBudgetToEdit(null);
                setShowBudgetModal(true);
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Add Budget
            </Button>
          </div>

          {/* Charts Section */}
          <ChartTabs />

          {/* Data Lists */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <TransactionList
              onEdit={(txn) => {
                setTxnToEdit(txn);
                setShowTxnModal(true);
              }}
            />
            <BudgetList
              onEdit={(budget) => {
                setBudgetToEdit(budget);
                setShowBudgetModal(true);
              }}
            />
          </div>

          {/* Modals */}
          <TransactionModal
            open={showTxnModal}
            setOpen={(val) => {
              setShowTxnModal(val);
              if (!val) setTxnToEdit(null);
            }}
            transaction={txnToEdit}
          />

          <BudgetModal
            open={showBudgetModal}
            setOpen={(val) => {
              setShowBudgetModal(val);
              if (!val) setBudgetToEdit(null);
            }}
            budget={budgetToEdit}
          />
        </main>
      </div>
    </div>
  );
}