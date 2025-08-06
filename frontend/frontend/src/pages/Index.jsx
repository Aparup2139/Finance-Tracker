import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardStats } from '@/components/DashboardStats';
import { ExpenseChart } from '@/components/ExpenseChart';
import { TransactionList } from '@/components/TransactionList';

const Index = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch('http://127.0.0.1:5000/dashboard', {
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
    };

    fetchData();
  }, []); // The empty array ensures this runs only once when the component mounts

  if (isLoading) {
    return <div className="text-center p-10">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-destructive">{error}</div>;
  }
  
  if (!dashboardData) {
     return <div className="text-center p-10">No data available.</div>;
  }
  
  // The 'stats' object from the backend API needs to be transformed into an array
  // for your DashboardStats component, which expects to map over an array.
  const statsForComponent = [
      { title: 'Total Balance', value: dashboardData.stats.total_balance, change: dashboardData.stats.balance_change, changeType: dashboardData.stats.balance_change >= 0 ? 'positive' : 'negative', description: 'From last month' },
      { title: 'Total Income', value: dashboardData.stats.total_income, change: dashboardData.stats.income_change, changeType: dashboardData.stats.income_change >= 0 ? 'positive' : 'negative', description: 'This month' },
      { title: 'Total Expenses', value: dashboardData.stats.total_expenses, change: dashboardData.stats.expense_change, changeType: dashboardData.stats.expense_change <= 0 ? 'positive' : 'negative', description: 'This month' },
      { title: 'Savings Rate', value: dashboardData.stats.savings_rate, change: dashboardData.stats.savings_rate_change || 0, changeType: (dashboardData.stats.savings_rate_change || 0) >= 0 ? 'positive' : 'negative', description: 'This month' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <DashboardHeader />
        {/* Pass the live data down as props */}
        <DashboardStats statsData={statsForComponent} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart expenseData={dashboardData.expense_breakdown} />
          <TransactionList transactions={dashboardData.recent_transactions} />
        </div>
      </div>
    </div>
  );
};

export default Index;