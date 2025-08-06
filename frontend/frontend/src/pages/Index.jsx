import { useState, useEffect, useCallback } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardStats } from '@/components/DashboardStats';
import { ExpenseChart } from '@/components/ExpenseChart';
import { TransactionList } from '@/components/TransactionList';
import { AddTransactionModal } from '@/components/AddTransactionModal';

const Index = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. DEFINE fetchData at the top level of the component, wrapped in useCallback.
  const fetchData = useCallback(async () => {
    // We set loading to true here to handle manual refreshes.
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const apiUrl = `${import.meta.env.VITE_API_URL}/dashboard`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data. Please log in again.');
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []); // The empty dependency array means this function definition never changes.

  // 2. USE useEffect to call fetchData once when the component first loads.
  useEffect(() => {
    fetchData();
  }, [fetchData]); // The dependency array includes fetchData.

  if (isLoading) {
    return <div className="text-center p-10">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-destructive">{error}</div>;
  }
  
  if (!dashboardData) {
     return <div className="text-center p-10">No data available.</div>;
  }
  
  // This transformation logic was already correct.
  const statsForComponent = [
      { title: 'Total Balance', value: dashboardData.stats.total_balance, change: dashboardData.stats.balance_change, changeType: dashboardData.stats.balance_change >= 0 ? 'positive' : 'negative', description: 'From last month' },
      { title: 'Total Income', value: dashboardData.stats.total_income, change: dashboardData.stats.income_change, changeType: dashboardData.stats.income_change >= 0 ? 'positive' : 'negative', description: 'This month' },
      { title: 'Total Expenses', value: dashboardData.stats.total_expenses, change: dashboardData.stats.expense_change, changeType: dashboardData.stats.expense_change <= 0 ? 'positive' : 'negative', description: 'This month' },
      { title: 'Savings Rate', value: dashboardData.stats.savings_rate, change: dashboardData.stats.savings_rate_change || 0, changeType: (dashboardData.stats.savings_rate_change || 0) >= 0 ? 'positive' : 'negative', description: 'This month' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <DashboardHeader onAddTransaction={() => setIsModalOpen(true)} />
        
        <DashboardStats statsData={statsForComponent} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart expenseData={dashboardData.expense_breakdown} />
          <TransactionList transactions={dashboardData.recent_transactions} />
        </div>
      </div>
      
      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransactionAdded={fetchData} // Now this correctly passes the fetchData function
      />
    </div>
  );
};
 
export default Index;